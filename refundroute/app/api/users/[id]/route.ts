import { PrismaClient } from '@prisma/client';
import { sendSuccess, sendError } from '@/lib/responseHandler';
import { ERROR_CODES } from '@/lib/errorCodes';
import { updateUserSchema } from '@/lib/schemas/userSchema';
import { ZodError } from 'zod';
import { handleValidationError } from '@/lib/validationHelpers';

const prisma = new PrismaClient();

/**
 * GET /api/users/[id]
 * Fetch a specific user by ID
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = Number(params.id);

    if (isNaN(userId)) {
      return sendError(
        'Invalid user ID',
        ERROR_CODES.INVALID_INPUT,
        400
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        projects: {
          select: {
            id: true,
            name: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return sendError(
        'User not found',
        ERROR_CODES.USER_NOT_FOUND,
        404
      );
    }

    return sendSuccess(user, 'User fetched successfully');
  } catch (error) {
    console.error('Error fetching user:', error);
    return sendError(
      'Failed to fetch user',
      ERROR_CODES.FETCH_FAILED,
      500,
      error
    );
  }
}

/**
 * PUT /api/users/[id]
 * Update a specific user
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = Number(params.id);
    const body = await request.json();

    if (isNaN(userId)) {
      return sendError(
        'Invalid user ID',
        ERROR_CODES.INVALID_INPUT,
        400
      );
    }

    // Validate input with Zod
    const validatedData = updateUserSchema.parse(body);
    const { name, email } = validatedData;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return sendSuccess(user, 'User updated successfully');
  } catch (error: any) {
    console.error('Error updating user:', error);

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }

    if (error.code === 'P2025') {
      return sendError(
        'User not found',
        ERROR_CODES.USER_NOT_FOUND,
        404
      );
    }

    if (error.code === 'P2002') {
      return sendError(
        'Email already exists',
        ERROR_CODES.EMAIL_EXISTS,
        409
      );
    }

    return sendError(
      'Failed to update user',
      ERROR_CODES.UPDATE_FAILED,
      500,
      error
    );
  }
}

/**
 * DELETE /api/users/[id]
 * Delete a specific user
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = Number(params.id);

    if (isNaN(userId)) {
      return sendError(
        'Invalid user ID',
        ERROR_CODES.INVALID_INPUT,
        400
      );
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return sendSuccess(null, 'User deleted successfully');
  } catch (error: any) {
    console.error('Error deleting user:', error);

    if (error.code === 'P2025') {
      return sendError(
        'User not found',
        ERROR_CODES.USER_NOT_FOUND,
        404
      );
    }

    return sendError(
      'Failed to delete user',
      ERROR_CODES.DELETE_FAILED,
      500,
      error
    );
  }
}

    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}

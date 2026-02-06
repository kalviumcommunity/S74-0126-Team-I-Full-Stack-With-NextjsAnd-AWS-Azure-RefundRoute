import { PrismaClient } from '@prisma/client';
import { sendSuccess, sendError, sendPaginatedSuccess } from '@/lib/responseHandler';
import { ERROR_CODES } from '@/lib/errorCodes';

const prisma = new PrismaClient();

/**
 * GET /api/users
 * Fetch all users with pagination
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.user.count(),
    ]);

    return sendPaginatedSuccess(
      users,
      {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      'Users fetched successfully'
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    return sendError(
      'Failed to fetch users',
      ERROR_CODES.FETCH_FAILED,
      500,
      error
    );
  }
}

/**
 * POST /api/users
 * Create a new user
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return sendError(
        'Name and email are required',
        ERROR_CODES.MISSING_FIELDS,
        400
      );
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return sendSuccess(
      user,
      'User created successfully',
      201
    );
  } catch (error: any) {
    console.error('Error creating user:', error);
    
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return sendError(
        'Email already exists',
        ERROR_CODES.EMAIL_EXISTS,
        409
      );
    }

    return sendError(
      'Failed to create user',
      ERROR_CODES.CREATE_FAILED,
      500,
      error
    );
  }
}

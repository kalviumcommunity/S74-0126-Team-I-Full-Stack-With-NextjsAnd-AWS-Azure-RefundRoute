import { PrismaClient } from '@prisma/client';
import { sendSuccess, sendError } from '@/lib/responseHandler';
import { ERROR_CODES } from '@/lib/errorCodes';

const prisma = new PrismaClient();

/**
 * GET /api/projects/[id]
 * Fetch a specific project by ID
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = Number(params.id);

    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: {
        id: true,
        name: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!project) {
      return sendError(
        'Project not found',
        ERROR_CODES.PROJECT_NOT_FOUND,
        404
      );
    }

    return sendSuccess(project, 'Project fetched successfully');
  } catch (error) {
    console.error('Error fetching project:', error);
    return sendError(
      'Failed to fetch project',
      ERROR_CODES.FETCH_FAILED,
      500,
      error
    );
  }
}

/**
 * PUT /api/projects/[id]
 * Update a specific project
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = Number(params.id);
    const body = await request.json();
    const { name, status } = body;

    if (isNaN(projectId)) {
      return sendError(
        'Invalid project ID',
        ERROR_CODES.INVALID_INPUT,
        400
      );
    }

    if (!name && !status) {
      return sendError(
        'At least one field (name or status) is required',
        ERROR_CODES.MISSING_FIELDS,
        400
      );
    }

    const project = await prisma.project.update({
      where: { id: projectId },
      data: {
        ...(name && { name }),
        ...(status && { status }),
      },
      select: {
        id: true,
        name: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return sendSuccess(project, 'Project updated successfully');
  } catch (error: any) {
    console.error('Error updating project:', error);

    if (error.code === 'P2025') {
      return sendError(
        'Project not found',
        ERROR_CODES.PROJECT_NOT_FOUND,
        404
      );
    }

    return sendError(
      'Failed to update project',
      ERROR_CODES.UPDATE_FAILED,
      500,
      error
    );
  }
}

/**
 * DELETE /api/projects/[id]
 * Delete a specific project
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = Number(params.id);

    if (isNaN(projectId)) {
      return sendError(
        'Invalid project ID',
        ERROR_CODES.INVALID_INPUT,
        400
      );
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    return sendSuccess(null, 'Project deleted successfully');
  } catch (error: any) {
    console.error('Error deleting project:', error);

    if (error.code === 'P2025') {
      return sendError(
        'Project not found',
        ERROR_CODES.PROJECT_NOT_FOUND,
        404
      );
    }

    return sendError(
      'Failed to delete project',
      ERROR_CODES.DELETE_FAILED,
      500,
      error
    );
  }
}

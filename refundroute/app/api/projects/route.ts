import { PrismaClient } from '@prisma/client';
import { sendSuccess, sendError, sendPaginatedSuccess } from '@/lib/responseHandler';
import { ERROR_CODES } from '@/lib/errorCodes';

const prisma = new PrismaClient();

/**
 * GET /api/projects
 * Fetch all projects with pagination and optional filtering
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const skip = (page - 1) * limit;

    const where = status ? { status } : {};

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
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
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.project.count({ where }),
    ]);

    return sendPaginatedSuccess(
      projects,
      {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      'Projects fetched successfully'
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    return sendError(
      'Failed to fetch projects',
      ERROR_CODES.FETCH_FAILED,
      500,
      error
    );
  }
}

/**
 * POST /api/projects
 * Create a new project
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, userId, status = 'active' } = body;

    if (!name || !userId) {
      return sendError(
        'Name and userId are required',
        ERROR_CODES.MISSING_FIELDS,
        400
      );
    }

    // Verify user exists
    const userExists = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!userExists) {
      return sendError(
        'User not found',
        ERROR_CODES.USER_NOT_FOUND,
        404
      );
    }

    const project = await prisma.project.create({
      data: {
        name,
        userId: Number(userId),
        status,
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

    return sendSuccess(
      project,
      'Project created successfully',
      201
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return sendError(
      'Failed to create project',
      ERROR_CODES.CREATE_FAILED,
      500,
      error
    );
  }
}

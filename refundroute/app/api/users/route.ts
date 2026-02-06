/**
 * GET /api/users
 * 
 * Fetches all users with Redis caching (Cache-Aside Pattern)
 * - Cache Hit: Returns data from Redis (fast)
 * - Cache Miss: Fetches from database, caches result with TTL
 * 
 * TTL: 60 seconds
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";
import { handleError } from "@/lib/errorHandler";

export async function GET() {
  try {
    const cacheKey = "users:list";
    const startTime = Date.now();

    // Step 1: Check Redis cache
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      const latency = Date.now() - startTime;
      console.log(`✅ Cache Hit - Response time: ${latency}ms`);
      
      return NextResponse.json({
        success: true,
        source: "cache",
        latency: `${latency}ms`,
        data: JSON.parse(cachedData),
      });
    }

    // Step 2: Cache Miss - Fetch from database
    console.log("❌ Cache Miss - Fetching from database");
    const users = await prisma.user.findMany({
import { PrismaClient } from '@prisma/client';
import { sendSuccess, sendError, sendPaginatedSuccess } from '@/lib/responseHandler';
import { ERROR_CODES } from '@/lib/errorCodes';
import { createUserSchema } from '@/lib/schemas/userSchema';
import { ZodError } from 'zod';
import { handleValidationError } from '@/lib/validationHelpers';

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
    
    // Validate input with Zod
    const validatedData = createUserSchema.parse(body);
    const { name, email } = validatedData;

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    // Step 3: Store in cache with 60-second TTL
    await redis.set(cacheKey, JSON.stringify(users), "EX", 60);

    const latency = Date.now() - startTime;
    console.log(`💾 Data cached - Response time: ${latency}ms`);

    return NextResponse.json({
      success: true,
      source: "database",
      latency: `${latency}ms`,
      data: users,
    });
  } catch (error) {
    return handleError(error, "GET /api/users");
    return sendSuccess(
      user,
      'User created successfully',
      201
    );
  } catch (error: any) {
    console.error('Error creating user:', error);
    
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    
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

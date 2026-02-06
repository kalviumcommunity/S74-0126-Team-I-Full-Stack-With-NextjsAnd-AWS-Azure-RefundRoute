/**
 * POST /api/users/update
 * 
 * Updates user information and invalidates the users cache
 * to ensure fresh data on subsequent requests.
 * 
 * Cache Invalidation Strategy: Delete cache key after any user data mutation
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";
import { handleError, handleValidationError } from "@/lib/errorHandler";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, name } = body;

    // Validate input
    if (!id || !name) {
      return handleValidationError("User ID and name are required");
    }

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    // Invalidate cache after data mutation
    const cacheKey = "users:list";
    await redis.del(cacheKey);
    console.log(`🗑️  Cache invalidated: ${cacheKey}`);

    return NextResponse.json({
      success: true,
      message: "User updated successfully and cache invalidated",
      data: updatedUser,
    });
  } catch (error) {
    return handleError(error, "POST /api/users/update");
  }
}

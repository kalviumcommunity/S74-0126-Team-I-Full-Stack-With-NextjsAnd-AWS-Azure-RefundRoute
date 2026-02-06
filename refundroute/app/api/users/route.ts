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
  }
}

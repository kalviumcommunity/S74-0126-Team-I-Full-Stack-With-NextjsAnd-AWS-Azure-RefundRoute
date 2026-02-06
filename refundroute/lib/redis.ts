/**
 * Redis Client Configuration
 * 
 * Provides a centralized Redis connection for caching layer.
 * Uses environment variable REDIS_URL or defaults to localhost for development.
 */

import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  // Retry strategy for connection failures
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  // Connection timeout
  connectTimeout: 10000,
  // Enable offline queue to buffer commands when disconnected
  enableOfflineQueue: true,
});

// Log connection events
redis.on("connect", () => {
  console.log("✅ Redis connected successfully");
});

redis.on("error", (error) => {
  console.error("❌ Redis connection error:", error.message);
});

redis.on("ready", () => {
  console.log("🚀 Redis ready for caching operations");
});

export default redis;

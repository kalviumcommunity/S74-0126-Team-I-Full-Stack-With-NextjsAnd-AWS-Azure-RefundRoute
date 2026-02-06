import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { createUserSchema } from "@/lib/schemas/userSchema";
import { handleValidationError } from "@/lib/validationHelpers";
import { handleError } from "@/lib/errorHandler";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Validate input with Zod
    try {
      createUserSchema.parse({ name, email });
    } catch (error) {
      if (error instanceof ZodError) {
        return handleValidationError(error);
      }
    }

    // Validate password separately (not in schema to keep it flexible)
    if (!password || password.length < 6) {
      return sendError("Password must be at least 6 characters long", "E001", 400);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    });
    
    if (existingUser) {
      return sendError("User with this email already exists", "E409", 409);
    }

    // Hash the password with 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password (default role is "user")
    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        // role defaults to "user" from schema
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return sendSuccess("Signup successful", newUser, 201);
  } catch (error) {
    return handleError(error, "POST /api/auth/signup");
    console.error("Signup error:", error);
    return sendError("Signup failed", "E500", 500);
  }
}

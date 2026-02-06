import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { sendSuccess, sendError } from "@/lib/responseHandler";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validate required fields
    if (!email || !password) {
      return sendError("Email and password are required", "E001", 400);
    }

    // Find user by email
    const user = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    });

    if (!user) {
      return sendError("User not found", "E404_USER", 404);
    }

    // Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return sendError("Invalid credentials", "E401", 401);
    }

    // Generate JWT token with user ID, email, name, and role
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        name: user.name,
        role: user.role // Include role for authorization middleware
      },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    return sendSuccess(
      "Login successful",
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      200
    );
  } catch (error) {
    console.error("Login error:", error);
    return sendError("Login failed", "E500", 500);
  }
}

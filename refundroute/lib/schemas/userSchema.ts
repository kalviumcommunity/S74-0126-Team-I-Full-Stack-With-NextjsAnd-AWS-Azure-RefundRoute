import { z } from 'zod';

/**
 * User validation schemas
 */

// Schema for creating a new user
export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must not exceed 100 characters'),
  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase(),
});

// Schema for updating a user
export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must not exceed 100 characters')
    .optional(),
  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase()
    .optional(),
}).refine(data => data.name || data.email, {
  message: 'At least one field (name or email) must be provided',
});

// Infer TypeScript types from schemas
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

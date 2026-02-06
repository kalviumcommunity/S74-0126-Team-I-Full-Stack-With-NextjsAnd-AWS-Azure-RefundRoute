import { z } from 'zod';

/**
 * Project validation schemas
 */

// Schema for creating a new project
export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, 'Project name must be at least 3 characters long')
    .max(200, 'Project name must not exceed 200 characters'),
  userId: z
    .number()
    .int('User ID must be an integer')
    .positive('User ID must be a positive number'),
  status: z
    .enum(['active', 'inactive', 'archived'])
    .default('active')
    .optional(),
});

// Schema for updating a project
export const updateProjectSchema = z.object({
  name: z
    .string()
    .min(3, 'Project name must be at least 3 characters long')
    .max(200, 'Project name must not exceed 200 characters')
    .optional(),
  status: z
    .enum(['active', 'inactive', 'archived'], {
      errorMap: () => ({ message: 'Status must be active, inactive, or archived' }),
    })
    .optional(),
}).refine(data => data.name || data.status, {
  message: 'At least one field (name or status) must be provided',
});

// Infer TypeScript types from schemas
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

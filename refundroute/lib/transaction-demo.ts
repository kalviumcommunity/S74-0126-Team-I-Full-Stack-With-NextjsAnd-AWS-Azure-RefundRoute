import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Transaction Example: Create User and Project Atomically
 * Both operations succeed together or fail together
 */
export async function createUserWithProject(
  userName: string,
  userEmail: string,
  projectName: string
) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // Step 1: Create user
      const user = await tx.user.create({
        data: {
          name: userName,
          email: userEmail,
        },
      });

      // Step 2: Create project for the user
      const project = await tx.project.create({
        data: {
          name: projectName,
          userId: user.id,
          status: 'active',
        },
      });

      return { user, project };
    });

    console.log('✅ Transaction successful:', result);
    return result;
  } catch (error) {
    console.error('❌ Transaction failed. Rolling back.', error);
    throw error;
  }
}

/**
 * Transaction Example with Intentional Failure
 * Demonstrates rollback - no partial data will be saved
 */
export async function createUserWithProjectFailure(
  userName: string,
  userEmail: string,
  projectName: string
) {
  try {
    await prisma.$transaction(async (tx) => {
      // Step 1: Create user (succeeds)
      const user = await tx.user.create({
        data: {
          name: userName,
          email: userEmail,
        },
      });

      // Step 2: Intentional failure - duplicate email or invalid data
      // This will cause rollback - user won't be created either
      await tx.user.create({
        data: {
          name: 'Duplicate',
          email: userEmail, // Same email - will fail due to unique constraint
        },
      });

      await tx.project.create({
        data: {
          name: projectName,
          userId: user.id,
        },
      });
    });
  } catch (error) {
    console.error('❌ Transaction rolled back as expected:', error);
    throw error;
  }
}

/**
 * Optimized Query Example: Select only needed fields
 */
export async function getOptimizedUsers(page: number = 0, pageSize: number = 10) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: page * pageSize,
    take: pageSize,
  });

  console.log(`📊 Retrieved ${users.length} users (optimized query)`);
  return users;
}

/**
 * Optimized Query: Get active projects with user info
 */
export async function getActiveProjectsOptimized() {
  const projects = await prisma.project.findMany({
    where: {
      status: 'active', // Uses index
    },
    select: {
      id: true,
      name: true,
      status: true,
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
    take: 20,
  });

  console.log(`📊 Retrieved ${projects.length} active projects (indexed query)`);
  return projects;
}

/**
 * Batch Operation Example
 */
export async function createMultipleProjects(userId: number, projectNames: string[]) {
  const projects = await prisma.project.createMany({
    data: projectNames.map((name) => ({
      name,
      userId,
      status: 'active',
    })),
    skipDuplicates: true,
  });

  console.log(`✅ Created ${projects.count} projects in batch`);
  return projects;
}

// Example usage (uncomment to test)
// async function demo() {
//   // Success case
//   await createUserWithProject('Test User', 'test@example.com', 'Test Project');
//
//   // Rollback case (will fail)
//   try {
//     await createUserWithProjectFailure('Another User', 'test@example.com', 'Another Project');
//   } catch (e) {
//     console.log('Rollback verified - no data was saved');
//   }
//
//   // Optimized queries
//   await getOptimizedUsers(0, 10);
//   await getActiveProjectsOptimized();
// }

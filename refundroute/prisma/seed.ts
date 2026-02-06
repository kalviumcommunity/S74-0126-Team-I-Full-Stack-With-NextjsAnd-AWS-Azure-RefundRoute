import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  await prisma.user.createMany({
    data: [
      { name: 'Alice Johnson', email: 'alice@example.com' },
      { name: 'Bob Smith', email: 'bob@example.com' },
      { name: 'Charlie Davis', email: 'charlie@example.com' },
    ],
    skipDuplicates: true, // Skip duplicates to ensure idempotency
  });

  // Get users to create projects
  const alice = await prisma.user.findUnique({ where: { email: 'alice@example.com' } });
  const bob = await prisma.user.findUnique({ where: { email: 'bob@example.com' } });

  // Create sample projects
  if (alice) {
    await prisma.project.createMany({
      data: [
        { name: 'RefundRoute Dashboard', userId: alice.id },
        { name: 'Analytics System', userId: alice.id },
      ],
      skipDuplicates: true,
    });
  }

  if (bob) {
    await prisma.project.createMany({
      data: [
        { name: 'Mobile App', userId: bob.id },
      ],
      skipDuplicates: true,
    });
  }

  console.log('✅ Seed data inserted successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });

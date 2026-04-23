import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.project.updateMany({
    where: { slug: 'dailydocket' },
    data: { logo: '/dailydocket.svg' }
  });
  console.log(`Updated ${result.count} project(s) to use /dailydocket.svg as logo.`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

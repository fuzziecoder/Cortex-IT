
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasourceUrl: process.env.POSTGRES_PRISMA_URL,
});

async function test() {
  console.log("Testing connection to:", process.env.POSTGRES_PRISMA_URL);
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log("Connection successful:", result);
  } catch (err) {
    console.error("Connection failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

test();

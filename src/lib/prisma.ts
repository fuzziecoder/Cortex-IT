import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  let url = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_PRISMA_URL;
  if (url) {
    const separator = url.includes('?') ? '&' : '?';
    if (!url.includes('pool_timeout')) url += `${separator}pool_timeout=30`;
    if (!url.includes('connection_limit')) url += `&connection_limit=50`;
  }
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasourceUrl: url,
  })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

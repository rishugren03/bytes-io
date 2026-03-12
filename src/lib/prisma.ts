import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    // In development, we use a single connection to avoid exhaustion during HMR/fast refresh
    // especially when using Supabase Pooler (PgBouncer)
    datasourceUrl: process.env.DATABASE_URL + 
      (process.env.DATABASE_URL?.includes("?") ? "&" : "?") + 
      (process.env.NODE_ENV === "development" ? "connection_limit=1" : "connection_limit=10")
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
import { PrismaClient } from "@prisma/client";

let globalForPrisma = global as unknown as {
  user: any;
  $disconnect(): unknown;
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  //@ts-ignore
  globalForPrisma.prisma = prisma;
}

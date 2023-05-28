import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

let dbUrl = process.env.DOCKERIZED
  ? process.env.DEV_DATABASE_URL
  : process.env.POSTGRES_PRISMA_URL;
console.log("process.env.DOCKERIZED", process.env.DOCKERIZED);
console.log(dbUrl);

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  });
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient({
      datasources: {
        db: {
          url: dbUrl,
        },
      },
    });
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;

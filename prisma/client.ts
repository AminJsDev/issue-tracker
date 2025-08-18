// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Add a PrismaClient instance to the global object.
// This is to prevent the creation of new instances on hot reloads.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create a singleton instance.
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // In production, we don't need the global variable.
  prisma = new PrismaClient();
} else {
  // In development, we use the global variable.
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

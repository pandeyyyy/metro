const { PrismaClient } = require('@prisma/client');

// Instantiate the client once and export the instance
const prisma = new PrismaClient();

module.exports = prisma;

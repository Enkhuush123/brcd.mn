const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '.env' });
const prisma = new PrismaClient();
async function main() {
  const cats = await prisma.category.findMany();
  console.log(cats);
}
main();

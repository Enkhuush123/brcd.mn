import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });
import prisma from './src/lib/prisma';

async function main() {
  const cats = await prisma.category.findMany();
  console.log(cats);
}
main();

import prisma from './src/lib/prisma';
async function main() {
  const cats = await prisma.category.findMany();
  console.log(cats);
}
main();

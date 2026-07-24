const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.category.updateMany({
    where: { nameMn: 'Анализ ба нийтлэл' },
    data: { nameMn: 'Аналитик нийтлэл' }
  });
  console.log("Done");
}
main();

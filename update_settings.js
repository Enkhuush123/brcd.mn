const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.updateMany({
    data: {
      phone: '976-88087744',
      email: 'info@brcd-mongolia.org'
    }
  });
  console.log('Updated db');
}

main().catch(console.error).finally(() => prisma.$disconnect());

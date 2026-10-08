import { config } from "dotenv";
config();
import prisma from "./src/lib/prisma";

async function clean() {
  console.log("Connecting...");
  const articles = await prisma.article.findMany();
  for (const article of articles) {
    let changed = false;
    let data: any = {};
    
    if (article.contentMn && (article.contentMn.includes('\u200B') || article.contentMn.includes('\u00AD'))) {
      data.contentMn = article.contentMn.replace(/[\u200B\u00AD]/g, '');
      changed = true;
    }
    
    if (changed) {
      await prisma.article.update({
        where: { id: article.id },
        data
      });
      console.log("Cleaned article:", article.titleMn);
    }
  }
  console.log("Done DB clean");
}

clean();

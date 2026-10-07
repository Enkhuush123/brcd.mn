const fs = require('fs');

function fixHome(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Hero Title & Subtitle MN
  content = content.replace(/heroTitle1: "[^"]*"/, 'heroTitle1: "Евразийн холболт, Гео-эдийн засаг ба "');
  content = content.replace(/heroTitleHighlight: "[^"]*"/, 'heroTitleHighlight: "Монгол-Хятадын"');
  content = content.replace(/heroTitle2: "[^"]*"/, 'heroTitle2: " харилцаа"');
  content = content.replace(/heroDesc:\s*"[^"]*"/, 'heroDesc: "Бид бүс нутгийн хамтын ажиллагааг гүнзгийрүүлэх хараат бус судалгаа хийж, бодлогын зөвлөмж боловсруулдаг \\"Тинк-Танк\\" (Think-Tank) юм."');
  content = content.replace(/readLatest: "[^"]*"/, 'readLatest: "Бодлогын тойм унших"');

  // Hero Title & Subtitle ZH
  content = content.replace(/heroTitle1: "([^"]*)"/, 'heroTitle1: "欧亚互联、地缘经济与"');
  content = content.replace(/heroTitleHighlight: "([^"]*)"/, 'heroTitleHighlight: "中蒙"');
  content = content.replace(/heroTitle2: " ([^"]*)"/, 'heroTitle2: "关系"');
  content = content.replace(/heroDesc:\s*"([^"]*)"/, 'heroDesc: "我们是致力于深化区域合作、开展独立研究并制定政策建议的智库"');
  content = content.replace(/readLatest: "([^"]*)"/, 'readLatest: "查阅政策简报"');
  
  // Programs -> Research Priorities in MN
  content = content.replace(/progTitle: "[^"]*"/, 'progTitle: "Судалгааны чиглэл"');
  
  // Programs -> Research Priorities in ZH
  content = content.replace(/progTitle: "([^"]*)"/, 'progTitle: "研究方向"');

  // Now replace the layout
  // We need to move the blocks around.
  // It's probably easier to do this in a regular expression or just manually edit it.
  
  fs.writeFileSync(filePath, content, 'utf8');
}

fixHome('src/app/HomeClient.tsx');
console.log('Fixed Home Text');

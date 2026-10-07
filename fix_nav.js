const fs = require('fs');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // MN changes
  content = content.replace(/logoTitle: <>[^<]+<br\/>[^<]+<br\/>[^<]+<\/>/g, 'logoTitle: <>Нэг бүс нэг зам<br/>Хамтын хөгжил судалгааны төв</>');
  content = content.replace(/programs: "Судалгааны хөтөлбөр"/g, 'programs: "Судалгааны чиглэл"');
  content = content.replace(/prog3: "Ногоон эдийн засаг ба дижитал шилжилт"/g, 'prog3: "Ногоон эдийн засаг ба Дижитал шилжилт"');
  content = content.replace(/policyHub: "Монголын бодлогын тойм"/g, 'policyHub: "Бодлогын тойм"');
  content = content.replace(/ph1: "Монголын эдийн засаг, хөрөнгө оруулалт, худалдаа"/g, 'ph1: "Монголын эдийн засаг, хөрөнгө оруулалт"');
  content = content.replace(/ph3: "Хоёр талт болон бүс нутгийн интеграци"/g, 'ph3: "Хоёр талт болон Бүс нутгийн интеграци"');
  content = content.replace(/cooperation: "Түншүүд"/g, 'cooperation: "Хамтын ажиллагаа"');

  // ZH changes
  content = content.replace(/logoTitle: "一带一路，共同发展研究中心"/g, 'logoTitle: "一带一路共同发展研究中心"');
  content = content.replace(/programs: "研究项目"/g, 'programs: "研究方向"');
  content = content.replace(/policyHub: "政策简报"/g, 'policyHub: "政策述评"');
  content = content.replace(/ph1: "蒙古经济、投资与贸易"/g, 'ph1: "蒙古经济与投资"');
  content = content.replace(/ph3: "双边及区域一体化"/g, 'ph3: "双边与区域一体化"');
  content = content.replace(/cooperation: "合作伙伴"/g, 'cooperation: "合作交流"');

  fs.writeFileSync(filePath, content, 'utf8');
}

fixFile('src/components/Navbar.tsx');
fixFile('src/components/Footer.tsx');
console.log('Fixed Navbar and Footer');

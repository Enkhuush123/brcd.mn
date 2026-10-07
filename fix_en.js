const fs = require('fs');
const files = [
  'src/app/experts/ExpertsClient.tsx',
  'src/app/news/NewsClient.tsx',
  'src/app/publications/PublicationsClient.tsx',
  'src/app/publications/documents/[id]/DocumentReaderClient.tsx',
  'src/components/CategoryFeedClient.tsx',
  'src/components/ExpertsAndPartners.tsx',
  'src/app/about/AboutClient.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace language === 'EN' && something ? something : 
  content = content.replace(/(?:language|lang)\s*===\s*"EN"\s*&&\s*[a-zA-Z0-9_\.\?\[\]]+\s*\?\s*[a-zA-Z0-9_\.\?\[\]]+\s*:/g, '');
  
  // Replace (lang === "EN" && something ? something : (
  content = content.replace(/(?:language|lang)\s*===\s*"EN"\s*&&\s*[a-zA-Z0-9_\.\?\[\]]+\s*\?\s*[a-zA-Z0-9_\.\?\[\]]+\s*:\s*\(/g, '(');

  // Replace lang === "EN" ? "..." : 
  content = content.replace(/(?:language|lang)\s*===\s*"EN"\s*\?\s*"[^"]+"\s*:\s*/g, '');

  // Replace buttons
  content = content.replace(/<button[^>]*onClick=\{\(\)\s*=>\s*setLang\("EN"\)\}[^>]*>[\s\S]*?<\/button>/g, '');
  content = content.replace(/<button[^>]*onClick=\{\(\)\s*=>\s*setLanguage\("EN"\)\}[^>]*>[\s\S]*?<\/button>/g, '');

  // Replace vertical bars (assuming they are immediately followed by the ZH button or preceded by MN button)
  content = content.replace(/<div className="w-px h-6 bg-slate-200"><\/div>\s*(?=<button[^>]*onClick=\{\(\)\s*=>\s*setLanguage\("ZH"\)\})/g, '');
  content = content.replace(/<div className="w-px h-3 bg-slate-300"><\/div>\s*(?=<button[^>]*onClick=\{\(\)\s*=>\s*setLanguage\("ZH"\)\})/g, '');
  content = content.replace(/<div[^>]*bg-slate-300[^>]*><\/div>\s*(?=<button[^>]*onClick=\{\(\)\s*=>\s*setLanguage\("ZH"\)\})/g, '');

  // Just to be safe, any dangling "EN" logic
  content = content.replace(/language === "EN" \? [^:]+ : /g, '');
  content = content.replace(/lang === "EN" \? [^:]+ : /g, '');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Processed', file);
});

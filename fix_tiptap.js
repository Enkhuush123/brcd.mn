const fs = require('fs');
let file = fs.readFileSync('src/components/TiptapEditor.tsx', 'utf8');

file = file.replace(
  "return html.replace(/style=\"[^\"]*\"/gi, '').replace(/class=\"[^\"]*\"/gi, '');",
  "return html.replace(/style=\"[^\"]*\"/gi, '').replace(/class=\"[^\"]*\"/gi, '').replace(/[\\u200B\\u00AD]/g, '');"
);

fs.writeFileSync('src/components/TiptapEditor.tsx', file, 'utf8');

const fs = require('fs');
const file = 'src/components/TiptapEditor.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `    editorProps: {
      transformPastedHTML(html) {
        return html.replace(/style="[^"]*"/gi, '').replace(/class="[^"]*"/gi, '');
      },
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },`;

content = content.replace(/editorProps:\s*\{[\s\S]*?attributes:\s*\{[\s\S]*?class:\s*'prose[^']*',[\s\S]*?\},[\s\S]*?\},/, replacement);
fs.writeFileSync(file, content, 'utf8');

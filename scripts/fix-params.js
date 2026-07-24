const fs = require('fs');
const files = [
  'src/app/api/contact/[id]/route.ts',
  'src/app/api/authors/[id]/route.ts',
  'src/app/api/articles/[id]/route.ts',
  'src/app/api/documents/[id]/route.ts',
  'src/app/api/categories/[id]/route.ts'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace signature
  content = content.replace(
    /({ params }: { params: { id: string } })/g,
    '{ params }: { params: Promise<{ id: string }> }'
  );

  // Replace params.id with (await params).id
  content = content.replace(/params\.id/g, '(await params).id');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed', file);
});

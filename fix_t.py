import re
with open('src/app/HomeClient.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('const current = dict[language];', 'const current = dict[language];\n  const t = current;')

with open('src/app/HomeClient.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

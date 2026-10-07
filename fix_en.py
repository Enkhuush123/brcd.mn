import re

with open('src/app/HomeClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'language === \"EN\" && [a-zA-Z0-9_.\?]+\s*\?\s*[a-zA-Z0-9_.\?]+\s*:', '', content)
content = re.sub(r'language === \"EN\" \? \"[^\"]+\" : ', '', content)

with open('src/app/HomeClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

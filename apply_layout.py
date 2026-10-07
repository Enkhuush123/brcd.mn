import re

with open('src/app/HomeClient.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

with open('home_client_new.txt', 'r', encoding='utf-8') as f:
    new_jsx = f.read()

# Replace everything from BLOCK 1 down to the end of the JSX
# First find where BLOCK 1 starts
block1_idx = text.find('{/* BLOCK 1: Hero Section */}')

# Replace
new_text = text[:block1_idx] + new_jsx

with open('src/app/HomeClient.tsx', 'w', encoding='utf-8') as f:
    f.write(new_text)


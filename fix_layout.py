import re
with open('src/app/HomeClient.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

hero = re.search(r'\{/\* BLOCK 1: Hero Section \*/\}(.*?)(?=\{/\* BLOCK 1\.5:)', text, re.DOTALL).group(0)
latest_news = re.search(r'\{/\* BLOCK 1\.5: Latest News \*/\}(.*?)(?=\{/\* BLOCK 1\.8:)', text, re.DOTALL).group(0)
research = re.search(r'\{/\* BLOCK 2: Research Programs \*/\}(.*?)(?=\{/\* BLOCK 3:)', text, re.DOTALL).group(0)
policy_hub = re.search(r'\{/\* BLOCK 3: Mongolia Policy Hub \*/\}(.*?)(?=\{/\* BLOCK 4:)', text, re.DOTALL).group(0)
latest_insights = re.search(r'\{/\* BLOCK 4: Latest Insights \*/\}(.*?)(?=<ExpertsAndPartners)', text, re.DOTALL).group(0)

# Modify Latest Insights (to use 3 items)
latest_insights = latest_insights.replace('articles.map((article, i) => {', 'articles.slice(0, 3).map((article, i) => {')
# Rename block 1.5 to block 5
latest_news = latest_news.replace('{/* BLOCK 1.5: Latest News */}', '{/* BLOCK 5: Center News */}')

# Now construct the new JSX inside the return statement
new_jsx = hero + "\n      " + latest_insights + "\n      " + research + "\n      " + policy_hub + "\n      " + latest_news + "\n      "

# Replace everything from BLOCK 1 to <ExpertsAndPartners
text = re.sub(r'\{/\* BLOCK 1: Hero Section \*/\}(.*?)(?=<ExpertsAndPartners)', new_jsx, text, flags=re.DOTALL)

with open('src/app/HomeClient.tsx', 'w', encoding='utf-8') as f:
    f.write(text)


const fs = require('fs');

let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Remove the word-break overrides that are causing trouble
css = css.replace(/word-break: normal !important;/g, '');
css = css.replace(/overflow-wrap: break-word !important;/g, '');
// Let's also remove text-align: justify !important; since that creates huge gaps.
// We can use text-align: left, or just remove it to let Tailwind typography handle it.
css = css.replace(/text-align: justify !important;/g, 'text-align: left !important;');

fs.writeFileSync('src/app/globals.css', css, 'utf8');

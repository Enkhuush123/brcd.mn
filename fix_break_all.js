const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

css = css.replace('.prose * {', '.prose * {\n    color: inherit !important;\n    word-break: normal !important;\n    overflow-wrap: break-word !important;\n    white-space: normal !important;');

fs.writeFileSync('src/app/globals.css', css, 'utf8');

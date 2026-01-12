const fs = require('fs');
const path = require('path');

const files = [
  'docs/index.html',
  'docs/readme/index.html'
];

files.forEach(file => {
  const filePath = path.resolve(__dirname, '..', file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/piellardj/g, 'ramhaidar');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed: ${file}`);
});

console.log('All references updated!');

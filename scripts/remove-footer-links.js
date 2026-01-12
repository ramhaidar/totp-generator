const fs = require('fs');
const path = require('path');

// Function to remove mailto and LinkedIn links from HTML files
function removeFooterLinks(filePath) {
  console.log(`Processing ${filePath}...`);

  let content = fs.readFileSync(filePath, 'utf8');

  // Remove mailto link
  content = content.replace(/<a class="badge" href="mailto:jeremie\.piellard@gmail\.com"[^>]*>[\s\S]*?<\/a>/g, '');

  // Remove LinkedIn link
  content = content.replace(/<a class="badge" href="https:\/\/www\.linkedin\.com\/in\/jeremie-piellard\/"[^>]*>[\s\S]*?<\/a>/g, '');

  // Change Home title href to github.com/ramhaidar (only for the back-to-home-button)
  content = content.replace(/href="https:\/\/piellardj\.github\.io"[^>]*id="back-to-home-button"/g, 'href="https://github.com/ramhaidar" id="back-to-home-button"');
  content = content.replace(/href="https:\/\/ramhaidar\.github\.io"[^>]*id="back-to-home-button"/g, 'href="https://github.com/ramhaidar" id="back-to-home-button"');

  // Remove Explanations link
  content = content.replace(/ <a href="https:\/\/ramhaidar\.github\.io\/totp-generator\/readme">Explanations<\/a>/g, '');

  // Clean up any extra whitespace
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Removed footer links and updated Home href from ${filePath}`);
}

// Function to recursively find all HTML files in a directory
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (path.extname(file) === '.html') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Find all HTML files in the docs directory
const docsDir = path.join(__dirname, '..', 'docs');
const htmlFiles = findHtmlFiles(docsDir);

// Process each HTML file
htmlFiles.forEach(removeFooterLinks);

console.log('Footer link removal complete!');
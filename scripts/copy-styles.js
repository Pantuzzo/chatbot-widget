const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, '..', 'styles', 'globals.css');
const targetFile = path.join(__dirname, '..', 'dist', 'styles.css');

try {
  if (!fs.existsSync(path.dirname(targetFile))) {
    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
  }
  
  fs.copyFileSync(sourceFile, targetFile);
  console.log('Styles copied successfully');
} catch (err) {
  console.error('Error copying styles:', err);
  process.exit(1);
}
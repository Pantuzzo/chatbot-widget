const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Diretório de saída para o WebView empacotado
const OUTPUT_DIR = path.join(__dirname, '../dist-webview');

// Criar diretório de saída se não existir
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('Compilando o widget...');
try {
  // Executar o build principal do widget
  execSync('npm run build', { stdio: 'inherit' });
  
  // Copiar arquivos para o diretório de saída
  console.log('Copiando arquivos para o WebView...');
  
  // Copiar HTML
  fs.copyFileSync(
    path.join(__dirname, '../webview/index.html'),
    path.join(OUTPUT_DIR, 'index.html')
  );
  
  // Copiar JS
  fs.copyFileSync(
    path.join(__dirname, '../dist/index.js'),
    path.join(OUTPUT_DIR, 'index.js')
  );
  fs.copyFileSync(
    path.join(__dirname, '../dist/index.js.map'),
    path.join(OUTPUT_DIR, 'index.js.map')
  );
  
  // Copiar CSS
  fs.copyFileSync(
    path.join(__dirname, '../dist/styles.css'),
    path.join(OUTPUT_DIR, 'styles.css')
  );
  
  // Atualizar caminhos no HTML
  let htmlContent = fs.readFileSync(path.join(OUTPUT_DIR, 'index.html'), 'utf8');
  htmlContent = htmlContent.replace('../dist/styles.css', 'styles.css');
  htmlContent = htmlContent.replace('../dist/index.js', 'index.js');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), htmlContent);
  
  console.log('WebView empacotado com sucesso em ' + OUTPUT_DIR);
} catch (error) {
  console.error('Erro ao empacotar o WebView:', error);
  process.exit(1);
}

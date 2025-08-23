# Este script cria um pacote WebView a partir do componente React

# Criar a versão component do widget
npm run build

# Criar diretório para o WebView
mkdir -p dist-webview

# Copiar arquivos para o diretório WebView
cp dist/index.js dist-webview/
cp dist/index.js.map dist-webview/
cp dist/styles.css dist-webview/
cp webview/index.html dist-webview/
cp webview/config.json dist-webview/
cp webview/IMPLEMENTACAO.md dist-webview/

# Corrigir caminhos no HTML
sed -i 's|../dist/styles.css|styles.css|g' dist-webview/index.html
sed -i 's|../dist/index.js|index.js|g' dist-webview/index.html

echo "WebView package criado em dist-webview/"
echo "Para usar em um aplicativo nativo, consulte dist-webview/IMPLEMENTACAO.md"

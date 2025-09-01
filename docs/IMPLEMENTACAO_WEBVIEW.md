# Guia de Implementação WebView

Este guia explica como implementar o Hello CLI Chatbot Widget em ambientes WebView.

## Visão Geral

A implementação do WebView permite incorporar o widget de chat em aplicativos móveis nativos usando um componente WebView. O processo de build cria um pacote independente com todo o JavaScript e CSS necessários.

## Passos de Implementação

### 1. Construa o Pacote WebView

```bash
pnpm build:webview
```

Isso cria o diretório `/dist-webview` contendo todos os arquivos necessários.

### 2. Hospede os Arquivos WebView

Os seguintes arquivos precisam ser hospedados em um servidor web ou agrupados com seu aplicativo:

- `index.html` - Implementação de demonstração (apenas referência)
- `index.js` - Bundle JavaScript principal
- `styles.css` - Estilos CSS necessários
- `config.json` - Arquivo de configuração

### 3. Crie o Contêiner HTML

No seu HTML WebView, inclua:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Chat Widget</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="chat-widget-root"></div>
  <script src="index.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Inicializar o widget de chat
      HelloCliChatWidget.init({
        element: document.getElementById('chat-widget-root'),
        config: {
          title: "Assistente Virtual",
          welcomeMessage: "Olá! Como posso ajudar?",
          primaryColor: "#3B82F6",
          position: "right",
          height: "max"
        },
        callbacks: {
          onSendMessage: function(message) {
            // Lidar com o envio de mensagem
            console.log("Mensagem enviada:", message);
            
            // Opcional: Chame a função do aplicativo nativo via ponte
            try {
              window.webkit?.messageHandlers?.chatHandler?.postMessage({
                type: 'sendMessage',
                message: message
              });
            } catch (e) {
              console.error("Erro na ponte nativa:", e);
            }
          },
          onToggle: function(isOpen) {
            console.log("Chat alternado:", isOpen);
          }
        }
      });
    });
  </script>
</body>
</html>
```

### 4. Integração com Aplicativo Nativo

#### iOS (WKWebView)

```swift
import WebKit

class ChatViewController: UIViewController, WKScriptMessageHandler {
    var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Configurar WKWebView
        let config = WKWebViewConfiguration()
        let userContentController = WKUserContentController()
        userContentController.add(self, name: "chatHandler")
        config.userContentController = userContentController
        
        webView = WKWebView(frame: view.bounds, configuration: config)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        view.addSubview(webView)
        
        // Carregar o widget de chat
        if let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "chat-widget") {
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }
    }
    
    // Lidar com mensagens do WebView
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "chatHandler", let body = message.body as? [String: Any] {
            if let type = body["type"] as? String, type == "sendMessage",
               let messageText = body["message"] as? String {
                // Processar a mensagem
                print("Mensagem recebida: \(messageText)")
                
                // Enviar uma resposta de volta para o widget de chat
                let response = "Esta é uma resposta do código nativo"
                webView.evaluateJavaScript("HelloCliChatWidget.receiveMessage('\(response)')", completionHandler: nil)
            }
        }
    }
}
```

#### Android (WebView)

```kotlin
class ChatActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_chat)

        webView = findViewById(R.id.webView)
        webView.settings.javaScriptEnabled = true
        
        // Configurar interface JavaScript
        webView.addJavascriptInterface(ChatInterface(this), "AndroidChatHandler")
        
        // Carregar o widget de chat
        webView.loadUrl("file:///android_asset/chat-widget/index.html")
    }

    // Interface JavaScript
    private class ChatInterface(private val context: Context) {
        @JavascriptInterface
        fun sendMessage(message: String) {
            // Processar a mensagem
            Log.d("ChatWidget", "Mensagem recebida: $message")
            
            // Exemplo de resposta
            val handler = Handler(Looper.getMainLooper())
            handler.post {
                val webView = (context as ChatActivity).webView
                webView.evaluateJavascript(
                    "HelloCliChatWidget.receiveMessage('Esta é uma resposta do Android')",
                    null
                )
            }
        }
    }
}
```

### 5. Personalização via config.json

Você pode modificar `config.json` para personalizar o widget:

```json
{
  "titulo": "Assistente Virtual",
  "mensagemBoasVindas": "Como posso ajudar hoje?",
  "corPrimaria": "#3B82F6",
  "posicao": "right",
  "altura": "max",
  "placeholder": "Digite sua mensagem..."
}
```

## Solução de Problemas

### Problemas de Estilo

Se os estilos não estiverem carregando corretamente:
- Verifique se `styles.css` está carregado corretamente
- Verifique se as configurações do seu WebView permitem o carregamento de CSS
- O widget usa o prefixo `hello-cli-` para todas as classes CSS

### Problemas de Comunicação

Se as mensagens não estiverem sendo enviadas/recebidas:
- Verifique o console JavaScript para erros
- Verifique a implementação da ponte no código nativo
- Teste primeiro com a página HTML de demonstração

### Otimização de Desempenho

- Use builds minificados para produção
- Considere habilitar o cache do WebView
- Pré-carregue o WebView em segundo plano quando possível

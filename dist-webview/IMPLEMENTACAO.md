# Guia de Implementação do WebView Chat Widget

Este guia explica como implementar o chat widget em aplicativos nativos usando WebView.

## Conteúdo

1. [Preparação](#preparação)
2. [Implementação para Android](#implementação-para-android)
3. [Implementação para iOS](#implementação-para-ios)
4. [Comunicação entre WebView e Aplicativo Nativo](#comunicação-entre-webview-e-aplicativo-nativo)
5. [Personalização](#personalização)
6. [Solução de Problemas](#solução-de-problemas)

## Preparação

1. Construa o WebView empacotado:
   ```bash
   npm run build-webview
   ```

2. O resultado estará na pasta `dist-webview` com os seguintes arquivos:
   - `index.html`: Página principal do WebView
   - `index.js`: JavaScript do widget
   - `styles.css`: Estilos do widget
   - `config.json` (deve ser copiado manualmente): Arquivo de configuração

## Implementação para Android

### Kotlin

```kotlin
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import org.json.JSONObject

class ChatWebViewActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_chat_webview)

        webView = findViewById(R.id.webView)
        
        // Configurar WebView
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.webViewClient = WebViewClient()
        
        // Adicionar interface JavaScript para comunicação
        webView.addJavascriptInterface(WebViewInterface(), "Android")
        
        // Carregar WebView de assets ou servidor
        webView.loadUrl("file:///android_asset/webview/index.html")
        
        // Ou carregar de um servidor
        // webView.loadUrl("https://seu-dominio.com/chat-webview/")
    }
    
    // Tratar botão voltar
    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
    
    // Interface para comunicação JavaScript
    inner class WebViewInterface {
        @JavascriptInterface
        fun receiveMessage(message: String) {
            // Processar mensagem do WebView
            try {
                val json = JSONObject(message)
                // Processar mensagem conforme necessário
                
                // Exemplo: responder ao WebView
                val response = JSONObject()
                response.put("type", "response")
                response.put("data", "Mensagem recebida!")
                
                runOnUiThread {
                    webView.evaluateJavascript(
                        "window.webViewBridge.receiveMessageFromNative(${response.toString()})",
                        null
                    )
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}
```

### Layout XML

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <WebView
        android:id="@+id/webView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

## Implementação para iOS

### Swift

```swift
import UIKit
import WebKit

class ChatWebViewViewController: UIViewController, WKScriptMessageHandler {
    
    private var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Configurar WebView
        let configuration = WKWebViewConfiguration()
        let contentController = WKUserContentController()
        
        // Adicionar handler para mensagens JavaScript
        contentController.add(self, name: "messageHandler")
        configuration.userContentController = contentController
        
        // Criar WebView
        webView = WKWebView(frame: view.bounds, configuration: configuration)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        webView.navigationDelegate = self
        view.addSubview(webView)
        
        // Carregar HTML do bundle
        if let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "webview") {
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }
        
        // Ou carregar de um servidor
        // if let url = URL(string: "https://seu-dominio.com/chat-webview/") {
        //     webView.load(URLRequest(url: url))
        // }
    }
    
    // Receber mensagens do JavaScript
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "messageHandler" {
            if let messageDict = message.body as? [String: Any] {
                // Processar mensagem
                
                // Responder ao WebView
                let response = ["type": "response", "data": "Mensagem recebida!"]
                if let jsonData = try? JSONSerialization.data(withJSONObject: response),
                   let jsonString = String(data: jsonData, encoding: .utf8) {
                    let js = "window.webViewBridge.receiveMessageFromNative(\(jsonString))"
                    webView.evaluateJavaScript(js, completionHandler: nil)
                }
            }
        }
    }
}

// Extensão para WKNavigationDelegate
extension ChatWebViewViewController: WKNavigationDelegate {
    // Implementar métodos de navegação se necessário
}
```

## Comunicação entre WebView e Aplicativo Nativo

### Enviar mensagem do WebView para o nativo

```javascript
// No JavaScript do WebView
window.webViewBridge.sendMessageToNative({
    type: 'action',
    action: 'sendMessage',
    data: {
        message: 'Olá do WebView!'
    }
});
```

### Enviar mensagem do nativo para o WebView

#### Android (Kotlin)

```kotlin
// No código Kotlin
val message = JSONObject()
message.put("type", "newMessage")
message.put("text", "Olá do Android!")

webView.evaluateJavascript(
    "window.webViewBridge.receiveMessageFromNative(${message.toString()})",
    null
)
```

#### iOS (Swift)

```swift
// No código Swift
let message = ["type": "newMessage", "text": "Olá do iOS!"]
if let jsonData = try? JSONSerialization.data(withJSONObject: message),
   let jsonString = String(data: jsonData, encoding: .utf8) {
    let js = "window.webViewBridge.receiveMessageFromNative(\(jsonString))"
    webView.evaluateJavaScript(js, completionHandler: nil)
}
```

## Personalização

### Configuração do WebView

Modifique o arquivo `config.json` para personalizar o comportamento e aparência do chat:

```json
{
  "chatConfig": {
    "title": "Seu Título Personalizado",
    "initialMessage": "Sua mensagem inicial personalizada",
    "theme": {
      "primaryColor": "#seu-codigo-hex"
    }
  }
}
```

## Solução de Problemas

### WebView não carrega

- Verifique se os arquivos estão no local correto
- Para Android, verifique se os arquivos estão na pasta `assets/webview/`
- Para iOS, verifique se os arquivos estão no bundle do app
- Habilite logs de WebView para debug

### Problemas de comunicação JavaScript

- Verifique se JavaScript está habilitado no WebView
- Confirme que as interfaces JavaScript estão configuradas corretamente
- Use console.log no WebView e verifique os logs

### Problemas de estilo

- Verifique se o arquivo CSS está sendo carregado corretamente
- Verifique se o viewport está configurado corretamente
- Teste em diferentes tamanhos de tela

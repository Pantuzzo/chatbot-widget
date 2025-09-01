# WebView Implementation Guide

This guide explains how to implement the Hello CLI Chatbot Widget in WebView environments.

## Overview

The WebView implementation allows you to embed the chat widget in native mobile applications using a WebView component. The build process creates a self-contained bundle with all necessary JavaScript and CSS.

## Implementation Steps

### 1. Build the WebView Package

```bash
pnpm build:webview
```

This creates the `/dist-webview` directory containing all necessary files.

### 2. Host the WebView Files

The following files need to be hosted on a web server or bundled with your application:

- `index.html` - Demo implementation (reference only)
- `index.js` - Main JavaScript bundle
- `styles.css` - Required CSS styles
- `config.json` - Configuration file

### 3. Create HTML Container

In your WebView HTML, include:

```html
<!DOCTYPE html>
<html lang="en">
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
      // Initialize the chat widget
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
            // Handle message sending
            console.log("Mensagem enviada:", message);
            
            // Optional: Call native app function via bridge
            try {
              window.webkit?.messageHandlers?.chatHandler?.postMessage({
                type: 'sendMessage',
                message: message
              });
            } catch (e) {
              console.error("Native bridge error:", e);
            }
          },
          onToggle: function(isOpen) {
            console.log("Chat toggled:", isOpen);
          }
        }
      });
    });
  </script>
</body>
</html>
```

### 4. Native App Integration

#### iOS (WKWebView)

```swift
import WebKit

class ChatViewController: UIViewController, WKScriptMessageHandler {
    var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Setup WKWebView
        let config = WKWebViewConfiguration()
        let userContentController = WKUserContentController()
        userContentController.add(self, name: "chatHandler")
        config.userContentController = userContentController
        
        webView = WKWebView(frame: view.bounds, configuration: config)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        view.addSubview(webView)
        
        // Load the chat widget
        if let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "chat-widget") {
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }
    }
    
    // Handle messages from WebView
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "chatHandler", let body = message.body as? [String: Any] {
            if let type = body["type"] as? String, type == "sendMessage",
               let messageText = body["message"] as? String {
                // Process the message
                print("Received message: \(messageText)")
                
                // Send a response back to the chat widget
                let response = "This is a response from native code"
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
        
        // Set up JavaScript interface
        webView.addJavascriptInterface(ChatInterface(this), "AndroidChatHandler")
        
        // Load the chat widget
        webView.loadUrl("file:///android_asset/chat-widget/index.html")
    }

    // JavaScript interface
    private class ChatInterface(private val context: Context) {
        @JavascriptInterface
        fun sendMessage(message: String) {
            // Process the message
            Log.d("ChatWidget", "Received message: $message")
            
            // Example response
            val handler = Handler(Looper.getMainLooper())
            handler.post {
                val webView = (context as ChatActivity).webView
                webView.evaluateJavascript(
                    "HelloCliChatWidget.receiveMessage('This is a response from Android')",
                    null
                )
            }
        }
    }
}
```

### 5. Customization via config.json

You can modify `config.json` to customize the widget:

```json
{
  "title": "Assistente Virtual",
  "welcomeMessage": "Como posso ajudar hoje?",
  "primaryColor": "#3B82F6",
  "position": "right",
  "height": "max",
  "placeholder": "Digite sua mensagem..."
}
```

## Troubleshooting

### Styling Issues

If styles aren't loading correctly:
- Check that `styles.css` is properly loaded
- Verify that your WebView settings allow CSS loading
- The widget uses the `hello-cli-` prefix for all CSS classes

### Communication Problems

If messages aren't being sent/received:
- Check JavaScript console for errors
- Verify bridge implementation in native code
- Test with the demo HTML page first

### Performance Optimization

- Use minified builds for production
- Consider enabling WebView caching
- Pre-load the WebView in background when possible

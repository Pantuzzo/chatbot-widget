# ChatBot Widget

A customizable chat widget component for React applications, available both as an npm package and as a standalone WebView solution for mobile apps.

## Features

- Modern, responsive chat interface
- Customizable themes and styling
- WebView ready for embedding in native mobile apps
- Supports attachments, typing indicators, and more
- Built with React and TypeScript

## Usage as React Component

### Installation

```bash
npm install hello-cli-chatbot-widget
```

### Integration

```tsx
// Importe o CSS primeiro (obrigatório)
import 'hello-cli-chatbot-widget/dist/styles.css';

// Em seguida, importe o componente
import { ChatWidget } from 'hello-cli-chatbot-widget';

// Você também pode importar os tipos para TypeScript
import type { ChatWidgetProps, Message } from 'hello-cli-chatbot-widget';
```

Se estiver tendo problemas com o autocompletar do TypeScript ou com a importação do componente, tente:

```tsx
// Método alternativo de importação
import * as ChatbotWidget from 'hello-cli-chatbot-widget';
const { ChatWidget } = ChatbotWidget;
```

function App() {
  return (
    <ChatWidget 
      title="Chat Support"
      welcomeMessage="How can I help you today?"
      position="right"
      primaryColor="#007bff"
    />
  );
}
```

## Required CSS

Add these imports to your global CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## WebView Integration

The chat widget can also be used as a standalone WebView that can be embedded in native mobile applications.

### Building the WebView Package

```bash
npm run build-webview
```

This will generate a complete WebView package in the `dist-webview` folder containing:
- HTML, JavaScript, and CSS files
- Ready-to-use WebView implementation
- Configuration options

### Native App Integration

The WebView version can be easily integrated into:
- Android applications using WebView
- iOS applications using WKWebView
- React Native applications using WebView component

Refer to the [WebView Implementation Guide](webview/IMPLEMENTACAO.md) for detailed instructions on integrating with native applications.

### WebView Customization

The WebView version can be customized through the `config.json` file:

```json
{
  "chatConfig": {
    "title": "Chat Support",
    "initialMessage": "How can I help you today?",
    "theme": {
      "primaryColor": "#007bff"
    }
  }
}
```

## Licensing

This WebView package is available for commercial licensing. Please contact us for pricing and terms.
```

## Solução de Problemas

### Estilos não aparecem
Se os estilos do componente não aparecerem, certifique-se de importar o CSS:

```tsx
import 'hello-cli-chatbot-widget/dist/styles.css';
```

### Erros de TypeScript
Se encontrar erros de TypeScript como "Could not find a declaration file":

1. **Certifique-se de estar usando a versão 1.22.0 ou superior** que inclui o arquivo de declaração corretamente.

2. Atualize sua dependência:
```bash
npm install hello-cli-chatbot-widget@latest
```

3. Importe os tipos explicitamente:
```tsx
import type { ChatWidgetProps, Message } from 'hello-cli-chatbot-widget';
```

4. Se o componente não aparecer no autocompletar, tente importar usando o método alternativo:
```tsx
import * as ChatbotWidget from 'hello-cli-chatbot-widget';
const { ChatWidget } = ChatbotWidget;
```

5. Se ainda encontrar problemas, adicione manualmente uma declaração de módulo no seu projeto:
```ts
// Em um arquivo de declarações (ex: globals.d.ts)
declare module 'hello-cli-chatbot-widget' {
  import { FC } from 'react';
  
  export interface Message {
    id: string;
    role: 'user' | 'bot';
    content: string;
    createdAt: Date;
  }
  
  export interface ChatWidgetProps {
    initialMessages?: Message[];
    placeholder?: string;
    onSendMessage?: (message: string) => void;
    position?: "left" | "right";
    primaryColor?: string;
    title?: string;
    welcomeMessage?: string;
    onToggle?: (isOpen: boolean) => void;
    defaultOpen?: boolean;
    className?: string;
  }
  
  export const ChatWidget: FC<ChatWidgetProps>;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | "Assistente Virtual" | Chat window title |
| position | "left" \| "right" | "left" | Widget position |
| primaryColor | string | "hsl(var(--primary))" | Primary color |
...
# Hello CLI Chat Widget

Um componente de chat widget altamente personalizável para aplicações React e WebView, proporcionando uma experiência de atendimento interativa e moderna.

![Version](https://img.shields.io/badge/version-1.25.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Recursos

- ✅ Interface de chat moderna e responsiva
- ✅ Temas e estilos personalizáveis 
- ✅ WebView pronto para incorporação em aplicativos nativos
- ✅ Suporta indicadores de digitação
- ✅ Controle de posicionamento (esquerda/direita)
- ✅ Compatível com Typescript
- ✅ Baseado em Tailwind com prefixo isolado `hello-cli-`
- ✅ Componentes baseados em [shadcn/ui](https://ui.shadcn.com/)
- ✅ Arquitetura modular com componentes reutilizáveis
- ✅ Código limpo sem estilos inline
- ✅ Totalmente documentado em português

## 📦 Instalação

```bash
npm install hello-cli-chatbot-widget
# ou
yarn add hello-cli-chatbot-widget
# ou
pnpm add hello-cli-chatbot-widget
```

## 💻 Uso como Componente React

### Importação

```tsx
// Importe o CSS primeiro (obrigatório)
import 'hello-cli-chatbot-widget/dist/styles.css';

// Em seguida, importe o componente
import { ChatWidget } from 'hello-cli-chatbot-widget';

// Você também pode importar os tipos para TypeScript
```

### Componente Básico

```tsx
<ChatWidget
  title="Assistente Virtual"
  welcomeMessage="Olá! Como posso ajudar?"
  onSendMessage={(message) => {
    // Implemente sua lógica de envio aqui
    console.log("Mensagem enviada:", message);
  }}
/>
```

### Componente Completo

```tsx
<ChatWidget
  initialMessages={[
    { id: "1", role: "bot", content: "Bem-vindo!", createdAt: new Date() }
  ]}
  placeholder="Digite sua mensagem..."
  onSendMessage={handleSendMessage}
  position="right"
  primaryColor="#3B82F6"
  title="Assistente Virtual"
  welcomeMessage="Olá! Como posso ajudar você hoje?"
  onToggle={(isOpen) => console.log("Chat está:", isOpen ? "aberto" : "fechado")}
  defaultOpen={false}
  height="max" // "min", "med", ou "max"
  className="meu-chat-customizado"
/>
```

### Usando Componentes Modulares

A partir da versão 1.26.0, você também pode usar componentes individuais:

```tsx
import { 
  BotaoToggle, 
  CabecalhoChat, 
  AreaMensagens, 
  AreaEntrada 
} from 'hello-cli-chatbot-widget/components/chatbot/componentes';

// Exemplo de uso em componente personalizado
const MeuChatPersonalizado = () => {
  const [estaAberto, setEstaAberto] = useState(false);
  const [mensagens, setMensagens] = useState([...]);
  const [valorEntrada, setValorEntrada] = useState('');

  return (
    <div>
      <BotaoToggle 
        estaAberto={estaAberto}
        aoAlternar={() => setEstaAberto(!estaAberto)}
        corPrimaria="#FF5500"
        posicao="right"
      />
      
      {estaAberto && (
        <div>
          <CabecalhoChat 
            titulo="Meu Chat Personalizado"
            corPrimaria="#FF5500"
            aoFechar={() => setEstaAberto(false)}
          />
          
          <AreaMensagens 
            mensagens={mensagens}
            estaDigitando={false}
          />
          
          <AreaEntrada 
            valor={valorEntrada}
            aoMudar={(e) => setValorEntrada(e.target.value)}
            aoPressionarTecla={handleKeyPress}
            aoEnviar={enviarMensagem}
            placeholder="Digite aqui..."
            corPrimaria="#FF5500"
          />
        </div>
      )}
    </div>
  );
};
```

## ⚙️ Configuração

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `initialMessages` | `Message[]` | `[]` | Lista inicial de mensagens |
| `placeholder` | `string` | `"Digite sua mensagem..."` | Texto do placeholder do input |
| `onSendMessage` | `(message: string) => void` | - | Callback quando uma mensagem é enviada |
| `position` | `"left" \| "right"` | `"left"` | Posição do widget na tela |
| `primaryColor` | `string` | `"hsl(var(--primary))"` | Cor primária do widget |
| `title` | `string` | `"Assistente Virtual"` | Título do widget |
| `welcomeMessage` | `string` | `"Olá! Como posso ajudá-lo hoje?"` | Mensagem de boas-vindas |
| `onToggle` | `(isOpen: boolean) => void` | - | Callback quando o widget é aberto/fechado |
| `defaultOpen` | `boolean` | `false` | Define se o widget deve iniciar aberto |
| `height` | `"min" \| "med" \| "max"` | `"max"` | Altura do widget |
| `className` | `string` | - | Classes CSS adicionais |

### Solução de Problemas de Estilo

Se os estilos não estiverem sendo aplicados corretamente:

1. **Certifique-se que o CSS está sendo importado antes do componente**
   ```tsx
   // Sempre primeiro
   import 'hello-cli-chatbot-widget/dist/styles.css';
   ```

### Documentação Adicional

Para desenvolvedores que desejam contribuir ou personalizar profundamente o componente:

- [Guia do Desenvolvedor](./docs/GUIA_DESENVOLVEDOR.md) - Informações detalhadas para contribuidores
- [Implementação WebView](./docs/IMPLEMENTACAO_WEBVIEW.md) - Como integrar em aplicativos nativos

2. **Para Next.js**:
   - Importe o CSS no arquivo `_app.js` ou `layout.js`:
   ```tsx
   // pages/_app.js ou app/layout.js
   import 'hello-cli-chatbot-widget/dist/styles.css';
   ```

3. **Para Webpack/Vite**:
   - Certifique-se que seu bundler está configurado para processar arquivos CSS
   
4. **Para importação direta no HTML**:
   - Se estiver usando o componente via CDN ou WebView, adicione:
   ```html
   <link rel="stylesheet" href="./node_modules/hello-cli-chatbot-widget/dist/styles.css">
   ```

5. **Se ainda houver problemas de estilo**, crie um arquivo CSS personalizado:
   ```css
   /* chatfix.css */
   .hello-cli-message-bubble {
     border-radius: 0.5rem !important;
     overflow: hidden;
   }
   
   .hello-cli-user-message {
     background-color: hsl(222.2, 47.4%, 11.2%) !important;
     color: white !important;
   }
   
   .hello-cli-bot-message {
     background-color: hsl(210, 40%, 96.1%) !important;
     color: hsl(215.4, 16.3%, 46.9%) !important;
   }
   ```

## 🌐 WebView

O componente também está disponível como uma solução WebView para incorporação em aplicativos nativos.

### Construindo o WebView

```bash
npm run build-webview
```

### Estrutura de Arquivos do WebView

Após a construção, os arquivos estarão disponíveis na pasta `dist-webview`:

- `index.html` - Página principal do WebView
- `index.js` - JavaScript compilado
- `styles.css` - Estilos compilados
- `config.json` - Configurações do chat
- `demo.html` - Demonstração interativa
- `IMPLEMENTACAO.md` - Guia de implementação

### Deploy do WebView

```bash
npm run deploy-webview
```

Para mais detalhes sobre implementação em aplicativos nativos, consulte `IMPLEMENTACAO.md` na pasta `dist-webview`.

## 🚀 Desenvolvimento

### Requisitos

- Node.js 16+
- npm, yarn ou pnpm

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev         # Inicia o desenvolvimento com hot-reload

# Build
npm run build       # Constrói o pacote npm
npm run build-webview  # Constrói a versão WebView

# Storybook
npm run storybook   # Inicia o Storybook para desenvolvimento de UI
npm run build-storybook  # Constrói o Storybook para publicação

# Testes e linting
npm run test:lint   # Executa verificação de linting
```

## 📁 Estrutura do Projeto

```
hello-cli-chatbot-widget/
├── components/         # Componentes React
│   ├── chatbot/        # Componentes do chat
│   ├── message/        # Componentes de mensagem
│   ├── ui/             # Componentes de UI reutilizáveis
│   └── index.ts        # Exportações principais
├── dist/               # Código compilado para npm
├── dist-webview/       # Código compilado para WebView
├── hooks/              # Hooks React customizados
├── lib/                # Utilitários e funções auxiliares
├── scripts/            # Scripts de build e utilitários
├── stories/            # Histórias do Storybook
├── styles/             # Estilos globais
├── types/              # Definições de tipos TypeScript
└── webview/            # Arquivos fonte do WebView
```

## 👥 Contribuições

Contribuições são bem-vindas! Por favor, leia nosso guia de contribuição antes de enviar PRs.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas alterações (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

---

Desenvolvido com ❤️ por Hello CLI Team
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
# Guia do Desenvolvedor

Este guia é para desenvolvedores que contribuem para o projeto Hello CLI Chatbot Widget.

## Estrutura do Projeto

```
hello-cli-chatbot-widget/
├── app/                    # App de demonstração Next.js
├── components/             # Componentes React principais
│   ├── chatbot/            # Componentes do chatbot
│   │   ├── componentes/    # Componentes modulares do chat
│   │   └── chat-widget.tsx # Componente principal
│   ├── message/            # Componentes de exibição de mensagens
│   └── ui/                 # Componentes da interface baseados em shadcn/ui
├── dist/                   # Saída da biblioteca construída
├── dist-webview/           # Saída da versão WebView
├── hooks/                  # Hooks React
├── lib/                    # Funções utilitárias
├── public/                 # Recursos estáticos
├── scripts/                # Scripts de build e implantação
├── stories/                # Histórias do Storybook
├── styles/                 # Estilos CSS globais
├── types/                  # Definições de tipos TypeScript
└── webview/                # Arquivos de implementação WebView
```

## Fluxo de Trabalho de Desenvolvimento

### Configuração

1. Clone o repositório
2. Instale as dependências: `pnpm install`
3. Inicie o servidor de desenvolvimento: `pnpm dev`

### Construção

- Build da biblioteca: `pnpm build`
- Build da versão WebView: `pnpm build:webview`

### Testes

- Executar testes: `pnpm test`
- Teste com cobertura: `pnpm test:coverage`
- Executar linting: `pnpm lint`

### Documentação

- Storybook: `pnpm storybook`

## Estilização CSS

Este projeto usa Tailwind CSS com um prefixo personalizado `hello-cli-` para evitar conflitos. Todas as classes CSS devem usar este prefixo.

### Variáveis CSS

Os estilos principais são definidos como variáveis CSS em `components/index.css`:

```css
:root {
  --hello-cli-primary: 222.2 47.4% 11.2%;
  --hello-cli-background: 0 0% 100%;
  --hello-cli-foreground: 222.2 47.4% 11.2%;
  /* ... variáveis adicionais */
}
```

## Estrutura de Componentes

O widget de chat foi refatorado para usar uma arquitetura mais modular e limpa:

### Componentes Principais

- `BotaoToggle`: Botão flutuante para abrir/fechar o chat
- `CabecalhoChat`: Cabeçalho do chat com título e botão de fechar
- `AreaMensagens`: Área de exibição das mensagens
- `MensagemChat`: Componente individual de mensagem
- `IndicadorDigitacao`: Animação de digitação
- `AreaEntrada`: Campo de entrada de texto e botão de envio

### Uso dos Componentes Modulares

```tsx
// Importar componentes individuais
import { CabecalhoChat, AreaMensagens, AreaEntrada } from '../componentes';

// Uso em um componente personalizado
const MeuChat = () => {
  return (
    <div>
      <CabecalhoChat titulo="Meu Chat" corPrimaria="#3B82F6" aoFechar={handleClose} />
      <AreaMensagens mensagens={minhasMensagens} estaDigitando={estaDigitando} />
      <AreaEntrada 
        valor={valorEntrada} 
        aoMudar={handleChange} 
        aoPressionarTecla={handleKeyPress} 
        aoEnviar={enviarMensagem} 
        placeholder="Digite sua mensagem..." 
        corPrimaria="#3B82F6" 
      />
    </div>
  );
};
```

## Desenvolvimento WebView

Ao desenvolver para WebView:

1. Faça alterações no componente
2. Construa a versão WebView: `pnpm build:webview`
3. Teste usando o HTML de demonstração em `dist-webview/index.html`

Consulte o [Guia de Implementação WebView](./WEBVIEW_IMPLEMENTATION.md) para detalhes.

## Diretrizes de Commit

Siga o formato de commits convencionais:

- `feat:` Novos recursos
- `fix:` Correções de bugs
- `docs:` Alterações na documentação
- `style:` Alterações no estilo do código (formatação, etc)
- `refactor:` Alterações no código que não corrigem bugs nem adicionam recursos
- `test:` Adicionando ou atualizando testes
- `chore:` Alterações no processo de build ou ferramentas auxiliares

## Processo de Lançamento

1. Atualize a versão no `package.json`
2. Atualize o `CHANGELOG.md`
3. Crie um commit de lançamento: `git commit -m "chore: release v1.x.x"`
4. Crie uma tag git: `git tag v1.x.x`
5. Envie as alterações: `git push && git push --tags`
6. Construa e publique: `pnpm build && pnpm publish`

## Recursos Adicionais

- [Diretrizes de Contribuição](./CONTRIBUTING.md)
- [Código de Conduta](./CODE_OF_CONDUCT.md)

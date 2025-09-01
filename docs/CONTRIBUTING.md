# Contribuindo para o Hello CLI Chatbot Widget

Obrigado por considerar contribuir para o Hello CLI Chatbot Widget! Este documento descreve o processo para contribuir com este projeto.

## Configuração de Desenvolvimento

1. Faça fork e clone do repositório
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

## Construção

Para construir a biblioteca de componentes:

```bash
pnpm build
```

Para construir a versão WebView:

```bash
pnpm build:webview
```

## Estilo de Código

Este projeto usa:
- ESLint para linting de código
- Prettier para formatação de código
- TypeScript para verificação estática de tipos

Antes de enviar um pull request, certifique-se de que seu código passe em todas as verificações de linting:

```bash
pnpm lint
```

## Processo de Pull Request

1. Crie uma branch com um nome descritivo relacionado à feature ou correção
2. Faça suas alterações e commit com mensagens claras e descritivas
3. Atualize a documentação conforme necessário
4. Envie um pull request para a branch `main`
5. Atenda a qualquer feedback dos revisores

## Desenvolvimento WebView

Ao trabalhar na funcionalidade WebView:

1. Construa a versão WebView usando `pnpm build:webview`
2. Teste usando a página HTML de demonstração em `dist-webview/index.html`
3. Verifique se o estilo funciona corretamente com o prefixo CSS `hello-cli-`

## Versionamento

Este projeto segue o [Versionamento Semântico](https://semver.org/). Ao contribuir com alterações que afetam a API pública:

- Versão MAJOR para alterações incompatíveis na API
- Versão MINOR para funcionalidades adicionadas de maneira compatível
- Versão PATCH para correções de bugs compatíveis

## Processo de Lançamento

1. Atualize o arquivo CHANGELOG.md com detalhes das alterações
2. Atualize a versão no package.json
3. Crie uma tag git com o novo número de versão
4. Publique no npm com `pnpm publish`

Obrigado por suas contribuições!

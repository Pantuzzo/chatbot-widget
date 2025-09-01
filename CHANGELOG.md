# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.26.0] - 2025-08-23

### Adicionado
- Arquitetura de componentes modulares para melhor manutenção
- Novos componentes separados para cada parte do chat widget
- Interface em português para desenvolvedores brasileiros
- Documentação completa em português
- Guia de desenvolvedor atualizado

### Alterado
- Refatoração de código para remover estilos inline
- Melhoria na estrutura de validações com constantes nomeadas
- Melhor organização de constantes e variáveis
- Documentação migrada para português

### Corrigido
- Problemas de estilo com componentes aninhados
- Melhorias de acessibilidade e experiência do usuário

## [1.25.0] - 2023-12-10
- Resolvido problema de importação CSS para o WebView e projetos Next.js
- Integrados os estilos do arquivo chat-widget.css diretamente no arquivo index.css principal
- Adicionados estilos inline para garantir a aplicação correta de bordas e layouts

### Adicionado
- Suporte para diferentes alturas do chat widget com a prop `height`
- Página de demonstração interativa para WebView
- Script de deploy para WebView

## [1.24.0] - 2025-08-23

### Adicionado
- Classes CSS independentes do Tailwind para maior compatibilidade
- Estilos inline para garantir a consistência visual em diferentes ambientes
- Melhores mensagens de erro para depuração

### Corrigido
- Melhorada a compatibilidade dos estilos entre diferentes frameworks
- Adicionado prefixo `hello-cli-` a todos os elementos

## [1.23.0] - 2025-08-22

### Adicionado
- Estilos específicos para balões de mensagem
- Classes com maior especificidade para compatibilidade

### Corrigido
- Problemas com a aplicação das bordas arredondadas nos balões de mensagem
- Inconsistências de estilo entre desenvolvimento e produção

## [1.22.0] - 2025-08-21

### Adicionado
- Arquivo de declaração TypeScript na raiz do projeto
- Melhor documentação para importações TypeScript

### Corrigido
- Problemas de descoberta do arquivo de declaração TypeScript
- Campo `types` no package.json aponta agora para o arquivo correto

## [1.14.0 - 1.21.0] - 2025-08-20

### Adicionado
- Suporte a Tailwind com prefixo personalizado
- Componentes base do chat widget
- Implementação do WebView
- Sistema de build com Rollup

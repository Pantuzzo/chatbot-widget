# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.27.7] - 2025-09-01

### Mudanças
- Reorganização da estrutura de arquivos do projeto
- Movidos arquivos de documentação (CODE_OF_CONDUCT.md, CONTRIBUTING.md, CHANGELOG.md) para a pasta `/docs`
- Removidas configurações do Vite não utilizadas

## [1.27.6] - 2025-09-01

### Corrigido
- Corrigido problema com o indicador de digitação (três pontos) não aparecendo
- Melhorada a funcionalidade de rolagem automática para o final da conversa
- Adicionados logs de depuração para ajudar na solução de problemas
- Aumentado o tempo de exibição do indicador de digitação para 3 segundos para garantir melhor visualização
- Melhorada a passagem de referências entre componentes para garantir funcionamento correto

## [1.27.5] - 2025-09-01

### Corrigido
- Corrigidos erros específicos de tipagem genérica no react-hook-form
- Simplificada a definição de tipos para resolver conflitos com FieldPath
- Ajustada a integração entre componentes de formulário e react-hook-form
- Resolvidos problemas de tipo onde number não podia ser atribuído a string

## [1.27.4] - 2025-09-01

### Corrigido
- Melhoria significativa das declarações de tipos para resolver erros de compilação
- Configuração do TypeScript atualizada para ser mais permissiva com erros de tipo
- Declarações de tipo específicas para embla-carousel-react com suporte a métodos e propriedades
- Tipos melhorados para react-hook-form com suporte a genéricos
- Configuração de rollup modificada para ignorar erros de diagnóstico específicos

## [1.27.3] - 2025-09-01

### Corrigido
- Melhoradas as declarações de tipos para componentes externos
- Adicionados tipos para useEmblaCarousel do embla-carousel-react
- Corrigidas definições para o Header do Accordion
- Adicionados tipos para CollapsibleTrigger e CollapsibleContent
- Melhorada definição para react-hook-form com tipos adicionais

## [1.27.2] - 2025-09-01

### Corrigido
- Relaxadas as restrições de versão das peer dependencies para maior compatibilidade
- Corrigido conflito de versão com @radix-ui/react-select
- Suporte para versões mais recentes das bibliotecas Radix UI
- Melhor compatibilidade com projetos existentes

## [1.27.1] - 2025-09-01

### Corrigido
- Problemas de compilação com as dependências externas
- Adicionadas declarações de tipo para módulos externos
- Configurado sistema de dependências opcionais
- Corrigido problema com imports de componentes UI
- Melhorada compatibilidade com projetos que não têm todas as dependências

## [1.27.0] - 2025-09-01

### Adicionado
- Novo hook `useIndicadorDigitacao` para gerenciar estado de digitação
- API para controle externo do indicador de digitação via props
- Propriedade `isTyping` para controle externo do estado de digitação
- Propriedade `onTypingChange` para notificação de mudanças no estado
- Documentação detalhada sobre controle de digitação

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

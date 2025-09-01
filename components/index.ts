import './index.css';

// Exportação explícita do componente principal
export { ChatWidget } from './chatbot/chat-widget';

// Exportação dos componentes modulares
export {
    BotaoToggle,
    CabecalhoChat,
    AreaMensagens,
    MensagemChat,
    IndicadorDigitacao,
    AreaEntrada
} from './chatbot/componentes';

// Exportação de hooks e tipos
export { useChatbot } from '../hooks/useChatBot';
export { useIndicadorDigitacao } from '../hooks/useIndicadorDigitacao';
export type {
    ChatWidgetProps,
    Message,
    PropsChatWidget,
    Mensagem
} from '../types/index';

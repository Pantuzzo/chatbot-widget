import './index.css';

// Exportação explícita do componente principal
export { ChatWidget } from './chatbot/chat-widget';

// Exportação de hooks e tipos
export { useChatbot } from '../hooks/useChatBot';
export type { ChatWidgetProps, Message } from '../types/index';

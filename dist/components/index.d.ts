import './index.css';
export { ChatWidget } from './chatbot/chat-widget';
export { BotaoToggle, CabecalhoChat, AreaMensagens, MensagemChat, IndicadorDigitacao, AreaEntrada } from './chatbot/componentes';
export { useChatbot } from '../hooks/useChatBot';
export { useIndicadorDigitacao } from '../hooks/useIndicadorDigitacao';
export type { ChatWidgetProps, Message, PropsChatWidget, Mensagem } from '../types/index';

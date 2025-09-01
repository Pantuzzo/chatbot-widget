import React from 'react';
import type { ChatWidgetProps } from '../../types/index';
import { ChatWidget as ChatWidgetRefatorado } from './componentes/chat-widget-refatorado';

/**
 * Componente de Chat Widget
 * 
 * Esta implementação usa a versão refatorada do componente 
 * que possui uma estrutura mais modular e limpa
 */
export const ChatWidget = (props: ChatWidgetProps) => {
  return <ChatWidgetRefatorado {...props} />;
};

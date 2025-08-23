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
  export default ChatWidget;
}
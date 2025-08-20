import React from 'react';
export interface Message {
    id: string;
    role: 'user' | 'bot';
    content: string;
    createdAt: Date;
}
export interface ChatBotProps {
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
export declare const ChatWidget: ({ initialMessages, placeholder, onSendMessage, position, primaryColor, title, welcomeMessage, onToggle, defaultOpen, className, }: ChatBotProps) => React.JSX.Element;

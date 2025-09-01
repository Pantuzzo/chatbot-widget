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
    height?: "min" | "med" | "max";
    primaryColor?: string;
    title?: string;
    welcomeMessage?: string;
    onToggle?: (isOpen: boolean) => void;
    defaultOpen?: boolean;
    className?: string;
}

import type { Message, ChatWidgetProps } from '../../../types/index';
export interface PropsChatWidget {
    mensagensIniciais?: Message[];
    placeholder?: string;
    aoEnviarMensagem?: (mensagem: string) => void;
    posicao?: "left" | "right";
    corPrimaria?: string;
    titulo?: string;
    mensagemBoasVindas?: string;
    aoAlternar?: (estaAberto: boolean) => void;
    abertoPadrao?: boolean;
    altura?: "min" | "med" | "max";
    className?: string;
}
export declare const ChatWidget: ({ initialMessages, placeholder, onSendMessage, position, primaryColor, title, welcomeMessage, onToggle, defaultOpen, height, className, isTyping: externalTypingState, onTypingChange, }: ChatWidgetProps) => import("react/jsx-runtime").JSX.Element;

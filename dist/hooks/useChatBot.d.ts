import type { Message } from "../types";
/**
 * Hook para gerenciar o estado e interações de um chatbot
 *
 * @returns {Object} Estado e funções do chat
 */
export declare function useChatbot(): {
    messages: Message[];
    sendMessage: (text: string) => void;
    isLoading: boolean;
    estaDigitando: boolean;
    iniciarDigitacao: () => void;
    pararDigitacao: () => void;
};

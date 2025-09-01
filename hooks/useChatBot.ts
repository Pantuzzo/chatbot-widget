import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useIndicadorDigitacao } from "./useIndicadorDigitacao";
import type { Message } from "../types";

// Função para gerar UUID
const generateUUID = (): string => {
  if (typeof window !== 'undefined' && 'crypto' in window) {
    const crypto = window.crypto as Crypto & {
      randomUUID?: () => string;
    };
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  }

  // Implementação alternativa
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Hook para gerenciar o estado e interações de um chatbot
 * 
 * @returns {Object} Estado e funções do chat
 */
export function useChatbot() {
  // Estado para armazenar as mensagens
  const [messages, setMessages] = useState<Message[]>([]);

  // Usando o hook de indicador de digitação
  const {
    estaDigitando,
    iniciarDigitacao,
    pararDigitacao
  } = useIndicadorDigitacao();

  // Mutação para enviar mensagem
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string): Promise<{ reply: string }> => {
      // Iniciar indicador de digitação antes da chamada
      iniciarDigitacao();

      try {
        const res = await axios.post<{ reply: string }>("/api/chatbot", { message });
        return res.data;
      } catch (error) {
        // Em caso de erro, parar o indicador
        pararDigitacao();
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      // Adicionar mensagens do usuário e bot ao estado
      const messageId = generateUUID();

      // Adicionar mensagem do usuário
      const userMessage: Message = {
        id: messageId,
        role: 'user',
        content: variables,
        createdAt: new Date()
      };

      // Adicionar resposta do bot
      const botMessage: Message = {
        id: generateUUID(),
        role: 'bot',
        content: data.reply,
        createdAt: new Date()
      };

      setMessages((prev) => [...prev, userMessage, botMessage]);

      // Parar o indicador quando a resposta chegar
      pararDigitacao();
    },
  });

  /**
   * Envia uma mensagem para o chatbot
   * @param {string} text Texto da mensagem
   */
  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    sendMessageMutation.mutate(text);
  };

  return {
    messages,
    sendMessage,
    isLoading: sendMessageMutation.isPending,
    estaDigitando,
    iniciarDigitacao,
    pararDigitacao
  };
}

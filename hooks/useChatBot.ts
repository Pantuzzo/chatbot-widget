import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

// Updated UUID generation function with proper type checking
const generateUUID = (): string => {
  // Check if crypto.randomUUID is available
  if (typeof window !== 'undefined' && 'crypto' in window) {
    const crypto = window.crypto as Crypto & {
      randomUUID?: () => string;
    };
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  }
  
  // Fallback implementation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string): Promise<{ reply: string }> => {
      const res = await axios.post<{ reply: string }>("/api/chatbot", { message });
      return res.data;
    },
    onSuccess: (data, variables) => {
      const messageId = generateUUID();
      
      setMessages((prev) => [
        ...prev,
        { id: messageId, sender: "user", text: variables },
        { id: generateUUID(), sender: "bot", text: data.reply },
      ]);
    },
  });

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    sendMessageMutation.mutate(text);
  };

  return {
    messages,
    sendMessage,
    isLoading: sendMessageMutation.isPending,
  };
}

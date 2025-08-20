import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await axios.post("/api/chatbot", { message });
      return res.data;
    },
    onSuccess: (data, variables) => {
      // adiciona a mensagem do usuário
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: "user", text: variables },
      ]);

      // adiciona a resposta do bot
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: "user", text: variables },
        { id: crypto.randomUUID(), sender: "bot", text: data.reply },
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

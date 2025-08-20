import type { Meta, StoryObj } from "@storybook/react";
import { ChatWidget } from "../components/chatbot/chat-widget";

const meta: Meta<typeof ChatWidget> = {
  title: "Components/ChatWidget",
  component: ChatWidget,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Um widget de chatbot flutuante com interface moderna e responsiva.",
      },
    },
  },
  argTypes: {
    position: {
      control: "select",
      options: ["left", "right"],
      description: "Posição da bolinha flutuante na tela",
    },
    primaryColor: { control: "color", description: "Cor primária do chatbot" },
    title: { control: "text", description: "Título exibido no header do chat" },
    welcomeMessage: { control: "text", description: "Mensagem de boas-vindas inicial" },
    placeholder: { control: "text", description: "Placeholder do campo de input" },
    defaultOpen: { control: "boolean", description: "Estado inicial do chat (aberto/fechado)" },
    onSendMessage: { action: "message sent", description: "Callback executado quando uma mensagem é enviada" },
    onToggle: { action: "chat toggled", description: "Callback executado quando o chat é aberto/fechado" },
  },
};

export default meta;
type Story = StoryObj<typeof ChatWidget>;

type ChatWidgetProps = {
  position?: "left" | "right";
  title?: string;
  welcomeMessage?: string;
  placeholder?: string;
  primaryColor?: string;
  defaultOpen?: boolean;
  onSendMessage?: (msg: string) => void;
  onToggle?: (open: boolean) => void;
};

const baseArgs: Partial<ChatWidgetProps> = {
  title: "Assistente Virtual",
  welcomeMessage: "Olá! Como posso ajudá-lo hoje?",
  placeholder: "Digite sua mensagem...",
  position: "right",
  primaryColor: "#3b82f6",
};

export const Default: Story = { args: baseArgs };

export const RightPosition: Story = { args: { ...baseArgs, position: "right" } };

export const CustomColors: Story = {
  args: {
    ...baseArgs,
    primaryColor: "#10b981",
    title: "Suporte Técnico",
    welcomeMessage: "Bem-vindo ao suporte! Como posso ajudar?",
  },
};

export const OpenByDefault: Story = { args: { ...baseArgs, defaultOpen: true, primaryColor: "#8b5cf6" } };

export const CustomMessages: Story = {
  args: {
    ...baseArgs,
    title: "Vendas Online",
    welcomeMessage: "Olá! Estou aqui para ajudar com suas compras. O que você está procurando?",
    placeholder: "Descreva o que precisa...",
    primaryColor: "#f59e0b",
  },
};

export const MinimalStyle: Story = {
  args: {
    title: "Chat",
    welcomeMessage: "Oi!",
    placeholder: "Mensagem...",
    position: "right",
    primaryColor: "#6b7280",
  },
};

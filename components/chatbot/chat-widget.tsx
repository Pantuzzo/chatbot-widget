import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { cn } from "../../lib/utils";

import { Bot, MessageCircle, Send, User, X } from "lucide-react";
import React, { useEffect, useRef, useState } from 'react';
import type { Message, ChatWidgetProps } from '../../types/index';



export const ChatWidget = ({
  initialMessages = [],
  placeholder = "Digite sua mensagem...",
  onSendMessage,
  position = "left",
  primaryColor = "hsl(var(--primary))",
  title = "Assistente Virtual",
  welcomeMessage = "Olá! Como posso ajudá-lo hoje?",
  onToggle,
  defaultOpen = false,
  className,
}: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.length > 0 
      ? initialMessages 
      : [
          {
            id: "1",
            role: 'bot',
            content: welcomeMessage,
            createdAt: new Date(),
          },
        ]
  )
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Modify the scrollToBottom function to be more reliable
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }
  }

  // Add a new useEffect to scroll when chat is opened
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is updated
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen]);

  // Keep existing useEffect for messages
  useEffect(() => {
    scrollToBottom();
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleToggle = () => {
    const newState = !isOpen
    setIsOpen(newState)
    onToggle?.(newState)
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    onSendMessage?.(inputValue)

    setIsTyping(true)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: `Obrigado pela sua mensagem: "${inputValue}". Como posso ajudá-lo mais?`,
        createdAt: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const positionClasses = {
    left: "chat-widget-left-6 chat-widget-bottom-6",
    right: "chat-widget-right-6 chat-widget-bottom-6",
  }

  const chatPositionClasses = {
    left: "chat-widget-left-6 chat-widget-bottom-24",
    right: "chat-widget-right-6 chat-widget-bottom-24",
  }

  return (
    <div className="chat-widget-root">
      <div className="chat-widget-fixed chat-widget-bottom-0 chat-widget-right-0 chat-widget-w-full chat-widget-max-w-[400px]">
        <div className={cn("chat-widget-fixed chat-widget-z-50", positionClasses[position])}>
          <Button
            onClick={handleToggle}
            size="lg"
            className={cn(
              "chat-widget-h-14 chat-widget-w-14 chat-widget-rounded-full chat-widget-shadow-lg hover:chat-widget-shadow-xl chat-widget-transition-all chat-widget-duration-300 chat-widget-ease-in-out chat-widget-flex chat-widget-items-center chat-widget-justify-center",
              isOpen && "chat-widget-rotate-180"
            )}
            style={{ backgroundColor: primaryColor }}
          >
            {isOpen ? (
              <X className="chat-widget-h-6 chat-widget-w-6 chat-widget-transition-transform chat-widget-text-white" />
            ) : (
              <MessageCircle className="chat-widget-h-6 chat-widget-w-6 chat-widget-transition-transform chat-widget-text-white" />
            )}
          </Button>
        </div>

        {isOpen && (
          <div 
            className={cn(
              "chat-widget-fixed chat-widget-z-50 chat-widget-transition-all chat-widget-duration-300 chat-widget-ease-in-out chat-widget-bg-background",
              chatPositionClasses[position],
              "chat-widget-animate-slide-in"
            )}
          >
            <Card className="chat-widget-w-80 chat-widget-h-96 chat-widget-shadow-2xl chat-widget-rounded-lg chat-widget-overflow-hidden chat-widget-flex chat-widget-flex-col">
              {/* Header */}
              <div
                className="chat-widget-flex chat-widget-items-center chat-widget-justify-between chat-widget-p-4 chat-widget-border-b chat-widget-rounded-t-lg chat-widget-text-white chat-widget-shrink-0"
                style={{ backgroundColor: primaryColor }}
              >
                <div className="chat-widget-flex chat-widget-items-center chat-widget-gap-2">
                  <Avatar className="chat-widget-h-8 chat-widget-w-8">
                    <AvatarFallback className="chat-widget-bg-white/20">
                      <Bot className="chat-widget-h-4 chat-widget-w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="chat-widget-font-semibold chat-widget-text-sm">{title}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggle}
                  className="chat-widget-text-white hover:chat-widget-bg-white/20 chat-widget-h-8 chat-widget-w-8 chat-widget-p-0 chat-widget-flex chat-widget-items-center chat-widget-justify-center"
                >
                  <X className="chat-widget-h-4 chat-widget-w-4 chat-widget-text-white" />
                </Button>
              </div>

              {/* Messages Area */}
              <ScrollArea className="chat-widget-flex-1 chat-widget-p-4 chat-widget-overflow-y-auto chat-widget-scroll-smooth">
                <div className="chat-widget-space-y-4 chat-widget-pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "chat-widget-flex chat-widget-gap-2",
                        message.role === 'user' ? "chat-widget-justify-end" : "chat-widget-justify-start"
                      )}
                    >
                      {message.role === 'bot' && (
                        <Avatar className="chat-widget-h-6 chat-widget-w-6 chat-widget-mt-1">
                          <AvatarFallback className="chat-widget-bg-muted">
                            <Bot className="chat-widget-h-3 chat-widget-w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          "chat-widget-max-w-[70%] chat-widget-rounded-lg chat-widget-px-3 chat-widget-py-2 chat-widget-text-sm",
                          message.role === 'user'
                            ? "chat-widget-bg-primary chat-widget-text-primary-foreground"
                            : "chat-widget-bg-muted chat-widget-text-muted-foreground"
                        )}
                      >
                        {message.content}
                      </div>
                      {message.role === 'user' && (
                        <Avatar className="chat-widget-h-6 chat-widget-w-6 chat-widget-mt-1">
                          <AvatarFallback className="chat-widget-bg-primary">
                            <User className="chat-widget-h-3 chat-widget-w-3 chat-widget-text-primary-foreground" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="chat-widget-flex chat-widget-gap-2 chat-widget-justify-start">
                      <Avatar className="chat-widget-h-6 chat-widget-w-6 chat-widget-mt-1">
                        <AvatarFallback className="chat-widget-bg-muted">
                          <Bot className="chat-widget-h-3 chat-widget-w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="chat-widget-bg-muted chat-widget-rounded-lg chat-widget-px-3 chat-widget-py-2">
                        <div className="chat-widget-flex chat-widget-gap-1">
                          <div className="chat-widget-w-2 chat-widget-h-2 chat-widget-bg-muted-foreground chat-widget-rounded-full chat-widget-animate-bounce" />
                          <div
                            className="chat-widget-w-2 chat-widget-h-2 chat-widget-bg-muted-foreground chat-widget-rounded-full chat-widget-animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="chat-widget-w-2 chat-widget-h-2 chat-widget-bg-muted-foreground chat-widget-rounded-full chat-widget-animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div 
                    ref={messagesEndRef} 
                    className="chat-widget-h-px chat-widget-w-full" 
                  />
                </div>
              </ScrollArea>

              {/* Input Area - Update the send button */}
              <div className="chat-widget-p-4 chat-widget-border-t chat-widget-mt-auto chat-widget-bg-background chat-widget-shrink-0">
                <div className="chat-widget-flex chat-widget-gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    className="chat-widget-flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    disabled={!inputValue.trim()}
                    style={{ backgroundColor: primaryColor }}
                    className="chat-widget-px-4 chat-widget-py-2 chat-widget-rounded-full chat-widget-flex chat-widget-items-center chat-widget-justify-center chat-widget-transition-all hover:chat-widget-opacity-90"
                  >
                    <Send className="chat-widget-h-4 chat-widget-w-4 chat-widget-text-white" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
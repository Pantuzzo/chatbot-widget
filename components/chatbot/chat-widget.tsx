"use client"

import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { ScrollArea } from "../../components/ui/scroll-area"
import { cn } from "../../lib/utils"

import { Bot, MessageCircle, Send, User, X } from "lucide-react"
import React, { useEffect, useRef, useState } from 'react'

export interface Message {
  id: string
  role: 'user' | 'bot'
  content: string
  createdAt: Date
}

export interface ChatBotProps {
  initialMessages?: Message[]
  placeholder?: string
  onSendMessage?: (message: string) => void
  position?: "left" | "right"
  primaryColor?: string
  title?: string
  welcomeMessage?: string
  onToggle?: (isOpen: boolean) => void
  defaultOpen?: boolean
  className?: string
}



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
}: ChatBotProps) => {
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
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
    left: "left-6 bottom-6",
    right: "right-6 bottom-6",
  }

  const chatPositionClasses = {
    left: "left-6 bottom-24",
    right: "right-6 bottom-24",
  }

  return (
    <div className={cn("fixed z-50", className)}>
      <div className={cn("fixed", positionClasses[position])}>
        <Button
          onClick={handleToggle}
          size="lg"
          className={cn(
            "h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110",
            isOpen && "rotate-180",
          )}
          style={{ backgroundColor: primaryColor }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {isOpen && (
        <div className={cn("fixed", chatPositionClasses[position])}>
          <Card className="w-80 h-96 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
            <div
              className="flex items-center justify-between p-4 border-b rounded-t-lg text-white"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-white/20">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-sm">{title}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggle}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1 p-4 h-53">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex gap-2", message.role === 'user' ? "justify-end" : "justify-start")}
                  >
                    {message.role === 'bot' && (
                      <Avatar className="h-6 w-6 mt-1">
                        <AvatarFallback className="bg-muted">
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[70%] rounded-lg px-3 py-2 text-sm",
                        message.role === 'user'
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {message.content}
                    </div>
                    {message.role === 'user' && (
                      <Avatar className="h-6 w-6 mt-1">
                        <AvatarFallback className="bg-primary">
                          <User className="h-3 w-3 text-primary-foreground" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {/* Indicador de digitação */}
                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <Avatar className="h-6 w-6 mt-1">
                      <AvatarFallback className="bg-muted">
                        <Bot className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input de Mensagem */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={placeholder}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  disabled={!inputValue.trim()}
                  style={{ backgroundColor: primaryColor }}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
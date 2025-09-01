import React, { useEffect, useRef, useState } from 'react';
import { Card } from '../../ui/card';
import { cn } from '../../../lib/utils';
import type { Message, ChatWidgetProps } from '../../../types/index';

// Componentes modulares
import { BotaoToggle } from './botao-toggle';
import { CabecalhoChat } from './cabecalho-chat';
import { AreaMensagens } from './area-mensagens';
import { AreaEntrada } from './area-entrada';

// Renomeando para português
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

// Componente principal com nomes em português
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
    height = "max",
    className,
    isTyping: externalTypingState,
    onTypingChange,
}: ChatWidgetProps) => {
    // Estados
    const [estaAberto, setEstaAberto] = useState(defaultOpen);
    const [mensagens, setMensagens] = useState<Message[]>(
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
    );
    const [valorEntrada, setValorEntrada] = useState("");
    const [estaDigitandoInterno, setEstaDigitandoInterno] = useState(false);

    // Usar estado de digitação externo se fornecido, ou interno se não
    const estaDigitando = externalTypingState !== undefined ? externalTypingState : estaDigitandoInterno;

    // Debug - remover em produção
    useEffect(() => {
        console.log('Estado de digitação:', estaDigitando);
    }, [estaDigitando]);

    // Referências
    const finalMensagensRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Constantes para classes
    const classesPosicaoChat = {
        left: "hello-cli-left-6 hello-cli-bottom-24",
        right: "hello-cli-right-6 hello-cli-bottom-24",
    };

    const classesAlturaChat = {
        min: "hello-cli-h-96",
        med: "hello-cli-h-[30rem]",
        max: "hello-cli-h-[36rem]",
    };

    // Funções
    const scrollParaFinal = () => {
        if (finalMensagensRef.current) {
            try {
                finalMensagensRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest"
                });

                // Backup para garantir que o scroll aconteça
                const parentElement = finalMensagensRef.current.parentElement;
                if (parentElement) {
                    parentElement.scrollTop = parentElement.scrollHeight;
                }

                // Log para debug
                console.log('Scroll executado para elemento:', finalMensagensRef.current);
            } catch (error) {
                console.error('Erro ao fazer scroll:', error);
            }
        } else {
            console.warn('Referência para o final das mensagens não encontrada');
        }
    };

    const alternarChat = () => {
        const novoEstado = !estaAberto;
        setEstaAberto(novoEstado);
        onToggle?.(novoEstado);
    };

    const enviarMensagem = async () => {
        if (!valorEntrada.trim()) return;

        const mensagemUsuario: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: valorEntrada,
            createdAt: new Date(),
        };

        setMensagens((prev) => [...prev, mensagemUsuario]);
        setValorEntrada("");
        onSendMessage?.(valorEntrada);

        // Simulando resposta (remover em implementação real)
        const novoEstadoDigitacao = true;
        setEstaDigitandoInterno(novoEstadoDigitacao);
        onTypingChange?.(novoEstadoDigitacao);

        // Garanta que o indicador de digitação apareça por pelo menos 2 segundos
        setTimeout(() => {
            const mensagemBot: Message = {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                content: `Obrigado pela sua mensagem: "${valorEntrada}". Como posso ajudá-lo mais?`,
                createdAt: new Date(),
            };
            setMensagens((prev) => [...prev, mensagemBot]);

            const estadoFinalDigitacao = false;
            setEstaDigitandoInterno(estadoFinalDigitacao);
            onTypingChange?.(estadoFinalDigitacao);
        }, 3000);
    };

    const aoTeclarEnter = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            enviarMensagem();
        }
    };

    // Efeitos
    useEffect(() => {
        if (estaAberto) {
            // Rolar para o final quando o chat for aberto
            setTimeout(scrollParaFinal, 100);
        }
    }, [estaAberto]);

    useEffect(() => {
        // Rolar para o final quando mensagens mudam
        setTimeout(scrollParaFinal, 10);
    }, [mensagens]);

    useEffect(() => {
        // Rolar para o final quando o estado de digitação muda
        if (estaDigitando) {
            setTimeout(scrollParaFinal, 10);
        }
    }, [estaDigitando]);

    useEffect(() => {
        if (estaAberto && inputRef.current) {
            inputRef.current.focus();
        }
    }, [estaAberto]);

    return (
        <div className={cn("hello-cli-root", "hello-cli-chatwidget-wrapper", className)}>
            <div className={cn("hello-cli-fixed hello-cli-bottom-0 hello-cli-right-0 hello-cli-w-full hello-cli-max-w-[400px]", "hello-cli-chatwidget-container")}>
                {/* Botão de alternar chat */}
                <BotaoToggle
                    estaAberto={estaAberto}
                    aoAlternar={alternarChat}
                    corPrimaria={primaryColor}
                    posicao={position}
                />

                {/* Janela do chat */}
                {estaAberto && (
                    <div
                        className={cn(
                            "hello-cli-fixed hello-cli-z-50 hello-cli-transition-all hello-cli-duration-300 hello-cli-ease-in-out hello-cli-bg-background",
                            classesPosicaoChat[position],
                            "hello-cli-animate-slide-in",
                            "hello-cli-chat-container"
                        )}
                    >
                        <Card className={cn(
                            "hello-cli-w-80 hello-cli-shadow-2xl hello-cli-rounded-lg hello-cli-overflow-hidden hello-cli-flex hello-cli-flex-col",
                            classesAlturaChat[height],
                            "hello-cli-card"
                        )}>
                            {/* Cabeçalho do chat */}
                            <CabecalhoChat
                                titulo={title}
                                corPrimaria={primaryColor}
                                aoFechar={alternarChat}
                            />

                            {/* Área de mensagens */}
                            <AreaMensagens
                                mensagens={mensagens}
                                estaDigitando={estaDigitando}
                                refFinal={finalMensagensRef}
                            />

                            {/* Área de entrada */}
                            <AreaEntrada
                                valor={valorEntrada}
                                aoMudar={(e) => setValorEntrada(e.target.value)}
                                aoPressionarTecla={aoTeclarEnter}
                                aoEnviar={enviarMensagem}
                                placeholder={placeholder}
                                corPrimaria={primaryColor}
                            />
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

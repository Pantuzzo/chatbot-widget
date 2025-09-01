import React, { useState } from 'react';
import { ChatWidget } from '../components/chatbot/chat-widget';
import { useIndicadorDigitacao } from '../hooks/useIndicadorDigitacao';
import type { Message } from '../types';

export default function ExemploControleDigitacao() {
    // Estado para mensagens
    const [mensagens, setMensagens] = useState<Message[]>([
        {
            id: '1',
            role: 'bot',
            content: 'Olá! Como posso ajudar você hoje?',
            createdAt: new Date(),
        },
    ]);

    // Usando o hook de digitação
    const {
        estaDigitando,
        iniciarDigitacao,
        pararDigitacao,
        digitarPorTempo
    } = useIndicadorDigitacao({ duracao: 2000 });

    // Manipulador para enviar mensagens
    const handleEnviarMensagem = async (mensagem: string) => {
        // Adiciona mensagem do usuário
        const novaMensagemUsuario: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: mensagem,
            createdAt: new Date(),
        };

        setMensagens((prev) => [...prev, novaMensagemUsuario]);

        // Inicia animação de digitação
        iniciarDigitacao();

        try {
            // Simula chamada à API com 1.5 segundos de delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Exemplo de resposta
            const resposta = `Você disse: "${mensagem}". Como posso ajudar mais?`;

            // Adiciona resposta do bot
            const novaMensagemBot: Message = {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                content: resposta,
                createdAt: new Date(),
            };

            setMensagens((prev) => [...prev, novaMensagemBot]);
        } finally {
            // Para animação de digitação quando terminar
            pararDigitacao();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4">
            <h1 className="text-2xl font-bold mb-8">Exemplo de Controle de Digitação</h1>

            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => digitarPorTempo(3000)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Mostrar digitação por 3 segundos
                </button>

                <button
                    onClick={() => iniciarDigitacao()}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Iniciar Digitação
                </button>

                <button
                    onClick={() => pararDigitacao()}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Parar Digitação
                </button>
            </div>

            <div className="w-full max-w-md">
                <ChatWidget
                    initialMessages={mensagens}
                    onSendMessage={handleEnviarMensagem}
                    title="Chat com Controle de Digitação"
                    isTyping={estaDigitando}
                    defaultOpen={true}
                    height="med"
                />
            </div>
        </div>
    );
}

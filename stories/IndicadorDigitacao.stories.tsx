import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatWidget } from '../components';
import { useIndicadorDigitacao } from '../hooks/useIndicadorDigitacao';

// Meta para o Storybook
const meta: Meta<typeof ChatWidget> = {
    title: 'Chatbot/IndicadorDigitacao',
    component: ChatWidget,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        isTyping: { control: 'boolean' },
        onTypingChange: { action: 'onTypingChange' },
    },
};

export default meta;
type Story = StoryObj<typeof ChatWidget>;

// Wrapper que usa o hook useIndicadorDigitacao
const TypingControlWrapper = (props: any) => {
    const {
        estaDigitando,
        iniciarDigitacao,
        pararDigitacao,
        digitarPorTempo
    } = useIndicadorDigitacao();

    return (
        <div className="flex flex-col w-[600px] gap-4">
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => iniciarDigitacao()}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Iniciar Digitação
                </button>

                <button
                    onClick={() => pararDigitacao()}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                >
                    Parar Digitação
                </button>

                <button
                    onClick={() => digitarPorTempo(3000)}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    Digitar por 3s
                </button>
            </div>

            <p className="text-sm mb-4">
                Estado atual: <strong>{estaDigitando ? 'Digitando...' : 'Parado'}</strong>
            </p>

            <div className="w-[350px]">
                <ChatWidget
                    {...props}
                    isTyping={estaDigitando}
                    defaultOpen={true}
                />
            </div>
        </div>
    );
};

// História básica
export const ControleManual: Story = {
    render: (args) => <TypingControlWrapper {...args} />,
    args: {
        title: 'Teste de Digitação',
        welcomeMessage: 'Use os botões acima para controlar o indicador de digitação',
        position: 'right',
        height: 'med',
    },
};

// História com tempo automático
export const TempoAutomatico: Story = {
    render: () => {
        const [contador, setContador] = useState(0);
        const { estaDigitando, digitarPorTempo } = useIndicadorDigitacao({ duracao: 2000 });

        const enviarComTempo = () => {
            setContador(c => c + 1);
            digitarPorTempo(2000);
        };

        return (
            <div className="flex flex-col w-[600px] gap-4">
                <button
                    onClick={enviarComTempo}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Simular Resposta
                </button>

                <p className="text-sm mb-4">
                    Respostas enviadas: <strong>{contador}</strong><br />
                    Estado: <strong>{estaDigitando ? 'Digitando...' : 'Parado'}</strong>
                </p>

                <div className="w-[350px]">
                    <ChatWidget
                        title="Digitação Temporizada"
                        welcomeMessage="Clique no botão para simular uma resposta com 2s de digitação"
                        isTyping={estaDigitando}
                        defaultOpen={true}
                        height="med"
                    />
                </div>
            </div>
        );
    }
};

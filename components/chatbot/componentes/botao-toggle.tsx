import React from 'react';
import { Button } from '../../ui/button';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface BotaoToggleProps {
    estaAberto: boolean;
    aoAlternar: () => void;
    corPrimaria: string;
    posicao: 'left' | 'right';
}

export const BotaoToggle = ({
    estaAberto,
    aoAlternar,
    corPrimaria,
    posicao
}: BotaoToggleProps) => {
    // Constantes para posicionamento
    const classesPosicao = {
        left: 'hello-cli-left-6 hello-cli-bottom-6',
        right: 'hello-cli-right-6 hello-cli-bottom-6',
    };

    // Estilos
    const estiloBotao = {
        backgroundColor: corPrimaria
    };

    return (
        <div className={cn('hello-cli-fixed hello-cli-z-50', 'hello-cli-button-container', classesPosicao[posicao])}>
            <Button
                onClick={aoAlternar}
                size="lg"
                className={cn(
                    'hello-cli-h-14 hello-cli-w-14 hello-cli-rounded-full hello-cli-shadow-lg hover:hello-cli-shadow-xl hello-cli-transition-all hello-cli-duration-300 hello-cli-ease-in-out hello-cli-flex hello-cli-items-center hello-cli-justify-center',
                    'hello-cli-chat-button',
                    estaAberto && 'hello-cli-rotate-180'
                )}
                style={estiloBotao}
            >
                {estaAberto ? (
                    <X className="hello-cli-h-6 hello-cli-w-6 hello-cli-transition-transform hello-cli-text-white" />
                ) : (
                    <MessageCircle className="hello-cli-h-6 hello-cli-w-6 hello-cli-transition-transform hello-cli-text-white" />
                )}
            </Button>
        </div>
    );
};

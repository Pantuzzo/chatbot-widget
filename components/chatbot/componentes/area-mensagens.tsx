import React, { forwardRef } from 'react';
import { ScrollArea } from '../../ui/scroll-area';
import { cn } from '../../../lib/utils';
import { MensagemChat } from './mensagem-chat';
import { IndicadorDigitacao } from './indicador-digitacao';
import type { Message } from '../../../types';

interface AreaMensagensProps {
    mensagens: Message[];
    estaDigitando: boolean;
    refFinal?: React.RefObject<HTMLDivElement>;
}

export const AreaMensagens = forwardRef<HTMLDivElement, AreaMensagensProps>(({
    mensagens,
    estaDigitando,
    refFinal
}, ref) => {
    // Usar a ref passada ou a interna
    const refFinalEfetiva = refFinal || ref;

    return (
        <ScrollArea className={cn('hello-cli-flex-1 hello-cli-p-4 hello-cli-overflow-y-auto hello-cli-scroll-smooth', 'hello-cli-messages-area')}>
            <div className={cn('hello-cli-space-y-4 hello-cli-pb-4', 'hello-cli-message-list')}>
                {mensagens.map((mensagem) => (
                    <MensagemChat key={mensagem.id} mensagem={mensagem} />
                ))}

                {estaDigitando && <IndicadorDigitacao />}

                <div
                    ref={refFinalEfetiva}
                    className="hello-cli-h-px hello-cli-w-full"
                />
            </div>
        </ScrollArea>
    );
});

// Adiciona displayName para melhorar debugabilidade
AreaMensagens.displayName = 'AreaMensagens';

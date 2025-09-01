import React from 'react';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Bot, User } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { Message } from '../../../types';

interface MensagemChatProps {
    mensagem: Message;
}

export const MensagemChat = ({ mensagem }: MensagemChatProps) => {
    const eDoUsuario = mensagem.role === 'user';

    // Estilos para as mensagens
    const estiloBalaoMensagem = {
        backgroundColor: eDoUsuario ? 'hsl(222.2, 47.4%, 11.2%)' : 'hsl(210, 40%, 96.1%)',
        color: eDoUsuario ? '#ffffff' : 'hsl(215.4, 16.3%, 46.9%)',
    };

    return (
        <div
            className={cn(
                'hello-cli-flex hello-cli-gap-2',
                'hello-cli-message-row',
                eDoUsuario ? 'hello-cli-justify-end hello-cli-user-row' : 'hello-cli-justify-start hello-cli-bot-row'
            )}
        >
            {!eDoUsuario && (
                <Avatar className="hello-cli-h-6 hello-cli-w-6 hello-cli-mt-1">
                    <AvatarFallback className="hello-cli-bg-muted">
                        <Bot className="hello-cli-h-3 hello-cli-w-3" />
                    </AvatarFallback>
                </Avatar>
            )}
            <div
                className={cn(
                    'hello-cli-max-w-[70%] hello-cli-rounded-lg hello-cli-px-3 hello-cli-py-2 hello-cli-text-sm hello-cli-message-bubble',
                    eDoUsuario
                        ? 'hello-cli-bg-primary hello-cli-text-primary-foreground hello-cli-user-message'
                        : 'hello-cli-bg-muted hello-cli-text-muted-foreground hello-cli-bot-message'
                )}
                style={estiloBalaoMensagem}
            >
                {mensagem.content}
            </div>
            {eDoUsuario && (
                <Avatar className="hello-cli-h-6 hello-cli-w-6 hello-cli-mt-1">
                    <AvatarFallback className="hello-cli-bg-primary">
                        <User className="hello-cli-h-3 hello-cli-w-3 hello-cli-text-primary-foreground" />
                    </AvatarFallback>
                </Avatar>
            )}
        </div>
    );
};

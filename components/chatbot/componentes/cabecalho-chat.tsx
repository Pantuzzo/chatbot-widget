import React from 'react';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Button } from '../../ui/button';
import { Bot, X } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface CabecalhoChatProps {
    titulo: string;
    corPrimaria: string;
    aoFechar: () => void;
}

export const CabecalhoChat = ({
    titulo,
    corPrimaria,
    aoFechar
}: CabecalhoChatProps) => {
    // Estilos do cabeçalho
    const estilosCabecalho = {
        backgroundColor: corPrimaria,
    };

    return (
        <div
            className={cn(
                'hello-cli-flex hello-cli-items-center hello-cli-justify-between hello-cli-p-4 hello-cli-border-b hello-cli-rounded-t-lg hello-cli-text-white hello-cli-shrink-0',
                'hello-cli-header'
            )}
            style={estilosCabecalho}
        >
            <div className="hello-cli-flex hello-cli-items-center hello-cli-gap-2">
                <Avatar className="hello-cli-h-8 hello-cli-w-8">
                    <AvatarFallback className="hello-cli-bg-white/20">
                        <Bot className="hello-cli-h-4 hello-cli-w-4" />
                    </AvatarFallback>
                </Avatar>
                <h3 className="hello-cli-font-semibold hello-cli-text-sm">{titulo}</h3>
            </div>
            <Button
                variant="ghost"
                size="sm"
                onClick={aoFechar}
                className="hello-cli-text-white hover:hello-cli-bg-white/20 hello-cli-h-8 hello-cli-w-8 hello-cli-p-0 hello-cli-flex hello-cli-items-center hello-cli-justify-center"
            >
                <X className="hello-cli-h-4 hello-cli-w-4 hello-cli-text-white" />
            </Button>
        </div>
    );
};

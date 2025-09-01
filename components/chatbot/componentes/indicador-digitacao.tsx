import React from 'react';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Bot } from 'lucide-react';

export const IndicadorDigitacao = () => {
    return (
        <div className="hello-cli-flex hello-cli-gap-2 hello-cli-justify-start">
            <Avatar className="hello-cli-h-6 hello-cli-w-6 hello-cli-mt-1">
                <AvatarFallback className="hello-cli-bg-muted">
                    <Bot className="hello-cli-h-3 hello-cli-w-3" />
                </AvatarFallback>
            </Avatar>
            <div className="hello-cli-bg-muted hello-cli-rounded-lg hello-cli-px-3 hello-cli-py-2">
                <div className="hello-cli-flex hello-cli-gap-1">
                    <div className="hello-cli-w-2 hello-cli-h-2 hello-cli-bg-muted-foreground hello-cli-rounded-full hello-cli-animate-bounce" />
                    <div
                        className="hello-cli-w-2 hello-cli-h-2 hello-cli-bg-muted-foreground hello-cli-rounded-full hello-cli-animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                    />
                    <div
                        className="hello-cli-w-2 hello-cli-h-2 hello-cli-bg-muted-foreground hello-cli-rounded-full hello-cli-animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                    />
                </div>
            </div>
        </div>
    );
};

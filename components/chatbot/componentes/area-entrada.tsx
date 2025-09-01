import React, { useRef } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Send } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface AreaEntradaProps {
    valor: string;
    aoMudar: (e: React.ChangeEvent<HTMLInputElement>) => void;
    aoPressionarTecla: (e: React.KeyboardEvent) => void;
    aoEnviar: () => void;
    placeholder: string;
    corPrimaria: string;
}

export const AreaEntrada = ({
    valor,
    aoMudar,
    aoPressionarTecla,
    aoEnviar,
    placeholder,
    corPrimaria
}: AreaEntradaProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Validações
    const mensagemValida = valor.trim().length > 0;

    // Estilos
    const estiloBotao = {
        backgroundColor: corPrimaria
    };

    return (
        <div className={cn('hello-cli-p-4 hello-cli-border-t hello-cli-mt-auto hello-cli-bg-background hello-cli-shrink-0', 'hello-cli-input-area')}>
            <div className={cn('hello-cli-flex hello-cli-gap-2', 'hello-cli-input-container')}>
                <Input
                    ref={inputRef}
                    value={valor}
                    onChange={aoMudar}
                    onKeyPress={aoPressionarTecla}
                    placeholder={placeholder}
                    className={cn('hello-cli-flex-1', 'hello-cli-input')}
                />
                <Button
                    onClick={aoEnviar}
                    size="sm"
                    disabled={!mensagemValida}
                    style={estiloBotao}
                    className={cn(
                        'hello-cli-px-4 hello-cli-py-2 hello-cli-rounded-full hello-cli-flex hello-cli-items-center hello-cli-justify-center hello-cli-transition-all hover:hello-cli-opacity-90',
                        'hello-cli-send-button'
                    )}
                >
                    <Send className="hello-cli-h-4 hello-cli-w-4 hello-cli-text-white" />
                </Button>
            </div>
        </div>
    );
};

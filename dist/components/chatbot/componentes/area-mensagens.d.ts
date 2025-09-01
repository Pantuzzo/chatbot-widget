import React from 'react';
import type { Message } from '../../../types';
interface AreaMensagensProps {
    mensagens: Message[];
    estaDigitando: boolean;
    refFinal?: React.RefObject<HTMLDivElement>;
}
export declare const AreaMensagens: React.ForwardRefExoticComponent<AreaMensagensProps & React.RefAttributes<HTMLDivElement>>;
export {};

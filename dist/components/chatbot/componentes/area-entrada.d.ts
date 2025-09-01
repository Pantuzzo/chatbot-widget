import React from 'react';
interface AreaEntradaProps {
    valor: string;
    aoMudar: (e: React.ChangeEvent<HTMLInputElement>) => void;
    aoPressionarTecla: (e: React.KeyboardEvent) => void;
    aoEnviar: () => void;
    placeholder: string;
    corPrimaria: string;
}
export declare const AreaEntrada: ({ valor, aoMudar, aoPressionarTecla, aoEnviar, placeholder, corPrimaria }: AreaEntradaProps) => import("react/jsx-runtime").JSX.Element;
export {};

interface BotaoToggleProps {
    estaAberto: boolean;
    aoAlternar: () => void;
    corPrimaria: string;
    posicao: 'left' | 'right';
}
export declare const BotaoToggle: ({ estaAberto, aoAlternar, corPrimaria, posicao }: BotaoToggleProps) => import("react/jsx-runtime").JSX.Element;
export {};

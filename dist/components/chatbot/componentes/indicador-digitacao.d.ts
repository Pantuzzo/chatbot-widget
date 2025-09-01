interface IndicadorDigitacaoProps {
    /**
     * Cor de fundo opcional para o avatar
     */
    corAvatar?: string;
    /**
     * Cor dos pontos de digitação
     */
    corPontos?: string;
}
/**
 * Componente que exibe uma animação de digitação
 * para indicar que o bot está processando uma resposta
 */
export declare const IndicadorDigitacao: ({ corAvatar, corPontos }?: IndicadorDigitacaoProps) => import("react/jsx-runtime").JSX.Element;
export {};

interface OpcoesDigitacao {
    /**
     * Duração da animação de digitação em milissegundos
     */
    duracao?: number;
}
/**
 * Hook para gerenciar o estado de digitação de um chat
 *
 * @example
 * ```tsx
 * const { estaDigitando, iniciarDigitacao, pararDigitacao } = useIndicadorDigitacao();
 *
 * // Iniciar animação de digitação
 * iniciarDigitacao();
 *
 * // Parar animação de digitação após enviar mensagem
 * const enviarResposta = async () => {
 *   iniciarDigitacao();
 *
 *   try {
 *     const resposta = await apiChat.enviarMensagem(mensagem);
 *     adicionarMensagem(resposta);
 *   } finally {
 *     pararDigitacao();
 *   }
 * };
 * ```
 */
export declare function useIndicadorDigitacao({ duracao }?: OpcoesDigitacao): {
    estaDigitando: boolean;
    iniciarDigitacao: () => void;
    pararDigitacao: () => void;
    digitarPorTempo: (tempoMs?: number) => () => void;
};
export default useIndicadorDigitacao;

import { useState, useCallback } from 'react';

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
export function useIndicadorDigitacao({ duracao = 1500 }: OpcoesDigitacao = {}) {
    const [estaDigitando, setEstaDigitando] = useState(false);
    const [temporizador, setTemporizador] = useState<NodeJS.Timeout | null>(null);

    /**
     * Inicia a animação de digitação
     */
    const iniciarDigitacao = useCallback(() => {
        setEstaDigitando(true);
    }, []);

    /**
     * Para a animação de digitação imediatamente
     */
    const pararDigitacao = useCallback(() => {
        setEstaDigitando(false);
    }, []);

    /**
     * Inicia a animação de digitação por um tempo determinado
     */
    const digitarPorTempo = useCallback((tempoMs: number = duracao) => {
        // Limpa qualquer temporizador pendente
        if (temporizador) {
            clearTimeout(temporizador);
        }

        // Inicia a digitação
        setEstaDigitando(true);

        // Define o temporizador para parar a digitação após o tempo
        const novoTemporizador = setTimeout(() => {
            setEstaDigitando(false);
            setTemporizador(null);
        }, tempoMs);

        setTemporizador(novoTemporizador);

        return () => {
            if (novoTemporizador) {
                clearTimeout(novoTemporizador);
            }
        };
    }, [duracao, temporizador]);

    return {
        estaDigitando,
        iniciarDigitacao,
        pararDigitacao,
        digitarPorTempo
    };
}

export default useIndicadorDigitacao;

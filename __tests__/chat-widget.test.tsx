import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatWidget } from '../components/chatbot/chat-widget';

// Mock do hook useMobile pois usa APIs do navegador
jest.mock('../hooks/use-mobile', () => ({
    __esModule: true,
    default: () => false,
}));

describe('ChatWidget', () => {
    const mockEnviarMensagem = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renderiza o widget de chat com props padrão', () => {
        render(<ChatWidget onSendMessage={mockEnviarMensagem} />);

        // Verificar o título
        expect(screen.getByText('Assistente Virtual')).toBeInTheDocument();
    });

    it('exibe a mensagem de boas-vindas quando aberto', () => {
        render(
            <ChatWidget
                onSendMessage={mockEnviarMensagem}
                welcomeMessage="Olá, bem-vindo ao chat!"
                defaultOpen={true}
            />
        );

        expect(screen.getByText('Olá, bem-vindo ao chat!')).toBeInTheDocument();
    });

    it('envia uma mensagem quando o usuário submete o input', () => {
        render(
            <ChatWidget
                onSendMessage={mockEnviarMensagem}
                defaultOpen={true}
            />
        );

        // Encontrar o input e enviar uma mensagem
        const input = screen.getByPlaceholderText('Digite sua mensagem...');
        fireEvent.change(input, { target: { value: 'Mensagem de teste' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        // Verificar se onSendMessage foi chamado com a mensagem correta
        expect(mockEnviarMensagem).toHaveBeenCalledWith('Mensagem de teste');
    });

    it('alterna o estado aberto quando o botão é clicado', () => {
        const mockAlternar = jest.fn();

        render(
            <ChatWidget
                onSendMessage={mockEnviarMensagem}
                onToggle={mockAlternar}
            />
        );

        // Encontrar e clicar no botão de alternar
        const botaoAlternar = screen.getByRole('button', { name: /assistente virtual/i });
        fireEvent.click(botaoAlternar);

        // Verificar se onToggle foi chamado com o estado correto
        expect(mockAlternar).toHaveBeenCalledWith(true);
    });

    it('usa os componentes modularizados corretamente', () => {
        render(<ChatWidget
            onSendMessage={mockEnviarMensagem}
            defaultOpen={true}
            primaryColor="#FF5500"
            title="Meu Chat Personalizado"
        />);

        // Verificar se o título personalizado é exibido
        expect(screen.getByText('Meu Chat Personalizado')).toBeInTheDocument();

        // Verificar se a área de entrada está presente
        expect(screen.getByPlaceholderText('Digite sua mensagem...')).toBeInTheDocument();
    });
});
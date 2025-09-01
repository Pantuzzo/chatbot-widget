

// Make sure the import path matches the actual file location and casing
import { ChatWidget } from "../components/chatbot/hello-cli"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Demo do ChatBot Widget</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Recursos do ChatBot</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Bolinha flutuante posicionável (esquerda/direita)</li>
            <li>• Interface de chat moderna e responsiva</li>
            <li>• Animações suaves de abertura/fechamento</li>
            <li>• Indicador de digitação</li>
            <li>• Cores customizáveis</li>
            <li>• Suporte a temas claro/escuro</li>
            <li>• Totalmente acessível</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Como usar</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              O widget do chatbot aparece como uma bolinha flutuante no canto da tela. Clique nela para abrir o chat e
              começar a conversar!
            </p>
            <p>Você pode personalizar cores, posição, mensagens e muito mais através das props do componente.</p>
          </div>
        </div>
      </div>

      {/* Widget do ChatBot */}
      <ChatWidget
        position="right"
        title="Assistente Virtual"
        welcomeMessage="Olá! Bem-vindo ao nosso site. Como posso ajudá-lo hoje?"
        primaryColor="#3b82f6"
        onSendMessage={(message: string) => {
          console.log("Mensagem enviada:", message)
        }}
        onToggle={(isOpen: boolean) => {
          console.log("Chat", isOpen ? "aberto" : "fechado")
        }}
      />
    </div>
  )
}

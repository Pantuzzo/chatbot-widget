export interface Message {
  id: string
  role: 'user' | 'bot'
  content: string
  createdAt: Date
}

export interface ChatWidgetProps {
  initialMessages?: Message[]
  placeholder?: string
  onSendMessage?: (message: string) => void
  position?: "left" | "right"
  height?: "min" | "med" | "max"
  primaryColor?: string
  title?: string
  welcomeMessage?: string
  onToggle?: (isOpen: boolean) => void
  defaultOpen?: boolean
  className?: string
  isTyping?: boolean // Propriedade para controlar externamente o indicador de digitação
  onTypingChange?: (isTyping: boolean) => void // Callback para quando o estado de digitação muda
}

// Versões em português das interfaces
export interface Mensagem {
  id: string
  role: 'user' | 'bot'
  content: string
  createdAt: Date
}

export interface PropsChatWidget {
  mensagensIniciais?: Mensagem[]
  placeholder?: string
  aoEnviarMensagem?: (mensagem: string) => void
  posicao?: "left" | "right"
  altura?: "min" | "med" | "max"
  corPrimaria?: string
  titulo?: string
  mensagemBoasVindas?: string
  aoAlternar?: (estaAberto: boolean) => void
  abertoPadrao?: boolean
  estaDigitando?: boolean // Propriedade para controlar externamente o indicador de digitação
  aoMudarDigitacao?: (estaDigitando: boolean) => void // Callback para quando o estado de digitação muda
  className?: string
}

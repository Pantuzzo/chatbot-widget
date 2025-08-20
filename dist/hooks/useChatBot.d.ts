interface Message {
    id: string;
    sender: "user" | "bot";
    text: string;
}
export declare function useChatbot(): {
    messages: Message[];
    sendMessage: (text: string) => void;
    isLoading: boolean;
};
export {};

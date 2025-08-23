export type MessageType = "user" | "bot";
export interface MessageProps {
    id: string;
    type: MessageType;
    text: string;
    timestamp?: Date;
}
declare const Message: ({ id, type, text, timestamp }: MessageProps) => import("react/jsx-runtime").JSX.Element;
export default Message;

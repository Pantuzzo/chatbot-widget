/// <reference types="react" />
export declare type MessageType = "user" | "bot";
export interface MessageProps {
    id: string;
    type: MessageType;
    text: string;
    timestamp?: Date;
}
declare const Message: ({ id, type, text, timestamp }: MessageProps) => import("react").JSX.Element;
export default Message;

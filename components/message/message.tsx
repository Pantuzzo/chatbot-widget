
export type MessageType = "user" | "bot";

export interface MessageProps {
  id: string;
  type: MessageType;
  text: string;
  timestamp?: Date;
}

const Message = ({ id, type, text, timestamp }: MessageProps) => {
  const isUser = type === "user";

  return (
    <div
      key={id}
      className={`flex mb-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          max-w-[70%] px-4 py-2 rounded-2xl
          ${isUser ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-900"}
          break-words
        `}
      >
        <p className="m-0">{text}</p>
        {timestamp && (
          <span
            className={`
              block text-xs mt-1 text-right
              ${isUser ? "text-gray-200" : "text-gray-500"}
            `}
          >
            {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}
      </div>
    </div>
  );
};

export default Message;

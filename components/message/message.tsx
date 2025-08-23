import { Bot, User } from "lucide-react";
import React from "react";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";

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
      className={cn(
        "chat-widget-flex chat-widget-gap-2",
        isUser ? "chat-widget-justify-end" : "chat-widget-justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="chat-widget-h-6 chat-widget-w-6 chat-widget-mt-1">
          <AvatarFallback className="chat-widget-bg-muted">
            <Bot className="chat-widget-h-3 chat-widget-w-3" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "chat-widget-max-w-[70%] chat-widget-rounded-lg chat-widget-px-3 chat-widget-py-2",
          isUser
            ? "chat-widget-bg-primary chat-widget-text-primary-foreground"
            : "chat-widget-bg-muted chat-widget-text-muted-foreground"
        )}
      >
        <p className="chat-widget-m-0 chat-widget-text-sm">{text}</p>
        {timestamp && (
          <span
            className={cn(
              "chat-widget-block chat-widget-text-xs chat-widget-mt-1 chat-widget-text-right",
              isUser
                ? "chat-widget-text-primary-foreground/80"
                : "chat-widget-text-muted-foreground/80"
            )}
          >
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>

      {isUser && (
        <Avatar className="chat-widget-h-6 chat-widget-w-6 chat-widget-mt-1">
          <AvatarFallback className="chat-widget-bg-primary">
            <User className="chat-widget-h-3 chat-widget-w-3 chat-widget-text-primary-foreground" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default Message;

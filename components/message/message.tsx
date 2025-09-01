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
        "hello-cli-flex hello-cli-gap-2",
        isUser ? "hello-cli-justify-end" : "hello-cli-justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="hello-cli-h-6 hello-cli-w-6 hello-cli-mt-1">
          <AvatarFallback className="hello-cli-bg-muted">
            <Bot className="hello-cli-h-3 hello-cli-w-3" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "hello-cli-max-w-[70%] hello-cli-rounded-lg hello-cli-px-3 hello-cli-py-2",
          isUser
            ? "hello-cli-bg-primary hello-cli-text-primary-foreground"
            : "hello-cli-bg-muted hello-cli-text-muted-foreground"
        )}
      >
        <p className="hello-cli-m-0 hello-cli-text-sm">{text}</p>
        {timestamp && (
          <span
            className={cn(
              "hello-cli-block hello-cli-text-xs hello-cli-mt-1 hello-cli-text-right",
              isUser
                ? "hello-cli-text-primary-foreground/80"
                : "hello-cli-text-muted-foreground/80"
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
        <Avatar className="hello-cli-h-6 hello-cli-w-6 hello-cli-mt-1">
          <AvatarFallback className="hello-cli-bg-primary">
            <User className="hello-cli-h-3 hello-cli-w-3 hello-cli-text-primary-foreground" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default Message;

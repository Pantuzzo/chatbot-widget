function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var reactQuery = require('@tanstack/react-query');
var axios = _interopDefault(require('axios'));
var React = require('react');
var React__default = _interopDefault(React);
var AvatarPrimitive = require('@radix-ui/react-avatar');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var reactSlot = require('@radix-ui/react-slot');
var classVarianceAuthority = require('class-variance-authority');
var ScrollAreaPrimitive = require('@radix-ui/react-scroll-area');
var lucideReact = require('lucide-react');

function useChatbot() {
  var _useState = React.useState([]),
    messages = _useState[0],
    setMessages = _useState[1];
  var sendMessageMutation = reactQuery.useMutation({
    mutationFn: function (message) {
      try {
        return Promise.resolve(axios.post("/api/chatbot", {
          message: message
        })).then(function (res) {
          return res.data;
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    onSuccess: function onSuccess(data, variables) {
      setMessages(function (prev) {
        return [].concat(prev, [{
          id: crypto.randomUUID(),
          sender: "user",
          text: variables
        }]);
      });
      setMessages(function (prev) {
        return [].concat(prev, [{
          id: crypto.randomUUID(),
          sender: "user",
          text: variables
        }, {
          id: crypto.randomUUID(),
          sender: "bot",
          text: data.reply
        }]);
      });
    }
  });
  var sendMessage = function sendMessage(text) {
    if (!text.trim()) return;
    sendMessageMutation.mutate(text);
  };
  return {
    messages: messages,
    sendMessage: sendMessage,
    isLoading: sendMessageMutation.isPending
  };
}

function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}

function cn() {
  for (var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++) {
    inputs[_key] = arguments[_key];
  }
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}

var _excluded = ["className"],
  _excluded3 = ["className"];
function Avatar(_ref) {
  var className = _ref.className,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  return React.createElement(AvatarPrimitive.Root, Object.assign({
    "data-slot": "avatar",
    className: cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)
  }, props));
}
function AvatarFallback(_ref3) {
  var className = _ref3.className,
    props = _objectWithoutPropertiesLoose(_ref3, _excluded3);
  return React.createElement(AvatarPrimitive.Fallback, Object.assign({
    "data-slot": "avatar-fallback",
    className: cn("bg-muted flex size-full items-center justify-center rounded-full", className)
  }, props));
}

var _excluded$1 = ["className", "variant", "size", "asChild"];
var buttonVariants = classVarianceAuthority.cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
  variants: {
    variant: {
      "default": "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
      destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      "default": "h-9 px-4 py-2 has-[>svg]:px-3",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
function Button(_ref) {
  var className = _ref.className,
    variant = _ref.variant,
    size = _ref.size,
    _ref$asChild = _ref.asChild,
    asChild = _ref$asChild === void 0 ? false : _ref$asChild,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  var Comp = asChild ? reactSlot.Slot : "button";
  return React.createElement(Comp, Object.assign({
    "data-slot": "button",
    className: cn(buttonVariants({
      variant: variant,
      size: size,
      className: className
    }))
  }, props));
}

var _excluded$2 = ["className"];
function Card(_ref) {
  var className = _ref.className,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$2);
  return React.createElement("div", Object.assign({
    "data-slot": "card",
    className: cn("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm", className)
  }, props));
}

var _excluded$3 = ["className", "type"];
function Input(_ref) {
  var className = _ref.className,
    type = _ref.type,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$3);
  return React.createElement("input", Object.assign({
    type: type,
    "data-slot": "input",
    className: cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className)
  }, props));
}

var _excluded$4 = ["className", "children"],
  _excluded2 = ["className", "orientation"];
function ScrollArea(_ref) {
  var className = _ref.className,
    children = _ref.children,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$4);
  return React.createElement(ScrollAreaPrimitive.Root, Object.assign({
    "data-slot": "scroll-area",
    className: cn("relative", className)
  }, props), React.createElement(ScrollAreaPrimitive.Viewport, {
    "data-slot": "scroll-area-viewport",
    className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
  }, children), React.createElement(ScrollBar, null), React.createElement(ScrollAreaPrimitive.Corner, null));
}
function ScrollBar(_ref2) {
  var className = _ref2.className,
    _ref2$orientation = _ref2.orientation,
    orientation = _ref2$orientation === void 0 ? "vertical" : _ref2$orientation,
    props = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  return React.createElement(ScrollAreaPrimitive.ScrollAreaScrollbar, Object.assign({
    "data-slot": "scroll-area-scrollbar",
    orientation: orientation,
    className: cn("flex touch-none p-px transition-colors select-none", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", className)
  }, props), React.createElement(ScrollAreaPrimitive.ScrollAreaThumb, {
    "data-slot": "scroll-area-thumb",
    className: "bg-border relative flex-1 rounded-full"
  }));
}

var ChatWidget = function ChatWidget(_ref) {
  var _ref$initialMessages = _ref.initialMessages,
    initialMessages = _ref$initialMessages === void 0 ? [] : _ref$initialMessages,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "Digite sua mensagem..." : _ref$placeholder,
    onSendMessage = _ref.onSendMessage,
    _ref$position = _ref.position,
    position = _ref$position === void 0 ? "left" : _ref$position,
    _ref$primaryColor = _ref.primaryColor,
    primaryColor = _ref$primaryColor === void 0 ? "hsl(var(--primary))" : _ref$primaryColor,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? "Assistente Virtual" : _ref$title,
    _ref$welcomeMessage = _ref.welcomeMessage,
    welcomeMessage = _ref$welcomeMessage === void 0 ? "Olá! Como posso ajudá-lo hoje?" : _ref$welcomeMessage,
    onToggle = _ref.onToggle,
    _ref$defaultOpen = _ref.defaultOpen,
    defaultOpen = _ref$defaultOpen === void 0 ? false : _ref$defaultOpen,
    className = _ref.className;
  var _useState = React.useState(defaultOpen),
    isOpen = _useState[0],
    setIsOpen = _useState[1];
  var _useState2 = React.useState(initialMessages.length > 0 ? initialMessages : [{
      id: "1",
      role: 'bot',
      content: welcomeMessage,
      createdAt: new Date()
    }]),
    messages = _useState2[0],
    setMessages = _useState2[1];
  var _useState3 = React.useState(""),
    inputValue = _useState3[0],
    setInputValue = _useState3[1];
  var _useState4 = React.useState(false),
    isTyping = _useState4[0],
    setIsTyping = _useState4[1];
  var messagesEndRef = React.useRef(null);
  var inputRef = React.useRef(null);
  var scrollToBottom = function scrollToBottom() {
    var _messagesEndRef$curre;
    (_messagesEndRef$curre = messagesEndRef.current) === null || _messagesEndRef$curre === void 0 ? void 0 : _messagesEndRef$curre.scrollIntoView({
      behavior: "smooth"
    });
  };
  React.useEffect(function () {
    scrollToBottom();
  }, [messages]);
  React.useEffect(function () {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  var handleToggle = function handleToggle() {
    var newState = !isOpen;
    setIsOpen(newState);
    onToggle === null || onToggle === void 0 ? void 0 : onToggle(newState);
  };
  var handleSendMessage = function handleSendMessage() {
    try {
      if (!inputValue.trim()) return Promise.resolve();
      var userMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: inputValue,
        createdAt: new Date()
      };
      setMessages(function (prev) {
        return [].concat(prev, [userMessage]);
      });
      setInputValue("");
      onSendMessage === null || onSendMessage === void 0 ? void 0 : onSendMessage(inputValue);
      setIsTyping(true);
      setTimeout(function () {
        var botMessage = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: "Obrigado pela sua mensagem: \"" + inputValue + "\". Como posso ajud\xE1-lo mais?",
          createdAt: new Date()
        };
        setMessages(function (prev) {
          return [].concat(prev, [botMessage]);
        });
        setIsTyping(false);
      }, 1500);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var handleKeyPress = function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  var positionClasses = {
    left: "left-6 bottom-6",
    right: "right-6 bottom-6"
  };
  var chatPositionClasses = {
    left: "left-6 bottom-24",
    right: "right-6 bottom-24"
  };
  return React__default.createElement("div", {
    className: cn("fixed z-50", className)
  }, React__default.createElement("div", {
    className: cn("fixed", positionClasses[position])
  }, React__default.createElement(Button, {
    onClick: handleToggle,
    size: "lg",
    className: cn("h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110", isOpen && "rotate-180"),
    style: {
      backgroundColor: primaryColor
    }
  }, isOpen ? React__default.createElement(lucideReact.X, {
    className: "h-6 w-6"
  }) : React__default.createElement(lucideReact.MessageCircle, {
    className: "h-6 w-6"
  }))), isOpen && React__default.createElement("div", {
    className: cn("fixed", chatPositionClasses[position])
  }, React__default.createElement(Card, {
    className: "w-80 h-96 shadow-2xl animate-in slide-in-from-bottom-5 duration-300"
  }, React__default.createElement("div", {
    className: "flex items-center justify-between p-4 border-b rounded-t-lg text-white",
    style: {
      backgroundColor: primaryColor
    }
  }, React__default.createElement("div", {
    className: "flex items-center gap-2"
  }, React__default.createElement(Avatar, {
    className: "h-8 w-8"
  }, React__default.createElement(AvatarFallback, {
    className: "bg-white/20"
  }, React__default.createElement(lucideReact.Bot, {
    className: "h-4 w-4"
  }))), React__default.createElement("h3", {
    className: "font-semibold text-sm"
  }, title)), React__default.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: handleToggle,
    className: "text-white hover:bg-white/20 h-8 w-8 p-0"
  }, React__default.createElement(lucideReact.X, {
    className: "h-4 w-4"
  }))), React__default.createElement(ScrollArea, {
    className: "flex-1 p-4 h-53"
  }, React__default.createElement("div", {
    className: "space-y-4"
  }, messages.map(function (message) {
    return React__default.createElement("div", {
      key: message.id,
      className: cn("flex gap-2", message.role === 'user' ? "justify-end" : "justify-start")
    }, message.role === 'bot' && React__default.createElement(Avatar, {
      className: "h-6 w-6 mt-1"
    }, React__default.createElement(AvatarFallback, {
      className: "bg-muted"
    }, React__default.createElement(lucideReact.Bot, {
      className: "h-3 w-3"
    }))), React__default.createElement("div", {
      className: cn("max-w-[70%] rounded-lg px-3 py-2 text-sm", message.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")
    }, message.content), message.role === 'user' && React__default.createElement(Avatar, {
      className: "h-6 w-6 mt-1"
    }, React__default.createElement(AvatarFallback, {
      className: "bg-primary"
    }, React__default.createElement(lucideReact.User, {
      className: "h-3 w-3 text-primary-foreground"
    }))));
  }), isTyping && React__default.createElement("div", {
    className: "flex gap-2 justify-start"
  }, React__default.createElement(Avatar, {
    className: "h-6 w-6 mt-1"
  }, React__default.createElement(AvatarFallback, {
    className: "bg-muted"
  }, React__default.createElement(lucideReact.Bot, {
    className: "h-3 w-3"
  }))), React__default.createElement("div", {
    className: "bg-muted rounded-lg px-3 py-2"
  }, React__default.createElement("div", {
    className: "flex gap-1"
  }, React__default.createElement("div", {
    className: "w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
  }), React__default.createElement("div", {
    className: "w-2 h-2 bg-muted-foreground rounded-full animate-bounce",
    style: {
      animationDelay: "0.1s"
    }
  }), React__default.createElement("div", {
    className: "w-2 h-2 bg-muted-foreground rounded-full animate-bounce",
    style: {
      animationDelay: "0.2s"
    }
  })))), React__default.createElement("div", {
    ref: messagesEndRef
  }))), React__default.createElement("div", {
    className: "p-4 border-t"
  }, React__default.createElement("div", {
    className: "flex gap-2"
  }, React__default.createElement(Input, {
    ref: inputRef,
    value: inputValue,
    onChange: function onChange(e) {
      return setInputValue(e.target.value);
    },
    onKeyPress: handleKeyPress,
    placeholder: placeholder,
    className: "flex-1"
  }), React__default.createElement(Button, {
    onClick: handleSendMessage,
    size: "sm",
    disabled: !inputValue.trim(),
    style: {
      backgroundColor: primaryColor
    }
  }, React__default.createElement(lucideReact.Send, {
    className: "h-4 w-4"
  })))))));
};

exports.ChatWidget = ChatWidget;
exports.useChatbot = useChatbot;
//# sourceMappingURL=index.js.map

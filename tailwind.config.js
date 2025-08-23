/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'chat-widget-',
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--chat-border)",
        input: "var(--chat-input)",        // adicionado
        ring: "var(--chat-ring)",          // adicionado
        background: "var(--chat-background)",
        foreground: "var(--chat-foreground)",
        primary: {
          DEFAULT: "var(--chat-primary)",
          foreground: "var(--chat-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--chat-secondary)",
          foreground: "var(--chat-secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--chat-muted)",
          foreground: "var(--chat-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--chat-accent)",
          foreground: "var(--chat-accent-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--chat-radius)",
        md: "calc(var(--chat-radius) - 2px)",
        sm: "calc(var(--chat-radius) - 4px)",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-out": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        }
      },
      animation: {
        "slide-in": "slide-in 0.3s ease-out",
        "slide-out": "slide-out 0.3s ease-in"
      }
    }
  }
};

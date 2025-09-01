/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'hello-cli-',
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
        border: "var(--hello-cli-border)",
        input: "var(--hello-cli-input)",        // adicionado
        ring: "var(--hello-cli-ring)",          // adicionado
        background: "var(--hello-cli-background)",
        foreground: "var(--hello-cli-foreground)",
        primary: {
          DEFAULT: "var(--hello-cli-primary)",
          foreground: "var(--hello-cli-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--hello-cli-secondary)",
          foreground: "var(--hello-cli-secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--hello-cli-muted)",
          foreground: "var(--hello-cli-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--hello-cli-accent)",
          foreground: "var(--hello-cli-accent-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--hello-cli-radius)",
        md: "calc(var(--hello-cli-radius) - 2px)",
        sm: "calc(var(--hello-cli-radius) - 4px)",
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

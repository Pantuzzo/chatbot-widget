import type { Preview } from "@storybook/react";
import "../styles/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#333333",
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="chat-widget-fixed chat-widget-bottom-0 chat-widget-right-0 chat-widget-p-4">
        <Story />
      </div>
    ),
  ],
};

export default preview;
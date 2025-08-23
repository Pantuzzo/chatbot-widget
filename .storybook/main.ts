import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, join } from "path";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": join(dirname(__dirname)),
          "@/components": join(dirname(__dirname), "components"),
          "@/lib": join(dirname(__dirname), "lib"),
          "@/hooks": join(dirname(__dirname), "hooks"),
        },
      },
      css: {
        postcss: join(__dirname, '..', 'postcss.config.js'),
      },
    });
  },
};

export default config;
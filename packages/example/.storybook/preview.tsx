import React from "react";
import type { Preview } from "@storybook/react";
import { Inter } from "next/font/google";
import "../src/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={`${inter.variable}`}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    ref: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

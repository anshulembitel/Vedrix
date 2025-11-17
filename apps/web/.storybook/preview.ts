import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    viewport: {
      defaultViewport: "iphone14",
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#020617" },
        { name: "light", value: "#f9fafb" },
      ],
    },
    layout: "centered",
  },
};

export default preview;
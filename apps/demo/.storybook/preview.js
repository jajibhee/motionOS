import React from "react";
import { MotionProvider } from "@motionos/react";

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    (Story) =>
      React.createElement(
        MotionProvider,
        null,
        React.createElement(
          "div",
          { style: { padding: 24, fontFamily: "system-ui" } },
          React.createElement(Story)
        )
      ),
  ],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: "centered",
    docs: {
      source: { type: "code" },
    },
  },
};

export default preview;

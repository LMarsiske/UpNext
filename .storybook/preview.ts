import type { Preview } from "@storybook/react"
import "@/styles/globals.css"

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
      default: "Light",
      values: [
        {
          name: "Light",
          value: "#F1F5F9",
        },
        {
          name: "Dark",
          value: "#082F49",
        },
      ],
    },
  },
  globalTypes: {
    darkMode: {
      defaultValue: false, // Enable dark mode by default on all stories
    },
  },
}

export default preview

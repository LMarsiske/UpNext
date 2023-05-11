import { DEFAULT_THEME, withTailwindTheme } from "./withTailwindTheme.decorator"
import "../styles/globals.css"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    clearable: false,
    list: [
      {
        name: "Light",
        class: [],
        color: "#ffffff",
        default: true,
      },
      {
        name: "Dark",
        // The class dark will be added to the body tag
        class: ["dark"],
        color: "#000000",
      },
    ],
  },
}

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: DEFAULT_THEME,
  },
}

export const decorators = [withTailwindTheme]

import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "../app/components/Button"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "Overwritten button label",
      table: {
        type: {
          summary: "something short",
          detail: "something really really long",
        },
      },
      control: "text",
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
}

export const LargeOutlined: Story = {
  args: {
    size: "large",
    label: "Button",
    outline: true,
  },
}

export const Medium: Story = {
  args: {
    size: "medium",
    label: "Button",
  },
}

export const MediumOutlined: Story = {
  args: {
    size: "medium",
    label: "Button",
    outline: true,
  },
}

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
}

export const SmallOutlined: Story = {
  args: {
    size: "small",
    label: "Button",
    outline: true,
  },
}

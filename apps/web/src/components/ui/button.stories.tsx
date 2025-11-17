import type { Meta, StoryObj } from "@storybook/react";
import { Button, type ButtonProps } from "./button";

const meta: Meta<typeof Button> = {
  title: "Mobile/UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "icon"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    fullWidth: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Send",
    variant: "primary",
    size: "md",
    fullWidth: true,
  } satisfies ButtonProps,
};

export const Secondary: Story = {
  args: {
    children: "Business names",
    variant: "secondary",
    size: "md",
  } satisfies ButtonProps,
};

export const Ghost: Story = {
  args: {
    children: "Tap",
    variant: "ghost",
    size: "md",
  } satisfies ButtonProps,
};

export const Icon: Story = {
  args: {
    children: "➤",
    variant: "icon",
    size: "md",
  } satisfies ButtonProps,
};

export const Loading: Story = {
  args: {
    children: "Sending…",
    variant: "primary",
    size: "md",
    fullWidth: true,
    loading: true,
  } satisfies ButtonProps,
};
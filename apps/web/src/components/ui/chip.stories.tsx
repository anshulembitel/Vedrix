import type { Meta, StoryObj } from "@storybook/react";
import { Chip, type ChipProps } from "./chip";

const meta: Meta<typeof Chip> = {
  title: "Mobile/UI/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    active: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-[390px] max-w-full px-4 py-6 bg-slate-950 rounded-[32px] flex flex-wrap gap-3">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    label: "Business names",
    active: false,
  } satisfies ChipProps,
};

export const Active: Story = {
  args: {
    label: "Business names",
    active: true,
  } satisfies ChipProps,
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip label="Business names" active />
      <Chip label="Game names" />
      <Chip label="Dish names" />
      <Chip label="App names" />
    </div>
  ),
};
import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./input-field";

const meta: Meta<typeof InputField> = {
  title: "Mobile/UI/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
    type: {
      control: "text",
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-[390px] max-w-full px-6 py-8 bg-slate-950 rounded-[32px] flex flex-col gap-4">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email",
    icon: <span>📧</span>,
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
    icon: <span>🔒</span>,
  },
};

export const Plain: Story = {
  args: {
    type: "text",
    placeholder: "Full name",
  },
};
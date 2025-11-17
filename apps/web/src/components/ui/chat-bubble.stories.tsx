import type { Meta, StoryObj } from "@storybook/react";
import { ChatBubble } from "./chat-bubble";

const meta: Meta<typeof ChatBubble> = {
  title: "Mobile/UI/ChatBubble",
  component: ChatBubble,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-[390px] max-w-full bg-slate-50 rounded-[32px] p-4 flex flex-col gap-4">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    from: {
      control: "radio",
      options: ["bot", "user"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const Bot: Story = {
  args: {
    text: "Hi, you can ask me anything about names.",
    from: "bot",
  },
};

export const User: Story = {
  args: {
    text: "Generate a cool brand name for my tech startup.",
    from: "user",
  },
};

export const LongMessage: Story = {
  args: {
    text:
      "Here are some name ideas: NovaFlow, ByteNest, CloudSprint, PixelForge, and Quantum Lane.",
    from: "bot",
  },
};
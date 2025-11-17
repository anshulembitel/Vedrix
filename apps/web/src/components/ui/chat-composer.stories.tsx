
import type { Meta, StoryObj } from "@storybook/react";
import { ChatComposer } from "./chat-composer";

const meta: Meta<typeof ChatComposer> = {
  title: "Mobile/UI/ChatComposer",
  component: ChatComposer,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="relative w-[390px] max-w-full h-[844px] bg-slate-50 rounded-[32px] shadow-xl overflow-hidden">
          <div className="p-4 pb-24 text-xs text-slate-400">
            Chat content area (messages would be here)…
          </div>
          <Story />
        </div>
      </div>
    ),
  ],
  args: {
    onSend: (msg: string) => {
    
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatComposer>;

export const Default: Story = {};
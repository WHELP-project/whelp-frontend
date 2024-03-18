import type { Meta, StoryObj } from "@storybook/react";
import { OnRampModal } from "../../src";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof OnRampModal> = {
  title: "General/OnRampModal",
  component: OnRampModal,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof OnRampModal>;

export const Primary: Story = {
  args: {
    open: true,
    walletAddress: "",
    onClose: () => {},
  },
};

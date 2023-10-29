import type { Meta, StoryObj } from "@storybook/react";
import { ConnectWalletButton } from "../../src";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof ConnectWalletButton> = {
  title: "General/ConnectWalletButton",
  component: ConnectWalletButton,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof ConnectWalletButton>;

export const Primary: Story = {
  args: {},
};

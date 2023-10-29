import type { Meta, StoryObj } from "@storybook/react";
import { WalletModal } from "../../src";
import { WalletTypes } from "@whelp/types";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof WalletModal> = {
  title: "General/WalletModal",
  component: WalletModal,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof WalletModal>;

export const Primary: Story = {
  args: {
    open: true,
    wallets: [
      {
        type: WalletTypes.WalletTypes.Leap,
        name: "Leap",
        icon: "/images/walletIcons/leap.png",
        onClick: () => {},
      },
      {
        type: WalletTypes.WalletTypes.Cosmostation,
        name: "Cosmostation",
        icon: "/images/walletIcons/cosmostation.png",
        onClick: () => {},
      },
    ],
    onClose: () => {},
  },
};

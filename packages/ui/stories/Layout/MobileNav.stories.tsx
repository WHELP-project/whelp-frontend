import type { Meta, StoryObj } from "@storybook/react";
import { MobileNav } from "../../src";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof MobileNav> = {
  title: "Layout/MobileNav",
  component: MobileNav,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof MobileNav>;

const mockMenu = [
  {
    label: "Overview",
    onClick: () => {},
    active: false,
    icon: "/images/navbar/overview.svg",
    iconActive: "/images/navbar/overview_active.svg",
  },
  {
    label: "Swap",
    onClick: () => {},
    active: false,
    icon: "/images/navbar/swap.svg",
    iconActive: "/images/navbar/swap_active.svg",
  },
  {
    label: "Pools",
    onClick: () => {},
    active: true,
    icon: "/images/navbar/pools.svg",
    iconActive: "/images/navbar/pools_active.svg",
  },
];

export const NotConnected: Story = {
  args: {
    menu: mockMenu,
    isOpen: true,
    onClose: () => {},
    connectWallet: () => {},
    disconnectWallet: () => {},
    isConnected: false,
  },
};

export const Connected: Story = {
  args: {
    menu: mockMenu,
    isOpen: true,
    onClose: () => {},
    connectWallet: () => {},
    disconnectWallet: () => {},
    isConnected: true,
    walletAddress: "0x1234567890123456789012345678901234567890",
    walletIcon: "/images/walletIcons/leap.png",
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { StatusModal } from "../../src/StatusModal";
import { Token } from "@whelp/types";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof StatusModal> = {
  title: "Layout/StatusModal",
  component: StatusModal,
};

export default meta;

const token: Token = {
  name: "USDC",
  icon: "cryptoIcons/usdt.svg",
  balance: 100,
  category: "Stable",
  usdValue: 1 * 100,
  decimals: 6,
};

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof StatusModal>;

export const SuccessProvideLiquidity: Story = {
  args: {
    open: true,
    onClose: () => {},
    txType: "addLiquidity",
    status: "success",
    tokens: [token, token],
  },
};

export const SuccessSwap: Story = {
  args: {
    open: true,
    onClose: () => {},
    txType: "swap",
    status: "success",
    tokens: [token, token],
  },
};

export const ErrorProvideLiquidity: Story = {
  args: {
    open: true,
    onClose: () => {},
    txType: "addLiquidity",
    status: "error",
  },
};

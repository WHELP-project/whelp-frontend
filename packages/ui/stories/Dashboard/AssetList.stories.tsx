import type { Meta, StoryObj } from "@storybook/react";
import { AssetList } from "../../src";
import { Token } from "@whelp/types";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof AssetList> = {
  title: "Dashboard/AssetList",
  component: AssetList,
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

const token2: Token = {
  name: "USDT",
  icon: "cryptoIcons/usdt.svg",
  balance: 100000,
  category: "Stable",
  usdValue: 1 * 1200,
  decimals: 6,
};

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof AssetList>;

export const Primary: Story = {
  args: {
    entries: [token, token2, token, token2],
  },
};

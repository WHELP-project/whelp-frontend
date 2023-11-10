import type { Meta, StoryObj } from "@storybook/react";
import { PoolMultiple } from "../../src/PoolMultiple";
import { Token, UiTypes } from "@whelp/types";

const token: Token = {
  name: "USDC",
  icon: "cryptoIcons/usdt.svg",
  balance: 100,
  category: "Stable",
  usdValue: 1 * 100,
  decimals: 7,
};

const pool: UiTypes.Pool = {
  token_a: token,
  token_b: token,
  tvl: 100000000,
  apr: 0.8,
  poolAddress:
    "testcore1v4naqcj53v75a095ursm9tn2vlnk2ew7f2hw72n4fd4ewc5rrfjqk3940p",
};

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof PoolMultiple> = {
  title: "PoolMultiple/Overview",
  component: PoolMultiple,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof PoolMultiple>;

export const Primary: Story = {
  args: {
    pools: [pool, pool, pool],
  },
};

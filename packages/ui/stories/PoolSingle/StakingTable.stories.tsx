import type { Meta, StoryObj } from "@storybook/react";
import { StakingTable } from "../../src/PoolSingle";
import { Token, UiTypes } from "@whelp/types";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof StakingTable> = {
  title: "PoolSingle/StakingTable",
  component: StakingTable,
};

export default meta;

const token: Token = {
  name: "USDC",
  icon: "cryptoIcons/usdt.svg",
  balance: 100,
  category: "Stable",
  usdValue: 1 * 100,
};

const entries: UiTypes.StakingTableEntry[] = [
  {
    lpToken: token,
    startDate: "2021-09-01",
    APR: 0.1,
    lockedPeriod: "30d",
    unstake: () => {},
  },
  {
    lpToken: token,
    startDate: "2021-09-01",
    APR: 0.1,
    lockedPeriod: "30d",
    unstake: () => {},
  },
  {
    lpToken: token,
    startDate: "2021-09-01",
    APR: 0.1,
    lockedPeriod: "30d",
    unstake: () => {},
  },
  {
    lpToken: token,
    startDate: "2021-09-01",
    APR: 0.1,
    lockedPeriod: "30d",
    unstake: () => {},
  },
  {
    lpToken: token,
    startDate: "2021-09-01",
    APR: 0.1,
    lockedPeriod: "30d",
    unstake: () => {},
  },
];

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof StakingTable>;
export const Filled: Story = {
  args: {
    entries: entries,
  },
};

export const Empty: Story = {
  args: {
    entries: [],
  },
};

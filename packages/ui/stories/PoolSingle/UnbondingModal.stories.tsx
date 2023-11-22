import type { Meta, StoryObj } from "@storybook/react";
import { UnbondingModal } from "../../src/PoolSingle";
import { Token } from "@whelp/types";

const token: Token = {
  name: "USDC",
  icon: "cryptoIcons/usdt.svg",
  balance: 100,
  category: "Stable",
  usdValue: 1 * 100,
  decimals: 7,
};

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof UnbondingModal> = {
  title: "PoolSingle/UnbondingModal",
  component: UnbondingModal,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof UnbondingModal>;

export const Primary: Story = {
  args: {
    open: true,
    lpToken: token,
    entries: [
      {
        amount: "10000",
        release_at: {
          at_time: "1701256290607813770",
        },
      },
      {
        amount: "10000",
        release_at: {
          at_time: "1701256290607813770",
        },
      },
    ],
  },
};

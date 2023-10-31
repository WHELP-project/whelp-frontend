import type { Meta, StoryObj } from "@storybook/react";
import { PoolStakeForm } from "../../src/PoolSingle";
import { Token } from "@whelp/types";

const token: Token = {
  name: "USDT",
  icon: "cryptoIcons/usdt.svg",
  balance: 100,
  category: "Stable",
  usdValue: 1 * 100,
};

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof PoolStakeForm> = {
  title: "PoolSingle/PoolStakeForm",
  // @ts-ignore
  component: PoolStakeForm,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof PoolStakeForm>;

export const Primary: Story = {
  args: {
    tokenBoxProps: {
      token: token,
      onChange: () => {},
      value: "0.00",
      isStakeToken: true,
    },
  },
};

export const Secondary: Story = {
  args: {
    tokenBoxProps: {
      token: token,
      onChange: () => {},
      value: "0.00",
      isStakeToken: true,
      disabled: true,
    },
  },
};

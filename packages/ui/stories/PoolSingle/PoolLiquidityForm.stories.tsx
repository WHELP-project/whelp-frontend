import type { Meta, StoryObj } from "@storybook/react";
import { PoolLiquidityForm } from "../../src/PoolSingle";

const token = {
  name: "USDC",
  icon: "cryptoIcons/usdt.svg",
  amount: 100,
  category: "Stable",
  usdValue: 1 * 100,
};

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof PoolLiquidityForm> = {
  title: "PoolSingle/PoolLiquidityForm",
  // @ts-ignore
  component: PoolLiquidityForm,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof PoolLiquidityForm>;

export const Primary: Story = {
  args: {
    addLiquidityProps: [
      {
        token: token,
        onChange: () => {},
        value: "0.00"
      },
      {
        token: token,
        onChange: () => {},
        value: "0.00"
      }
    ],
    removeLiquidityProps: {
      token: token,
      onChange: () => {},
      value: "0.00"
    }
  },
};

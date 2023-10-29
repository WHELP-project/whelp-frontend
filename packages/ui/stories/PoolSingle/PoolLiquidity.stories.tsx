import type { Meta, StoryObj } from "@storybook/react";
import { PoolLiquidity } from "../../src/PoolSingle/PoolLiquidity/PoolLiquidity";

const token = {
  name: "USDT",
  icon: "cryptoIcons/usdt.svg",
  amount: 100,
  category: "Stable",
  usdValue: 1 * 100,
};

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof PoolLiquidity> = {
  title: "PoolSingle/PoolLiquidity",
  // @ts-ignore
  component: PoolLiquidity,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof PoolLiquidity>;

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

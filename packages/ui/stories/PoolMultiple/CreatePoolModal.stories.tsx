import type { Meta, StoryObj } from "@storybook/react";
import CreatePoolModal from "../../src/CreatePoolModal";
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
const meta: Meta<typeof CreatePoolModal> = {
  title: "PoolMultiple/CreatePoolModal",
  // @ts-ignore
  component: CreatePoolModal,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof CreatePoolModal>;

export const Create: Story = {
  args: {
    isOpen: true,
    setOpen: () => {},
    onCreatePoolClick: (tokenA: any, tokenB: any) => {
      console.log(tokenA, tokenB)
    },
    onProvideLiquidityClick: () => {
      console.log("Provide");
    }
  },
};

export const Liquidity: Story = {
  args: {
    isOpen: true,
    setOpen: () => {},
    onCreatePoolClick: (tokenA: any, tokenB: any) => {
      console.log(tokenA, tokenB)
    },
    onProvideLiquidityClick: () => {
      console.log("Provide");
    },
    tokenBoxProps: [{
      token: token,
      onChange: () => {},
      value: "0.00",
    },
    {
      token: token,
      onChange: () => {},
      value: "0.00",
    },]
  },
};

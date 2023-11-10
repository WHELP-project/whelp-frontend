import type { Meta, StoryObj } from "@storybook/react";
import { SwapContainer } from "../../src/Swap";
import { Token } from "@whelp/types";

const token: Token = {
  name: "USDT",
  icon: "cryptoIcons/usdt.svg",
  balance: 100,
  category: "Stable",
  usdValue: 1 * 100,
  decimals: 7,
};

const token2: Token = {
  name: "USDC",
  icon: "cryptoIcons/usdc.svg",
  balance: 100,
  category: "Stable",
  usdValue: 1 * 100,
  decimals: 7,
};

const token3: Token = {
  name: "BTC",
  icon: "cryptoIcons/btc.svg",
  balance: 100,
  category: "Stable",
  usdValue: 1 * 100,
  decimals: 7,
};

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof SwapContainer> = {
  title: "Swap/Container",
  component: SwapContainer,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof SwapContainer>;

export const Main: Story = {
  args: {
    from_token: token,
    to_token: token2,
    from_amount: 100,
    to_amount: 200,
    tokens: [token, token3, token2],
    onFromTokenChange: (token: Token) => console.log(token),
    onToTokenChange: (token: Token) => console.log(token),
    onFromAmountChange: (amount: number) => console.log(amount),
    onToAmountChange: (amount: number) => console.log(amount),
    onSwap: () => console.log("Swap"),
  },
};

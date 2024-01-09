import type { Meta, StoryObj } from "@storybook/react";
import { IbcDepositModal } from "../../src";
import { Token } from "@whelp/types";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof IbcDepositModal> = {
  title: "Dashboard/IbcDepositModal",
  component: IbcDepositModal,
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
type Story = StoryObj<typeof IbcDepositModal>;

export const Primary: Story = {
  args: {
    open: true,
    fromToken: token,
    fromAddress: "cosmos14tla02hwpc2smx74rsv87vdkh3k6cm84gfrc9y",
    toToken: token2,
    toAddress: "cosmos14tla02hwpc2smx74rsv87vdkh3k6cm84gfrc9y",
    amount: 100,
    availableAmount: 300,
    onClose: () => {},
    onClick: () => {}
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { TokenBox } from "../../src/PoolSingle";

const token = {
  name: "USDT",
  icon: "cryptoIcons/usdt.svg",
  amount: 100,
  category: "Stable",
  usdValue: 1 * 100,
};

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof TokenBox> = {
  title: "PoolSingle/TokenBox",
  // @ts-ignore
  component: TokenBox,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof TokenBox>;

export const Primary: Story = {
  args: {
    token: token,
  },
};
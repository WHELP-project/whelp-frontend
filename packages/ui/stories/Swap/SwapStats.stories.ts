import type { Meta, StoryObj } from "@storybook/react";
import { SwapStats } from "../../src/Swap";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof SwapStats> = {
  title: "Swap/Stats",
  component: SwapStats,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof SwapStats>;

export const Main: Story = {
  args: {
    exchangeRateText: "1 ETH = 0.00000001 BTC",
    networkFeeText: "0.00000001 BTC",
    route: ["ETH", "BTC"],
    maximumSpreadText: "1%",
  },
};

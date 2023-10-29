import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AppBar, Navigation } from "../../src";
import { Box } from "@mui/material";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof AppBar> = {
  title: "Layout/AppBar",
  component: AppBar,
  decorators: [
    (Story) => (
      <Box sx={{ display: "flex" }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Navigation menu={[]} />
        <Story />
      </Box>
    ),
  ],
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof AppBar>;

export const NotConnected: Story = {
  args: {
    title: "Pools",
    isConnected: false,
  },
};

export const Connected: Story = {
  args: {
    title: "Pools",
    isConnected: true,
    walletAddress: "0x1234567890123456789012345678901234567890",
    walletIcon: "/images/walletIcons/leap.png",
  },
};

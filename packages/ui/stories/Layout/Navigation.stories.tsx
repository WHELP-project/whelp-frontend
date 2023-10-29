import type { Meta, StoryObj } from "@storybook/react";
import { Navigation } from "../../src";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof Navigation> = {
  title: "Layout/Navigation",
  component: Navigation,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof Navigation>;

export const Primary: Story = {
  args: {
    menu: [
      {
        label: "Overview",
        onClick: () => {},
        active: false,
        icon: "/images/navbar/overview.svg",
        iconActive: "/images/navbar/overview_active.svg",
      },
      {
        label: "Swap",
        onClick: () => {},
        active: false,
        icon: "/images/navbar/swap.svg",
        iconActive: "/images/navbar/swap_active.svg",
      },
      {
        label: "Pools",
        onClick: () => {},
        active: true,
        icon: "/images/navbar/pools.svg",
        iconActive: "/images/navbar/pools_active.svg",
      },
    ],
  },
};

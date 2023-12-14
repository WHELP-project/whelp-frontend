import type { Meta, StoryObj } from "@storybook/react";
import { LoaderVideo } from "../../src";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof LoaderVideo> = {
  title: "Layout/LoaderVideo",
  component: LoaderVideo,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof LoaderVideo>;

export const VariantOne: Story = {
  args: {
    variant: 1,
  },
};

export const VariantTwo: Story = {
  args: {
    variant: 2,
  },
};
export const VariantThree: Story = {
  args: {
    variant: 3,
  },
};

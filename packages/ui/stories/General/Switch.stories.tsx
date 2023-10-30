import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../../src";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof Switch> = {
  title: "General/Switch",
  component: Switch,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof Switch>;

export const Primary: Story = {
  args: {
    checked: false,
    handleChange: () => {},
  },
};

export const Secondary: Story = {
  args: {
    checked: true,
    size: "small",
    handleChange: () => {},
  },
};

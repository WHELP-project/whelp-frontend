import type { Meta, StoryObj } from "@storybook/react";
import TestComponent from "../src";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof TestComponent> = {
  title: "Layout/TestComponent",
  component: TestComponent,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof TestComponent>;

export const Test: Story = {};

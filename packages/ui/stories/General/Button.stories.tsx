import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../src";
import React from "react";
import { ArrowLeft, ArrowRight } from "react-huge-icons/outline";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof Button> = {
  title: "General/Button",
  component: Button,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Primary",
    size: "medium",
    type: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary",
    size: "medium",
    type: "secondary",
  },
};

export const Icon: Story = {
  args: {
    startIcon: <ArrowLeft style={{ width: "24px", height: "24px" }} />,
    size: "medium",
    type: "secondary",
  },
};

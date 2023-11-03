import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "../../src";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof Modal> = {
  title: "General/Modal",
  component: Modal,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: "Modal title",
    children: "Modal content",
  },
};

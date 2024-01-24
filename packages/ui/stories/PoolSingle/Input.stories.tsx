import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../../src/PoolSingle/Input";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof Input> = {
  title: "PoolSingle/Input",
  // @ts-ignore
  component: Input,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    value: "foo",
    onChange: (e: any) => {},
    placeholder: "0.00"
  },
};

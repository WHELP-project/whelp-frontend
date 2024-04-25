import type { Meta, StoryObj } from "@storybook/react";
import CreatePoolModal from "../../src/CreatePoolModal";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof CreatePoolModal> = {
  title: "PoolMultiple/CreatePoolModal",
  // @ts-ignore
  component: CreatePoolModal,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof CreatePoolModal>;

function test(val: string) {
  console.log(val);
}

export const Create: Story = {
  args: {
    isOpen: true,
    poolCreated: false,
    setOpen: () => {},
    onCreatePoolClick: (tokenA: any, tokenB: any) => {
      console.log(tokenA, tokenB)
    }
  },
};

export const Liquidity: Story = {
  args: {
    isOpen: true,
    poolCreated: true,
    setOpen: () => {},
    onCreatePoolClick: (tokenA: any, tokenB: any) => {
      console.log(tokenA, tokenB)
    }
  },
};

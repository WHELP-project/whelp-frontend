import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../../src";
import { Grid, Typography } from "@mui/material";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof Card> = {
  title: "General/Card",
  component: Card,
  decorators: [
    (Story) => (
      <Grid container gap={3} sx={{ margin: { md: "3rem" } }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Grid item xs={6} md={2}>
          <Story />
        </Grid>
      </Grid>
    ),
  ],
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: "Card Title",
    content: <Typography>Card Content</Typography>,
    warning: true,
    warningText: "24d left",
    percentage: 2.5,
    percentageText: "last month",
  },
};

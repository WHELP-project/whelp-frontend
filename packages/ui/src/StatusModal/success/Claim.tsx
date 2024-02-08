import { Avatar, Box, Grid, Typography } from "@mui/material";
import { palette } from "../..";
import { UiTypes } from "@whelp/types";
import React from "react";

export const ClaimSuccess = ({ ...props }: UiTypes.StatusModalProps) => (
  <>
    <Typography
      sx={{
        color: palette.textLoud,
        fontSize: "2rem",
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "2.5rem",
      }}
    >
      Successfully Claimed
    </Typography>
  </>
);

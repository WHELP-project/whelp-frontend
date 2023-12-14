import { Avatar, Box, Grid, Typography } from "@mui/material";
import { palette } from "../..";
import { UiTypes } from "@whelp/types";
import React from "react";

export const UnStakeLpSuccess = ({ ...props }: UiTypes.StatusModalProps) => (
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
      Successfully Unstaked
    </Typography>
    <Grid container>
      {props.tokens.map((token, index) => (
        <Grid item key={index} xs={6}>
          <Box
            sx={{
              display: "flex",
              padding: "0.75rem",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.5rem",
              flex: "1 0 0",
              borderRadius: "1rem",
              border: `1px solid ${palette.strokePrimary}`,
              background: palette.bgAlpha0,
            }}
          >
            <Typography
              sx={{
                alignSelf: "stretch",
                color: palette.textLoud,
                fontFamily: "Inter",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "1.25rem", // 142.857%
              }}
            >
              {token.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Avatar sx={{ height: "2rem", width: "2rem" }} src={token.icon} />
              <Typography
                sx={{
                  display: "-webkit-box",
                  width: "6.25rem",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  overflow: "hidden",
                  color: palette.textMuted,
                  textOverflow: "ellipsis",
                  fontFamily: "Inter",
                  fontSize: "1rem",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "1.5rem",
                }}
              >
                {token.balance}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  </>
);

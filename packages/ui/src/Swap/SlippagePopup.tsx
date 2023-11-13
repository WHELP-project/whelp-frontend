import { Box, Grid, Popover, Typography } from "@mui/material";
import React from "react";
import theme from "../Theme";
import { UiTypes } from "@whelp/types";

const SlippagePopup = ({
  anchorEl,
  onClose,
  setSlippageTolerance,
  slippageTolerance,
}: UiTypes.SlippagePopupProps) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      hideBackdrop={false}
      disableEnforceFocus={true}
      disableScrollLock={true}
      slotProps={{
        paper: {
          sx: {
            background: "none",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "25rem",
          padding: "0.75rem 1rem",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1rem",
          right: "2rem",
          top: "4rem",
          borderRadius: "0.75rem",
          border: `1px solid ${theme.palette.strokePrimary}`,
          background: theme.palette.bgAlpha0,
          boxShadow: "0px 6px 40px -8px rgba(10, 11, 15, 0.60)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.textLoud,
            fontSize: "1rem",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "1.5rem",
          }}
        >
          Slippage Tolerance
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            borderRadius: "62.4375rem",
            border: `1px solid ${theme.palette.strokePrimary}`,
            background: theme.palette.bgAlpha0,
          }}
        >
          <Grid container>
            <Grid
              sx={{
                display: "flex",
                width: "7.66669rem",
                padding: "0.625rem 1rem",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.75rem",
                borderRight: `1px solid ${theme.palette.strokePrimary}`,
                cursor: "pointer",
                "&:hover": {
                  background: theme.palette.bgAlpha100,
                },
                background:
                  slippageTolerance === 0.5 ? theme.palette.bgAlpha200 : "none",
                borderRadius: "62.4375rem 0 0 62.4375rem",
              }}
              onClick={() => setSlippageTolerance(0.5)}
              item
              xs={4}
            >
              0.5%
            </Grid>
            <Grid
              sx={{
                display: "flex",
                width: "7.66669rem",
                padding: "0.625rem 1rem",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.75rem",
                cursor: "pointer",
                borderRight: `1px solid ${theme.palette.strokePrimary}`,
                "&:hover": {
                  background: theme.palette.bgAlpha100,
                },
                background:
                  slippageTolerance === 2.5 ? theme.palette.bgAlpha200 : "none",
              }}
              onClick={() => setSlippageTolerance(2.5)}
              item
              xs={4}
            >
              2.5%
            </Grid>
            <Grid
              sx={{
                display: "flex",
                width: "7.66669rem",
                padding: "0.625rem 1rem",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.75rem",
                cursor: "pointer",
                "&:hover": {
                  background: theme.palette.bgAlpha100,
                },
                background:
                  slippageTolerance === 5 ? theme.palette.bgAlpha200 : "none",
                borderRadius: "0 62.4375rem 62.4375rem 0",
              }}
              onClick={() => setSlippageTolerance(5)}
              item
              xs={4}
            >
              5%
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "23rem",
            padding: "0.75rem",
            alignItems: "flex-start",
            gap: "0.75rem",
            borderRadius: "0.75rem",
            background: theme.palette.bgAlpha25,
          }}
        >
          <Box component="img" src="/images/warnIcon.svg" />
          <Typography
            sx={{
              color: theme.palette.textMuted,
              fontFamily: "Inter",
              fontSize: "0.75rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "1rem",
            }}
          >
            Price slippage is the difference in prices between the time a market
            order is placed and the time it completes on the blockchain or is
            filled.
          </Typography>
        </Box>
      </Box>
    </Popover>
  );
};

export { SlippagePopup };

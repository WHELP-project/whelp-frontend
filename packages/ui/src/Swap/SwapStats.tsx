import { Box, Divider, Grid, Skeleton, Typography } from "@mui/material";
import { UiTypes } from "@whelp/types";
import theme from "../Theme";
import React from "react";

const SwapStats = (props: UiTypes.SwapStatsProps) => {
  return (
    <Box
      sx={{
        background: theme.palette.bgPrimary,
        maxWidth: "100%",
      }}
    >
      <Box
        sx={{
          padding: "1rem 2rem",
          borderRadius: "1.5rem",
          border: `1px solid ${theme.palette.strokeSecondary}`,
          background: theme.palette.bgAlpha0,
          backdropFilter: "blur(20px)",
          maxWidth: "100%",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.textLoud,
            fontSize: "1.25rem",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "1.75rem",
          }}
        >
          Swap Details
        </Typography>
        <Divider
          sx={{ my: "0.75rem", background: theme.palette.strokePrimary }}
        />
        <Grid container>
          <Grid item xs={6}>
            <Typography>Exchange rate</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              textAlign: "right",
              width: "100%",
              color: theme.palette.textNormal,
              fontSize: "1.5rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "1.75rem",
            }}
          >
            {props.simulateLoading ? (
              <Skeleton variant="text" width="100%" />
            ) : (
              <Typography>{props.exchangeRateText}</Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography>Network fee</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              textAlign: "right",
              width: "100%",
              color: theme.palette.textNormal,
              fontSize: "1.5rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "1.75rem",
            }}
          >
            {props.simulateLoading ? (
              <Skeleton variant="text" width="100%" />
            ) : (
              <Typography>{props.networkFeeText}</Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography>Route</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              textAlign: "right",
              width: "100%",
              color: theme.palette.textNormal,
              fontSize: "1.5rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "1.75rem",
            }}
          >
            {props.simulateLoading ? (
              <Skeleton variant="text" width="100%" />
            ) : (
              <Typography>
                {props.route.map((el, index) =>
                  index === props.route.length - 1 ? el : `${el} -> `
                )}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography>Maximum Spread</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              textAlign: "right",
              width: "100%",
              color: theme.palette.textNormal,
              fontSize: "1.5rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "1.75rem",
            }}
          >
            {props.simulateLoading ? (
              <Skeleton variant="text" width="100%" />
            ) : (
              <Typography>{props.maximumSpreadText}</Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export { SwapStats };

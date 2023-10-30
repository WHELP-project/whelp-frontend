import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { TokenBox } from "../TokenBox/TokenBox";
import React from "react";
import theme from "../../Theme";
import { Button } from "../../Button";
import { UiTypes, Token } from "@whelp/types";

const PoolStakeForm = ({
  tokenBoxProps,
  stakeRewards = 0,
  changeStakePercentage,
  stakeClick,
  claimClick,
}: UiTypes.PoolStakeProps) => {
  const setStakePercentage = (percent: number) => {
    changeStakePercentage(percent);
  };

  return (
    <Box>
      <Box
        sx={{
          borderRadius: "16px",
          border: `1px solid ${theme.palette.strokePrimary}`,
          background: theme.palette.bgAlpha0,
          backdropFilter: "blur(20px)",
          padding: "24px",
          marginBottom: "8px",
        }}
      >
        <Box
          sx={{
            marginBottom: "8px",
          }}
        >
          <TokenBox {...tokenBoxProps} />
        </Box>
        <Grid
          container
          rowSpacing={1}
          sx={{
            marginBottom: "8px",
          }}
        >
          <Grid item xs={3}>
            <Button
              size="small"
              type="secondary"
              label="25%"
              onClick={() => setStakePercentage(25)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              size="small"
              type="secondary"
              label="50%"
              onClick={() => setStakePercentage(50)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              size="small"
              type="secondary"
              label="75%"
              onClick={() => setStakePercentage(75)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              size="small"
              type="secondary"
              label="100%"
              onClick={() => setStakePercentage(100)}
            />
          </Grid>
        </Grid>
        <Button onClick={stakeClick} label="Stake" />
      </Box>

      <Box
        sx={{
          borderRadius: "16px",
          border: `1px solid ${theme.palette.strokePrimary}`,
          background: theme.palette.bgAlpha0,
          backdropFilter: "blur(20px)",
          padding: "16px 24px",
          color: theme.palette.textNormal,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              marginRight: "8px",
              color: theme.palette.textNormal,
            }}
          >
            Total Rewards:
          </Typography>
          <Typography
            sx={{
              color: theme.palette.textLoud,
              fontSize: "20px",
            }}
          >
            {stakeRewards}
          </Typography>
        </Box>
        <Button type="secondary" label="Claim" onClick={claimClick} />
      </Box>
    </Box>
  );
};

export { PoolStakeForm };

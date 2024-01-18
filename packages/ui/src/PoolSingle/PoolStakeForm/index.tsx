import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { TokenBox } from "../TokenBox";
import React from "react";
import theme from "../../Theme";
import { Button } from "../../Button";
import { UiTypes } from "@whelp/types";

const PoolStakeForm = ({
  disabled,
  tokenBoxProps,
  stakeRewards = [],
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
          spacing={1}
          sx={{
            marginBottom: "16px",
          }}
        >
          <Grid item xs={3}>
            <Button
              sx={{ width: "100%" }}
              size="small"
              type="secondary"
              label="25%"
              onClick={() => setStakePercentage(25)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              sx={{ width: "100%" }}
              size="small"
              type="secondary"
              label="50%"
              onClick={() => setStakePercentage(50)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              sx={{ width: "100%" }}
              size="small"
              type="secondary"
              label="75%"
              onClick={() => setStakePercentage(75)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              sx={{ width: "100%" }}
              size="small"
              type="secondary"
              label="100%"
              onClick={() => setStakePercentage(100)}
            />
          </Grid>
        </Grid>
        <Button sx={{width: "100%"}} onClick={stakeClick} label="Stake" disabled={disabled} />
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
            {stakeRewards.map((reward) => (
              <>
                {reward.amount} {reward.symbol}
              </>
            ))}
            {/* If stakeRewards is empty, show 0 */}
            {stakeRewards.length === 0 && <>0</>}
          </Typography>
        </Box>
        <Button
          type="secondary"
          // Disable button if there are no rewards to claim
          // If wallet isnt collected, rewards is empty array
          disabled={stakeRewards.length === 0}
          label="Claim"
          onClick={claimClick}
        />
      </Box>
    </Box>
  );
};

export { PoolStakeForm };

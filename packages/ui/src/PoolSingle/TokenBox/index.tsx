import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import { Input } from "../Input";
import React from "react";
import theme from "../../Theme";
import { UiTypes } from "@whelp/types";
import { microAmountToAmount } from "@whelp/utils";

const TokenBox = ({
  token,
  onChange,
  value,
  loading,
  disabled = false,
  isStakeToken = false,
}: UiTypes.TokenBoxProps) => {
  const [usdPrice, setUsdPrice] = React.useState(
    Number(value) * Number(token.usdValue) || 0
  );

  return (
    <Box
      sx={{
        borderRadius: "12px",
        border: `1px solid ${theme.palette.strokePrimary}`,
        background: theme.palette.bgAlpha25,
        backdropFilter: "blur(20px)",
        padding: "16px",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Box
            component={"img"}
            src={token.icon}
            sx={{
              maxWidth: "40px",
            }}
          />
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "4px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
              }}
            >
              {loading ? (
                <Skeleton variant="rounded" width={100} />
              ) : (
                token.name
              )}
            </Typography>
            <Typography
              sx={{
                color: theme.palette.textNormal,
                fontSize: "14px",
              }}
            >
              {loading ? (
                <Skeleton variant="rounded" width={100} />
              ) : (
                "Available " + microAmountToAmount(token)
              )}
            </Typography>
          </Box>
          {!isStakeToken && (
            <Button
              onClick={() => {
                onChange(microAmountToAmount(token).toString());
                setUsdPrice(microAmountToAmount(token) * token.usdValue);
              }}
              sx={{
                borderRadius: "999px",
                opacity: 0.9,
                background: "#F0660A",
                color: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "14px",
                lineHeight: "20px",
                width: "44px",
                height: "24px",
                cursor: "pointer",
              }}
            >
              Max
            </Button>
          )}
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {loading ? (
            <Skeleton variant="rounded" width={100} height={70} />
          ) : (
            <Input
              disabled={disabled}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setUsdPrice(Number(e.target.value) * Number(token.usdValue));
              }}
              min={0}
              max={microAmountToAmount(token)}
              type="number"
              placeholder="0.00"
            />
          )}
          {!isStakeToken && (
            <Typography
              sx={{
                color: theme.palette.textNormal,
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "120%",
              }}
            >
              {loading ? (
                <Skeleton variant="text" width={60} />
              ) : (
                "$" + usdPrice
              )}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export { TokenBox };

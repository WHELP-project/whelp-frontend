import { Box, Button, Grid, Input, Typography } from "@mui/material";
import React from "react";
import theme from "../../Theme";

interface Token {
  name: string;
  icon: string;
  usdValue: number;
  amount: number;
  category: string;
}

interface TokenBoxProps {
  token: Token;
  onChange: (value: string) => void;
  value: string | undefined;
  disabled?: boolean;
}

const AssetButton = ({
  token,
  onClick,
  hideDropdownButton = false,
}: {
  token: Token;
  onClick?: () => void;
  hideDropdownButton?: boolean;
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        fontSize: "14px",
        padding: "4px",
        borderRadius: "8px",
        background: hideDropdownButton
          ? "none"
          : "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.03) 100%)",
        display: "inline-flex",
        color: "white",
        "&:hover": {
          background: hideDropdownButton ? "none" : "rgba(226, 87, 28, 0.08)",
        },
        cursor: hideDropdownButton ? "auto" : "pointer",
        pointerEvents: hideDropdownButton ? "none" : "auto",
      }}
    >
      <Box
        component={"img"}
        src={token.icon}
        sx={{
          maxWidth: "24px",
          marginRight: "8px",
        }}
      />
      {token.name}
      <Box
        component={"img"}
        src="/CaretDown.svg"
        sx={{
          display: hideDropdownButton ? "none" : "block",
        }}
      />
    </Button>
  );
};

const TokenBox = ({
  token,
  onChange,
  value,
  disabled = false,
}: TokenBoxProps) => {
  const [tokenAmount, setTokenAmount] = React.useState(
    Number(value) || 0.00
  );

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
              maxWidth: "40px"
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
              USDT
            </Typography>
            <Typography
              sx={{
                color: theme.palette.textNormal,
                fontSize: "14px",
              }}
            >
              Available {token.amount}
            </Typography>
          </Box>
          <Button
            onClick={() => {
              onChange(token.amount.toString());
              setTokenAmount(token.amount);
              setUsdPrice(token.amount * token.usdValue);
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
              cursor: "pointer"
            }}
          >
            Max
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "column",
          }}
        >
          <Input
            disabled={disabled}
            value={tokenAmount}
            onChange={(e) => {
              onChange(e.target.value);
              setTokenAmount(Number(e.target.value));
              setUsdPrice(Number(e.target.value) * Number(token.usdValue));
            }}
            inputProps={{
              min: 0,
              max: token.amount,
              style: {
                textAlign: "right",
                padding: 0,
              },
            }}
            type="number"
            placeholder="0.00"
            sx={{
              width: "100%",
              color: "#FFF",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "120%",
              "&:before": {
                content: "none",
              },
              "&:after": {
                content: "none",
              },
              "&:focus-within fieldset, &:focus-visible fieldset": {
                color: "white!important",
              },
              "& input[type=number]": {
                "-moz-appearance": "textfield",
              },
              "& input[type=number]::-webkit-outer-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
              overflowX: "auto", // Enable horizontal scrolling
              whiteSpace: "nowrap",
            }}
          />
          <Typography
            sx={{
              color: theme.palette.textNormal,
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "120%",
            }}
          >
            ${usdPrice}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export { TokenBox };

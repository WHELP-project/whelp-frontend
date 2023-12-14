import {
  Box,
  Divider,
  IconButton,
  Input,
  Skeleton,
  Typography,
} from "@mui/material";
import { UiTypes } from "@whelp/types";
import React from "react";
import theme from "../Theme";
import { AssetSelector } from "./AssetSelector";
import { Button } from "../Button";
import { SlippagePopup } from "./SlippagePopup";
import { SwapVert } from "@mui/icons-material";

const SwapContainer = (props: UiTypes.SwapContainerProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <SlippagePopup
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        setSlippageTolerance={props.setSlippageTolerance}
        slippageTolerance={props.slippageTolerance}
      />
      <Box
        sx={{
          background: theme.palette.bgPrimary,
          maxWidth: "32rem",
        }}
      >
        <Box
          sx={{
            padding: "2rem",
            borderRadius: "1.5rem",
            border: `1px solid ${theme.palette.strokeSecondary}`,
            background: theme.palette.bgAlpha0,
            backdropFilter: "blur(20px)",
            maxWidth: "32rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
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
              Swap Tokens
            </Typography>
            <IconButton onClick={handleClick}>
              <Box component="img" src="/images/wheel.svg" />
            </IconButton>
          </Box>
          <Divider
            sx={{ my: "1.5rem", background: theme.palette.strokePrimary }}
          />
          <Box
            sx={{
              display: "flex",
              padding: "1.5rem 1rem",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.5rem",
              borderRadius: "1rem",
              border: `1px solid ${theme.palette.strokePrimary}`,
              background: theme.palette.bgAlpha0,
            }}
          >
            <Typography
              sx={{
                color: theme.palette.textLoud,
                fontFamily: "Inter",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "1.25rem",
              }}
            >
              From
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "25rem",
                padding: "0.25rem 1rem 0.25rem 0.25rem",
                alignItems: "center",
                gap: "1.5rem",
                borderRadius: "0.75rem",
                border: `1px solid ${theme.palette.strokePrimary}`,
                background: theme.palette.bgAlpha0,
              }}
            >
              <AssetSelector
                selectedToken={props.from_token}
                tokens={props.tokens.filter(
                  (token) => token.name !== props.to_token.name
                )}
                onSelect={props.onFromTokenChange}
              />
              <Input
                disabled={false}
                value={props.from_amount}
                onChange={(e) => {
                  props.onFromAmountChange(Number(e.target.value));
                }}
                inputProps={{
                  min: 0,
                  max: props.from_token.balance,
                  style: {
                    textAlign: "right",
                    padding: 0,
                  },
                }}
                type="number"
                placeholder="0.00"
                sx={{
                  width: "100%",
                  color: theme.palette.textNormal,
                  textAlign: "right",
                  fontSize: "1.5rem",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "1.75rem",
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
            </Box>
            <Box sx={{ textAlign: "end", width: "100%", px: "1rem" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: theme.palette.textNormal,
                    fontSize: "14px",
                  }}
                >
                  Available:
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.textLoud,
                    fontSize: "16px",
                    ml: "0.5rem",
                  }}
                >
                  {props.maxFromAmount}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              onClick={props.switchTokens}
              sx={{
                my: "-2rem",
                display: "flex",
                maxWidth: "80%",
                padding: "1rem",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "0.5rem",
                borderRadius: "1rem",
                border: `1px solid ${theme.palette.strokePrimary}`,
                background: theme.palette.bgAlpha100,
                "&:hover": {
                  background: theme.palette.bgAlpha200,
                  cursor: "pointer",
                },
              }}
            >
              <SwapVert sx={{ height: 24, width: 24 }} />
            </Box>
          </Box>

          <Box
            sx={{
              mt: "1rem",
              display: "flex",
              padding: "1.5rem 1rem",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.5rem",
              borderRadius: "1rem",
              border: `1px solid ${theme.palette.strokePrimary}`,
              background: theme.palette.bgAlpha0,
            }}
          >
            <Typography
              sx={{
                color: theme.palette.textLoud,
                fontFamily: "Inter",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "1.25rem",
              }}
            >
              To
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "25rem",
                padding: "0.25rem 1rem 0.25rem 0.25rem",
                alignItems: "center",
                gap: "1.5rem",
                borderRadius: "0.75rem",
                border: `1px solid ${theme.palette.strokePrimary}`,
                background: theme.palette.bgAlpha0,
              }}
            >
              <AssetSelector
                selectedToken={props.to_token}
                tokens={props.tokens.filter(
                  (token) => token.name !== props.from_token.name
                )}
                onSelect={props.onToTokenChange}
              />
              {props.simulateLoading ? (
                <Skeleton variant="text" width="100%" height="2rem" />
              ) : (
                <Input
                  disabled={true}
                  value={props.to_amount}
                  onChange={(e) => {
                    props.onToAmountChange(Number(e.target.value));
                  }}
                  inputProps={{
                    min: 0,
                    max: props.from_token.balance,
                    style: {
                      textAlign: "right",
                      padding: 0,
                    },
                  }}
                  type="number"
                  placeholder="0.00"
                  sx={{
                    width: "100%",
                    color: theme.palette.textNormal, // Assuming textNormal is defined in your theme
                    textAlign: "right",
                    fontSize: "1.5rem",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "1.75rem",
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
              )}
            </Box>
          </Box>
          <Button
            onClick={props.onSwap}
            sx={{ mt: "1rem" }}
            type="primary"
            label="Swap"
            fullWidth
            loading={props.swapLoading}
            disabled={
              props.maxFromAmount < props.from_amount ||
              props.from_amount === 0 ||
              props.to_amount === 0
            }
          />
        </Box>
      </Box>
    </>
  );
};

export { SwapContainer };

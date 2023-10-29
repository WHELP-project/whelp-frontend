import React from "react";
import {
  Box,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Typography,
} from "@mui/material";
import theme from "../Theme";

const ConnectWalletButton = ({ ...props }: { onClick: () => void }) => {
  const styles = {
    display: "flex",
    padding: "0.5rem 1rem",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: "0.625rem",
    border: `1px solid ${theme.palette.strokePrimary}`,
    background: theme.palette.primaryBtnBg,
    "&:hover": {
      background: theme.palette.primaryBtnBgHover,
    },
    textTransform: "none",
  };

  return (
    <MuiButton
      onClick={props.onClick}
      sx={{
        ...styles,
      }}
    >
      <Box component="img" alt="Wallet" src="/images/wallet.svg" />
      <Typography
        sx={{
          color: theme.palette.textBlack,
          fontSize: "1rem",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "1.5rem",
        }}
      >
        Connect Wallet
      </Typography>
    </MuiButton>
  );
};

export { ConnectWalletButton };

import React from "react";
import theme from "../Theme";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import { Button } from "../Button";
import { ConnectWalletButton } from "../ConnectWalletButton";

interface AppBarProps {
  title: string;
  connectWallet?: () => void;
  disconnectWallet?: () => void;
  isConnected?: boolean;
  walletAddress?: string;
  walletIcon?: string;
}

const AppBar = ({ ...props }: AppBarProps) => {
  const styles = {
    display: "flex",
    height: "4.5rem",
    width: "100%",
    padding: "1rem 2rem",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "62.8125rem",
    borderBottom: `1px solid ${theme.palette.strokePrimary}`,
  };
  return (
    <Box sx={styles}>
      <Typography
        sx={{
          color: theme.palette.textLoud,
          fontSize: "1.5rem",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "2rem",
        }}
      >
        {props.title}
      </Typography>
      {!props.isConnected ? (
        <ConnectWalletButton onClick={props.connectWallet} />
      ) : (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Tooltip sx={{ pointer: "cursor" }} title="Click to copy">
            <Box
              onClick={() => navigator.clipboard.writeText(props.walletAddress)}
              sx={{
                display: "flex",
                height: "2.5rem",
                padding: "0.625rem 1rem",
                alignItems: "center",
                gap: "0.5rem",
                borderRadius: "0.75rem",
                border: `1px solid ${theme.palette.strokePrimary}}`,
                background: theme.palette.bgAlpha25,
                pointer: "cursor",
              }}
            >
              {props.walletAddress.slice(0, 6)}...
              {props.walletAddress.slice(-4)}
            </Box>
          </Tooltip>
          <Tooltip title="Click to disconnect">
            <Avatar onClick={props.disconnectWallet} src={props.walletIcon} />
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export { AppBar };

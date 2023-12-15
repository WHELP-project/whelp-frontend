import React from "react";
import {
  Avatar,
  Box,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { MenuButton } from "./MenuButton";
import { UiTypes } from "@whelp/types";

const AppBar = ({ ...props }: UiTypes.AppBarProps) => {
  const theme = useTheme();
  const largerThenMd = useMediaQuery(theme.breakpoints.up("md"));

  const styles = {
    display: "flex",
    height: "4.5rem",
    width: "100%",
    padding: "1rem 2rem",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.strokePrimary}`,
  };
  return (
    <Box sx={styles}>
      {largerThenMd ? (
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
      ) : (
        <Box component="img" alt="Logo" src="/images/main-logo.svg" />
      )}
      {largerThenMd && (
        <>
          {!props.isConnected ? (
            <ConnectWalletButton onClick={props.connectWallet} />
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Tooltip sx={{ pointer: "cursor" }} title="Click to copy">
                <Box
                  onClick={() =>
                    navigator.clipboard.writeText(props.walletAddress)
                  }
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
                <Avatar
                  onClick={props.disconnectWallet}
                  src={props.walletIcon}
                />
              </Tooltip>
            </Box>
          )}
        </>
      )}
      {!largerThenMd && (
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <MenuButton
            isOpen={props.mobileNavOpen}
            onClick={() => props.toggleMobileNav(!props.mobileNavOpen)}
            color="white"
            strokeWidth="1"
            transition={{ ease: "easeOut", duration: 0.2 }}
            width="20"
            height="8"
          />
        </Box>
      )}
    </Box>
  );
};

export { AppBar };

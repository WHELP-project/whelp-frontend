"use client";

import React from "react";
import theme from "../Theme";
import {
  Avatar,
  Box,
  Divider,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { UiTypes } from "@whelp/types";
import { ConnectWalletButton } from "../ConnectWalletButton";

const NavLink = ({ ...props }: UiTypes.Menu) => (
  <Box
    onClick={props.onClick}
    sx={
      !props.active
        ? {
            display: "flex",
            padding: "0.5rem 0.75rem",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            alignSelf: "stretch",
            borderRadius: "1rem",
            cursor: "pointer",
          }
        : {
            display: "flex",
            padding: "0.5rem 0.75rem",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            alignSelf: "stretch",
            borderRadius: "1rem",
            border: `1px solid ${theme.palette.strokePrimary}`,
            background: theme.palette.bgAlphaHover,
            cursor: "pointer",
          }
    }
  >
    <Box
      component="img"
      alt={props.label}
      src={props.active ? props.iconActive : props.icon}
    />
    <Typography
      sx={{
        color: props.active ? theme.palette.textLoud : theme.palette.textNormal,
        fontSize: "0.75rem",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "1rem", // 133.333%
      }}
    >
      {props.label}
    </Typography>
  </Box>
);
const MobileNav = ({ ...props }: UiTypes.MobileNavProps) => {
  const theme = useTheme();
  const largerThenMd = useMediaQuery(theme.breakpoints.up("md"));

  const styles = {
    display: largerThenMd || !props.isOpen ? "none" : "block",
    position: "absolute",
    width: "100%",
    background: theme.palette.bgAlpha0,
    top: "72px",
    backdropFilter: "blur(20px)",
    zIndex: 6,
  };

  return (
    <>
      <Box
        sx={{
          height: "calc(100vh - 72px)",
          width: "100vw",
          position: "fixed",
          top: "72px",
          left: 0,
          background: theme.palette.bgSecondary,
          opacity: 0.76,
          zIndex: 5,
          display: !props.isOpen ? "none" : "block",
        }}
        onClick={props.onClose}
      />
      <Box sx={styles}>
        <Box
          sx={{
            display: "flex",
            padding: "1.5rem 1.3125rem",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1.5rem",
          }}
        >
          {props.menu.map((item, index) => (
            <NavLink key={index} {...item} />
          ))}
        </Box>
        <Divider />
        {!props.isConnected ? (
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "center", py: 2 }}
          >
            <ConnectWalletButton onClick={props.connectWallet} />
          </Box>
        ) : (
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "center", py: 2 }}
          >
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
              <Avatar onClick={props.disconnectWallet} src={props.walletIcon} />
            </Tooltip>
          </Box>
        )}
      </Box>
    </>
  );
};

export { MobileNav };

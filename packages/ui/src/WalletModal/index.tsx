"use client";

import React from "react";
import { WalletTypes } from "@whelp/types";
import theme from "../Theme";
import { Avatar, Box, Modal, Typography } from "@mui/material";
import { Remove } from "react-huge-icons/solid";

interface WalletModalProps {
  wallets: {
    type: WalletTypes.WalletTypes;
    name: string;
    icon: string;
    onClick: () => void;
  }[];
  open: boolean;
  onClose: () => void;
}

const WalletModal = ({ ...props }: WalletModalProps) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    borderRadius: "1.5rem",
    border: `1px solid ${theme.palette.strokePrimary}`,
    background: theme.palette.bgSecondary,
    boxShadow: "0px 6px 40px -8px rgba(10, 11, 15, 0.60)",
    backdropFilter: "blur(20px)",
  };

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="Wallet-Connect-Modal"
      aria-describedby="Connect your wallet to Whelp"
    >
      <Box sx={style}>
        <Box
          sx={{
            p: "1.5rem 2rem",
            borderBottom: `1px solid ${theme.palette.strokePrimary}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.125rem",
              fontWeight: 500,
              lineHeight: "1.75rem",
              color: theme.palette.textLoud,
            }}
          >
            Connect Modal
          </Typography>
          <Remove
            style={{ fontSize: "1.25rem", cursor: "pointer" }}
            onClick={props.onClose}
          />
        </Box>
        <Box
          sx={{
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1.5rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 400,
              color: theme.palette.textLoud,
              lineHeight: "1.5rem",
            }}
          >
            Start by connecting your wallet
          </Typography>
          {props.wallets.map((wallet) => (
            <Box
              sx={{
                display: "flex",
                padding: "1rem",
                alignItems: "center",
                gap: "1rem",
                borderRadius: "0.75rem",
                border: `1px solid ${theme.palette.strokePrimary}`,
                background: theme.palette.bgAlpha25,
                width: "100%",
                cursor: "pointer",
                "&:hover": {
                  background: theme.palette.bgAlpha100,
                },
              }}
              onClick={wallet.onClick}
            >
              <Avatar alt={wallet.name} src={wallet.icon} />
              <Typography>{wallet.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export { WalletModal };

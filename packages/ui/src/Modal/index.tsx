"use client";

import React from "react";
import { UiTypes } from "@whelp/types";
import theme from "../Theme";
import { Avatar, Box, Modal as MuiModal, Typography } from "@mui/material";
import { Remove } from "react-huge-icons/solid";

const Modal = ({ ...props }: UiTypes.ModalProps) => {
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
    <MuiModal
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
            {props.title}
          </Typography>
          <Remove
            style={{ fontSize: "1.25rem", cursor: "pointer" }}
            onClick={props.onClose}
          />
        </Box>
        <Box
          sx={{
            padding: "1.5rem 2rem",
          }}
        >
          {props.children}
        </Box>
      </Box>
    </MuiModal>
  );
};

export { Modal };

"use client";

import React from "react";
import { UiTypes } from "@whelp/types";
import theme from "../Theme";
import { Avatar, Box, Grid, Modal, Typography } from "@mui/material";
import { Remove } from "react-huge-icons/solid";
import { Button, palette } from "..";
import {
  ClaimSuccess,
  ProvideLiquiditySuccess,
  StakeLpSuccess,
  SwapSuccess,
  UnStakeLpSuccess,
  WithdrawLiquiditySuccess,
} from "./success";

const SuccessContent = ({ ...props }: UiTypes.StatusModalProps) => {
  return (
    <Box
      sx={{
        padding: "0 2rem 2rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <Box component="img" alt="success icon" src="/images/success.png" />
      {props.txType === "addLiquidity" && (
        <ProvideLiquiditySuccess {...props} />
      )}
      {props.txType === "withdrawLiquidity" && (
        <WithdrawLiquiditySuccess {...props} />
      )}
      {props.txType === "unstakeLp" && <UnStakeLpSuccess {...props} />}
      {props.txType === "stakeLp" && <StakeLpSuccess {...props} />}
      {props.txType === "swap" && <SwapSuccess {...props} />}
      {props.txType === "claim" && <ClaimSuccess {...props} />}
      <Button
        onClick={props.onClose}
        fullWidth={true}
        label="Transaction Details"
      />
    </Box>
  );
};

const ErrorContent = ({ ...props }: UiTypes.StatusModalProps) => {
  return (
    <Box
      sx={{
        padding: "0 2rem 2rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <Box component="img" alt="error icon" src="/images/error.png" />
      <Typography
        sx={{
          color: palette.textLoud,
          fontSize: "2rem",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "2.5rem",
        }}
      >
        Transaction Unsuccessful
      </Typography>
      <Button onClick={props.onClose} label="Go Back" />
    </Box>
  );
};

const StatusModal = ({ ...props }: UiTypes.StatusModalProps) => {
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
        <Box sx={{ display: "flex", justifyContent: "end", padding: "1rem" }}>
          <Remove
            style={{ fontSize: "1.25rem", cursor: "pointer" }}
            onClick={props.onClose}
          />
        </Box>
        {props.status === "success" ? (
          <SuccessContent {...props} />
        ) : (
          <ErrorContent {...props} />
        )}
      </Box>
    </Modal>
  );
};

export { StatusModal };

"use client";

import React from "react";
import { UiTypes } from "@whelp/types";
import theme from "../Theme";
import { Avatar, Box, Grid, Modal, Typography } from "@mui/material";
import { Remove } from "react-huge-icons/solid";
import { Button, palette } from "..";

const ProvideLiquiditySuccess = ({ ...props }: UiTypes.StatusModalProps) => (
  <>
    <Typography
      sx={{
        color: palette.textLoud,
        fontSize: "2rem",
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "2.5rem",
      }}
    >
      Successfully Provided
    </Typography>
    <Grid container>
      {props.tokens.map((token, index) => (
        <Grid item key={index} xs={6}>
          <Box
            sx={{
              display: "flex",
              padding: "0.75rem",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.5rem",
              flex: "1 0 0",
              borderRadius: "1rem",
              border: `1px solid ${palette.strokePrimary}`,
              background: palette.bgAlpha0,
            }}
          >
            <Typography
              sx={{
                alignSelf: "stretch",
                color: palette.textLoud,
                fontFamily: "Inter",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "1.25rem", // 142.857%
              }}
            >
              {token.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Avatar sx={{ height: "2rem", width: "2rem" }} src={token.icon} />
              <Typography
                sx={{
                  display: "-webkit-box",
                  width: "6.25rem",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  overflow: "hidden",
                  color: palette.textMuted,
                  textOverflow: "ellipsis",
                  fontFamily: "Inter",
                  fontSize: "1rem",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "1.5rem",
                }}
              >
                {token.balance}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  </>
);

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

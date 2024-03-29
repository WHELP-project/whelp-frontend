"use client";

import React from "react";
import { Box, Input, Modal, Typography } from "@mui/material";
import { Button } from "../..";
import { Remove } from "react-huge-icons/solid";
import { UiTypes } from "@whelp/types";
import theme from "../../Theme";

const UnstakeModal = ({ ...props }: UiTypes.UnstakeModalProps) => {
  const style = {
    position: "absolute",
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

  const boxStyle = {
    flex: "1",
    display: "flex",
    padding: "0.8rem",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "0.5rem",
    borderRadius: "1rem",
    border: `1px solid ${theme.palette.strokePrimary}`,
    background: theme.palette.bgAlpha0,
  };

  const boxLabelStyle = {
    color: theme.palette.textLoud,
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "1.25rem",
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
        <Box
          sx={{
            padding: "0 2rem 2rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
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
            Unstake
          </Typography>
          <Box sx={{ ...boxStyle, width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography sx={boxLabelStyle}>Select Amount</Typography>
              <Typography
                sx={{
                  color: theme.palette.textLoud,
                  fontFamily: "Inter",
                  fontSize: "0.875rem",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "1.25rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  props.onAmountChange(props.availableAmount.toString());
                }}
              >
                Available:{" "}
                {props.availableAmount}
              </Typography>
            </Box>
            <Input
              disabled={false}
              value={props.amount}
              onChange={(e) => {
                props.onAmountChange(e.target.value);
              }}
              inputProps={{
                min: 0,
                max: props.availableAmount,
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

          <Button
            sx={{ width: "100%" }}
            label="Unstake"
            onClick={props.onClick}
            disabled={props.disabled}
            loading={props.loading}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export { UnstakeModal };

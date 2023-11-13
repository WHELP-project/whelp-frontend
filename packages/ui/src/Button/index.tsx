import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { UiTypes } from "@whelp/types";
import theme from "../Theme";

const Button = ({
  type = "primary",
  size = "medium",
  label,
  ...props
}: UiTypes.ButtonProps) => {
  const styles = {
    fontWeight: 500,
    borderRadius: "12px",
    minWidth: "0",
    border: `1px solid ${
      type === "primary"
        ? theme.palette.strokePrimary
        : theme.palette.strokeSecondary
    }`,
    background: `${
      type === "primary"
        ? theme.palette.primaryBtnBg
        : theme.palette.secondaryBtnBg
    }`,
    color: `${
      type === "primary" ? theme.palette.textBlack : theme.palette.textWhite
    }`,
    padding: label
      ? size == "medium"
        ? "0.563rem 1.5rem"
        : "0.313rem 1rem"
      : size == "medium"
      ? "0.69rem 0.813rem"
      : "0.313rem 0.313rem",
    "&:hover": {
      background: `${
        type === "primary"
          ? theme.palette.primaryBtnBgHover
          : theme.palette.secondaryBtnBgHover
      }`,
    },
    "& .MuiButton-startIcon": {
      width: "24px",
      height: "24px",
      marginRight: label ? "0.5rem" : "0",
    },
  };
  const { sx, ...otherProps } = props;

  return (
    <MuiButton
      size={size}
      disabled={props.disabled}
      //  @ts-ignore
      sx={{
        ...styles,
        ...props.sx,
      }}
      {...otherProps}
    >
      {label}
    </MuiButton>
  );
};

export { Button };

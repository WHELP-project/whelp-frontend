import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { Modify } from "../helpers";
import theme from "../Theme";

interface ButtonProps
  extends Modify<
    MuiButtonProps,
    {
      type?: "primary" | "secondary";
      size?: "medium" | "small";
      label: string;
      iconBefore?: string;
      iconAfter?: string;
    }
  > {}

const Button = ({
  type = "primary",
  size = "medium",
  label,
  ...props
}: ButtonProps) => {
  const styles = {
    fontWeight: 500,
    borderRadius: "12px",
    border: `1px solid ${type === "primary" ? theme.palette.strokePrimary : theme.palette.strokeSecondary}`,
    background: `${type === "primary" ? theme.palette.primaryBtnBg : theme.palette.secondaryBtnBg}`,
    color: `${type === "primary" ? theme.palette.textBlack : theme.palette.textWhite}`,
    padding: size == "medium" ? "0.563rem 1.5rem" : "0.313rem 1rem",
    "&:hover": {
      background: `${type === "primary" ? theme.palette.primaryBtnBgHover : theme.palette.secondaryBtnBgHover}`,
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
      {props.children || label}
    </MuiButton>
  );
};

export { Button };

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
    }
  > {}

const Button = ({
  type = "primary",
  size = "medium",
  label,
  ...props
}: ButtonProps) => {
  const styles = {
    borderRadius: "0.75rem",
    border: `1px solid ${theme.palette.strokePrimary}`,
    background: `${theme.palette.primaryBtnBg}`,
    color: `${theme.palette.textBlack}`,
    padding: "0.75rem 1.5rem",
    "&:hover": {
      background: `${theme.palette.primaryBtnBgHover}`,
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

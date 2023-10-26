import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { Modify } from "../helpers";

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

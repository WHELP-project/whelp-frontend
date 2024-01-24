import { UiTypes } from "@whelp/types";
import { Input as MuiInput } from "@mui/material";
import React from "react";

const Input = (props: UiTypes.InputProps) => {
  return (
    <MuiInput
      disabled={props.disabled}
      value={props.value}
      onChange={props.onChange}
      inputProps={{
        min: props.type === "number" ? props.min : undefined,
        max: props.type === "number" ?props.max.toString() : undefined,
        style: {
          textAlign: "right",
          padding: 0,
        },
      }}
      type={props.type ? props.type : "text"}
      placeholder="0.00"
      sx={{
        width: "100%",
        color: "#FFF",
        fontSize: "20px",
        fontWeight: 500,
        lineHeight: "120%",
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
  );
};

export { Input };

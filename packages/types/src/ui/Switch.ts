import { SwitchProps as MuiSwitchProps } from "@mui/material";

export interface SwitchProps extends MuiSwitchProps {
  checked: boolean;
  handleChange: (checked: boolean) => void;
  size?: "small" | "medium";
}

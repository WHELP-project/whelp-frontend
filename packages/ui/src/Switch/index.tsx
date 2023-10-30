import { Switch as MuiSwitch } from "@mui/material";
import { UiTypes } from "@whelp/types";

const Switch = ({ 
  checked = false, 
  handleChange, 
  size = "medium",
  ...props 
}: UiTypes.SwitchProps) => {
  return (
    <MuiSwitch
      onClick={() => handleChange(!checked)}
      checked={checked}
      {...props}
      sx={{
        width: size == "medium" ? 56 : 48,
        height: size == "medium" ? 32: 24,
        borderRadius: "999px",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: "2px !important",
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(23px)',
            color: '#44CA83',
            '& + .MuiSwitch-track': {
              background: "linear-gradient(180deg, rgba(9, 11, 14, 0.00) 0%, rgba(68, 202, 131, 0.20) 100%), rgba(255, 255, 255, 0.04)",
              opacity: 1,
              border: "1px solid #44CA83",
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color: "rgba(255, 255, 255, 0.20)"
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.3,
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          margin: "1px !important",
          width: size == "medium" ? 24 : 16,
          height: size == "medium" ? 24: 16,
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: '#39393D',
          opacity: 1,
        },
      }}
    />
  );
};

export { Switch };

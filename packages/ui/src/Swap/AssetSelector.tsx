import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import theme from "../Theme";
import { UiTypes } from "@whelp/types";

const AssetSelector = (props: UiTypes.AssetSelectorProps) => {
  return (
    <FormControl fullWidth>
      <Select
        sx={{
          display: "flex",
          width: "12.25rem",
          alignItems: "center",
          gap: "0.75rem",
          flexShrink: 0,
          borderRadius: "0.625rem",
          border: `1px solid ${theme.palette.strokePrimary}`,
          background: theme.palette.bgAlpha25,
          backdropFilter: "blur(20px)",
          color: theme.palette.textMuted,
          textOverflow: "ellipsis",
          fontFamily: "Inter",
          fontSize: "1rem",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "1.5rem",
          "& .MuiSelect-select": {
            padding: "0.25rem 0.5rem",
          },
        }}
        value={props.selectedToken.name}
        onChange={(e) => {
          const value = e.target.value;
          const token = props.tokens.find((token) => token.name === value);
          if (token) {
            props.onSelect(token);
          }
        }}
        MenuProps={{
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          sx: {
            "& .MuiMenu-paper": {
              display: "flex",
              padding: "0.25rem 0rem",
              flexDirection: "column",
              alignItems: "flex-start",
              position: "absolute",
              left: "8rem",
              top: "-2.5rem",
              borderRadius: "1rem",
              background: theme.palette.bgAlpha25,
              backdropFilter: "blur(20px)",
            },
            "&& .Mui-selected": {
              background: theme.palette.bgAlpha200,
            },
            "&& .MuiMenuItem-root:hover": {
              background: theme.palette.bgAlpha100,
            },
          },
        }}
        label=""
        id="sort-table"
      >
        {props.tokens.map((token, index) => (
          <MenuItem key={index} value={token.name}>
            <Box
              sx={{
                display: "flex",
                width: "15rem",
                padding: "0.5rem 0.75rem",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <img
                style={{
                  marginRight: "8px",
                  height: "2rem",
                  width: "2rem",
                }}
                src={token.icon}
                alt="Magnifying Glass"
              />
              <Typography
                sx={{
                  color: theme.palette.textLoud,
                  fontSize: "0.875rem",
                  fontWeight: 400,
                }}
              >
                {token.name}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { AssetSelector };

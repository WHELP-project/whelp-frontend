"use client";

import React from "react";
import theme from "../Theme";
import { Box, Typography } from "@mui/material";
import { UiTypes } from "@whelp/types";

const NavLink = ({ ...props }: UiTypes.Menu) => (
  <Box
    onClick={props.onClick}
    sx={
      !props.active
        ? {
            display: "flex",
            padding: "1rem 0.75rem",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            borderRadius: "1rem",
            cursor: "pointer",
            "&:hover": {
              background: theme.palette.bgAlphaHover,
            },
            width: "4.5rem",
          }
        : {
            display: "flex",
            padding: "1rem 0.75rem",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            borderRadius: "1rem",
            cursor: "pointer",
            border: `1px solid ${theme.palette.strokePrimary}`,
            background: theme.palette.bgAlphaHover,
            width: "4.5rem",
          }
    }
  >
    <Box
      component="img"
      alt={props.label}
      src={props.active ? props.iconActive : props.icon}
    />
    <Typography
      sx={{
        color: props.active ? theme.palette.textLoud : theme.palette.textNormal,
        fontSize: "0.75rem",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "1rem", // 133.333%
      }}
    >
      {props.label}
    </Typography>
  </Box>
);
const Navigation = ({ ...props }: UiTypes.NavigationProps) => {
  const styles = {
    display: "flex",
    width: "6rem",
    padding: "0.5rem 0.75rem",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    alignSelf: "stretch",
    minHeight: "100vh",
    borderRight: `1px solid ${theme.palette.strokePrimary}`,
  };

  return (
    <Box sx={styles}>
      <Box
        sx={{
          pt: "0.56rem",
          pb: "1.5rem",
          borderBottom: `1px solid ${theme.palette.strokePrimary}`,
        }}
      >
        <Box component="img" alt="Logo" src="/images/main-logo.svg" />
      </Box>
      {props.menu.map((item, index) => (
        <NavLink key={index} {...item} />
      ))}
    </Box>
  );
};

export { Navigation };

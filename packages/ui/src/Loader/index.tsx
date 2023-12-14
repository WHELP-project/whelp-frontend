import { Box } from "@mui/material";
import React from "react";

interface LoaderProps {
  variant: 1 | 2 | 3;
}
const LoaderVideo = ({ ...props }: LoaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        autoPlay
        muted
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <source
          src={`/loaders/loader_${props.variant}.webm`}
          type="video/webm"
        />
      </video>
    </Box>
  );
};

export { LoaderVideo };

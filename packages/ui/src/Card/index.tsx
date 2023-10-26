import React from "react";
import theme from "../Theme";
import { Box, Grid, Typography } from "@mui/material";

interface CardProps {
  title: string;
  content: React.ReactElement;
  warning?: boolean;
  warningText?: string;
  percentage?: number;
  percentageText?: string;
}

const Card = (props: CardProps) => {
  const styles = {
    WrapperStyles: {
      display: "flex",
      padding: "1.5rem",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "1.5rem",
      borderRadius: "1rem",
      border: `1px solid ${theme.palette.strokePrimary}`,
      background: `${theme.palette.bgAlpha25}`,
      position: "relative",
    },
    TitleStyles: {
      color: `${theme.palette.textNormal}`,
      fontSize: "0.75rem",
      fontWeight: 600,
      lineHeight: "1rem",
      textTransform: "uppercase",
    },
    WarningStyles: {
      position: "absolute",
      right: 0,
      top: 0,
      display: "flex",
      padding: "0.125rem 0.75rem",
      alignItems: "center",
      gap: "0.25rem",
      background: "#FFF171",
      borderRadius: "0rem 0.5rem 0rem 0.5rem",
      color: theme.palette.textBlack,
    },
    LabelStyles: {
      background: theme.palette.purple.base,
      display: "flex",
      alignItems: "center",
      padding: "0.125rem 0.5rem",
      borderRadius: "62.4375rem",
      justifyContent: "center",
    },
  };

  return (
    <Box sx={styles.WrapperStyles}>
      {props.warning && (
        <Box sx={styles.WarningStyles}>{props.warningText}</Box>
      )}
      <Typography sx={styles.TitleStyles}>{props.title}</Typography>
      <Grid container>
        <Grid item xs={9}>
          {props.content}
        </Grid>
        <Grid item xs={3}>
          <Box sx={styles.LabelStyles}>
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {props.percentage}%
            </Typography>
          </Box>
          <Typography
            sx={{ fontSize: "0.875rem", fontWeight: 600, textAlign: "center" }}
          >
            {props.percentageText}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export { Card };

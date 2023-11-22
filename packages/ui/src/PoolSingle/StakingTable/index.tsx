import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { UiTypes } from "@whelp/types";
import theme from "../../Theme";

const StakingTableEmpty = () => (
  <>
    <Box
      sx={{
        display: "flex",
        padding: "1.5rem",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.5rem",
        alignSelf: "stretch",
        borderRadius: "1rem",
        border: `1px solid ${theme.palette.strokePrimary}`,
        background:
          "linear-gradient(180deg, #0A0F10 0%, rgba(10, 15, 16, 0.00) 100%)",
        backdropFilter: "blur(2px)",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        alt="Background img"
        src="/images/bg-grid-illustration.png"
        sx={{
          position: "absolute",
          height: "19rem",
          width: "100%",
          top: "-3rem",
          zIndex: -1,
        }}
      />
      <Box component="img" alt="Empty table" src="/images/empty-state.png" />
      <Typography
        sx={{
          fontSize: "1.125rem",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "1.75rem",
        }}
      >
        You have no assets staked.
      </Typography>
    </Box>
  </>
);

const HeadingStyles = {
  color: theme.palette.textNormal,
  fontSize: "0.75rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "1rem", // 133.333%
  letterSpacing: "0.03rem",
  textTransform: "uppercase",
};

const TableHead = () => (
  <Grid
    container
    columns={15}
    sx={{
      borderBottom: `1px solid ${theme.palette.strokePrimary}`,
      padding: "0.75rem 2rem",
    }}
  >
    <Grid item xs={3}>
      <Typography sx={HeadingStyles}>Asset</Typography>
    </Grid>
    <Grid item xs={3}>
      <Typography sx={{ ...HeadingStyles, textAlign: "center" }}>
        Apr
      </Typography>
    </Grid>
    <Grid item xs={3}>
      <Typography sx={{ ...HeadingStyles, textAlign: "center" }}>
        Lock Period
      </Typography>
    </Grid>
    <Grid item xs={3}>
      <Typography sx={{ ...HeadingStyles, textAlign: "end" }}>
        Amount
      </Typography>
    </Grid>
    <Grid item xs={3}>
      <Typography sx={{ ...HeadingStyles, textAlign: "end" }}>
        Manage
      </Typography>
    </Grid>
  </Grid>
);

const entryStyles = {
  color: theme.palette.textLoud,
  fontSize: "1rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "2.5rem", // 150%
};

const StakingTableEntry = ({
  entry,
  unstake,
}: {
  entry: UiTypes.StakingTableEntry;
  unstake: any;
}) => (
  <Grid
    container
    columns={15}
    sx={{
      borderBottom: `1px solid ${theme.palette.strokePrimary}`,
      padding: "1rem 2rem",
    }}
  >
    <Grid item xs={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar
          src={entry.lpToken.icon}
          sx={{ width: "2.5rem", height: "2.5rem" }}
        />
        <Typography sx={entryStyles}>{entry.lpToken.name}</Typography>
      </Box>
    </Grid>
    <Grid item xs={3}>
      <Typography sx={{ ...entryStyles, textAlign: "center" }}>
        {entry.APR} %
      </Typography>
    </Grid>
    <Grid item xs={3}>
      <Typography sx={{ ...entryStyles, textAlign: "center" }}>
        {Number(entry.lockedPeriod) / 60 / 24 / 60} Days
      </Typography>
    </Grid>
    <Grid item xs={3}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "end",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ ...entryStyles, lineHeight: "1.2rem" }}>
            {entry.lpToken.balance}
          </Typography>
          <Typography
            sx={{
              ...entryStyles,
              fontFamily: "Inter",
              fontSize: "0.875rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "1.25rem",
            }}
          >
            ${entry.lpToken.usdValue * entry.lpToken.balance}
          </Typography>
        </Box>
      </Box>
    </Grid>
    <Grid
      item
      xs={3}
      sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
    >
      <IconButton
        onClick={() =>
          unstake(
            entry.lpToken.balance.toString(),
            Number(entry.lockedPeriod)
          )
        }
      >
        <Box component="img" alt="iconbutton" src="/images/controlIcon.svg" />
      </IconButton>
    </Grid>
  </Grid>
);

const StakingTable = ({ entries, unstake }: UiTypes.StakingTableProps) => {
  if (entries.length === 0) {
    return <StakingTableEmpty />;
  }
  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Box
        sx={{
          width: { md: "100%", xs: "600px" },
          overflowX: { md: "hidden", xs: "scroll" },
          borderRadius: "1rem",
          border: `1px solid ${theme.palette.strokePrimary}`,
        }}
      >
        <TableHead />
        {entries.map((entry, index) => (
          <StakingTableEntry key={index} entry={entry} unstake={unstake} />
        ))}
      </Box>
    </Box>
  );
};

export { StakingTable };

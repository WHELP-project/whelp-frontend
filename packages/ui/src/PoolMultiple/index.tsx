import {
  Avatar,
  Box,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { UiTypes } from "@whelp/types";
import React, { useEffect, useState } from "react";
import theme from "../Theme";
import { Button } from "../Button";
import { ArrowDown, ArrowUp } from "react-huge-icons/solid";

const HeadingStyles = {
  color: theme.palette.textNormal,
  fontSize: "0.75rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "1rem", // 133.333%
  letterSpacing: "0.03rem",
  textTransform: "uppercase",
};

const entryStyles = {
  color: theme.palette.textLoud,
  fontSize: "1rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "2.5rem", // 150%
};

const TableHead = () => (
  <Grid
    container
    columns={15}
    sx={{
      borderBottom: `1px solid ${theme.palette.strokePrimary}`,
      padding: "0.75rem 2rem",
      width: { xs: "760px", md: "auto" },
    }}
  >
    <Grid item xs={5}>
      <Typography sx={HeadingStyles}>Pool</Typography>
    </Grid>
    <Grid item xs={3}>
      <Typography sx={{ ...HeadingStyles, textAlign: "center" }}>
        TVL
      </Typography>
    </Grid>
    <Grid item xs={3}>
      <Typography sx={{ ...HeadingStyles, textAlign: "center" }}>
        APR
      </Typography>
    </Grid>
    <Grid item xs={3}>
      <Typography sx={{ ...HeadingStyles, textAlign: "end" }}></Typography>
    </Grid>
  </Grid>
);

const PoolEntry = ({ entry }: { entry: UiTypes.Pool }) => {
  return (
    <Grid
      container
      columns={15}
      sx={{
        borderBottom: `1px solid ${theme.palette.strokePrimary}`,
        padding: "1rem 2rem",
        width: { xs: "760px", md: "auto" },
      }}
    >
      <Grid item xs={5}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src={entry.token_a.icon}
            sx={{ width: "2.5rem", height: "2.5rem" }}
          />
          <Avatar
            src={entry.token_b.icon}
            sx={{ ml: -2, width: "2.5rem", height: "2.5rem" }}
          />
          <Typography sx={entryStyles}>
            {entry.token_a.name} / {entry.token_b.name}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={{ ...entryStyles, textAlign: "center" }}>
          ${entry.tvl}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={{ ...entryStyles, textAlign: "center" }}>
          {entry.apr} %
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={{ ...entryStyles, textAlign: "center" }}>
          <Button type="secondary" size="small" label="Manage" />
        </Typography>
      </Grid>
    </Grid>
  );
};

const PoolMultiple = (params: UiTypes.PoolOverviewType) => {
  const [sortedEntries, setSortedEntries] = useState<UiTypes.Pool[]>(
    params.pools
  );
  const [sortBy, setSortBy] = useState<keyof UiTypes.Pool | undefined>(
    undefined
  );
  const [_sortBy, _setSortBy] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState<string>("");

  // Function to sort the pools
  const sortPools = (pools: UiTypes.Pool[]) => {
    return pools.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (sortDirection === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  };

  // Function to filter pools based on search term
  const filterPools = (pools: UiTypes.Pool[]) => {
    return pools.filter((pool) =>
      `${pool.token_a.name} / ${pool.token_b.name}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  };

  useEffect(() => {
    let updatedPools = [...params.pools];

    // Apply filtering
    if (search) {
      updatedPools = filterPools(updatedPools);
    }

    // Apply sorting
    updatedPools = sortPools(updatedPools);

    setSortedEntries(updatedPools);
  }, [params.pools, sortBy, sortDirection, search]);

  return (
    <>
      <Box
        sx={{
          display: { md: "flex", xs: "block" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: "1.5rem",
        }}
      >
        <Box sx={{ display: { md: "flex", xs: "block" } }}>
          <Box
            sx={{
              display: "flex",
              padding: "0rem 1rem",
              alignItems: "center",
              gap: "0.5rem",
              borderLeft: `1px solid ${theme.palette.textLoud}`,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "2rem",
                color: theme.palette.textLoud,
              }}
            >
              All Pools
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: { md: "flex", xs: "block" } }}>
          <Input
            placeholder="Search"
            fullWidth
            onChange={(e: any) => setSearch(e.target.value)}
            sx={{
              borderRadius: "0.625rem",
              border: `1px solid ${theme.palette.strokePrimary}`,
              background: theme.palette.bgAlpha25,
              padding: "0.5rem 1rem",
              lineHeight: "1.5rem",
              fontSize: "1rem",
              mr: "1rem",
              my: { xs: "1rem", md: 0 },
              color: theme.palette.textNormal,
              "&:before": {
                content: "none",
              },
              "&:after": {
                content: "none",
              },
            }}
            startAdornment={
              <img
                style={{
                  marginRight: "8px",
                  height: "1.5rem",
                  width: "1.5rem",
                }}
                src="/images/MagnifyingGlass.svg"
              />
            }
          />
          <FormControl fullWidth>
            <Select
              sx={{
                display: "flex",
                padding: "0.5rem 1rem",
                alignItems: "center",
                gap: "0.5rem",
                borderRadius: "0.625rem",
                border: `1px solid ${theme.palette.strokePrimary}`,
                background: theme.palette.bgAlpha25,
                cursor: "pointer",
                backdropFilter: "blur(20px)",
              }}
              value={_sortBy}
              onChange={(e) => {
                _setSortBy(e.target.value);
                switch (e.target.value) {
                  case "apr_asc":
                    setSortBy("apr");
                    setSortDirection("asc");
                    break;
                  case "apr_desc":
                    setSortBy("apr");
                    setSortDirection("desc");
                    break;
                  case "tvl_asc":
                    setSortBy("tvl");
                    setSortDirection("asc");
                    break;
                  case "tvl_desc":
                    setSortBy("tvl");
                    setSortDirection("desc");
                    break;
                  default:
                    setSortBy(undefined);
                    setSortDirection("desc");
                    break;
                }
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Box display="flex" alignItems="center">
                    <img
                      style={{
                        marginRight: "8px",
                        height: "1.5rem",
                        width: "1.5rem",
                      }}
                      src="/images/sortIcon.svg"
                      alt="Magnifying Glass"
                    />
                    {/* Display the label only when sortBy is not set */}
                    {!sortBy && (
                      <Typography
                        sx={{
                          color: theme.palette.textMuted,
                          fontFamily: "Inter",
                          fontSize: "1rem",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "1.5rem", // 150%
                        }}
                      >
                        Sort by
                      </Typography>
                    )}
                  </Box>
                </InputAdornment>
              }
              MenuProps={{
                sx: {
                  "& .MuiMenu-paper": {
                    background: theme.palette.bgAlpha25,
                    backdropFilter: "blur(20px)",
                  },
                },
              }}
              label=""
              id="sort-table"
            >
              <MenuItem value="apr_asc">
                <ArrowUp />
                APR
              </MenuItem>
              <MenuItem value="apr_desc">
                <ArrowDown />
                APR
              </MenuItem>
              <MenuItem value="tvl_asc">
                <ArrowUp />
                TVL
              </MenuItem>
              <MenuItem value="tvl_desc">
                <ArrowDown />
                TVL
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          overflowX: { xs: "scroll", md: "auto", maxWidth: "100%" },
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-track": {
            background: "#29c772",
            borderRadius: "1rem",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#000000",
            borderRadius: "1rem",
          },
        }}
      >
        <TableHead />
        {sortedEntries.map((entry, index) => (
          <PoolEntry key={index} entry={entry} />
        ))}
      </Box>
    </>
  );
};

export { PoolMultiple };

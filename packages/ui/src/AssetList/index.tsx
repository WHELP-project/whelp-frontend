import {
  Avatar,
  Box,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Token, UiTypes } from "@whelp/types";
import { palette } from "..";
import { ArrowDown, ArrowUp } from "react-huge-icons/solid";
import { useEffect, useState } from "react";
import { splitNumber, microAmountToAmount } from "@whelp/utils";
import { Repeat } from "@mui/icons-material";
import React from "react";
interface AssetListProps {
  entries: Token[];
  onClick: (token: Token) => void;
}

const AssetListEntry = ({
  token,
  onClick,
}: {
  token: Token;
  onClick: (token: Token) => void;
}) => {
  const tokenBalance = microAmountToAmount(token);
  const tokenBalanceSplit = splitNumber(tokenBalance, token.decimals);
  return (
    <>
      <Box
        onClick={() => onClick(token)}
        sx={{
          display: "flex",
          padding: "1.5rem",
          flexDirection: "column",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
          borderRadius: "1rem",
          border: `1px solid ${palette.strokePrimary}`,
          background: palette.bgAlpha25,
          backdropFilter: "blur(20px)",
          "& > .hover-box": {
            display: "none", // Hide the absolute box by default
          },
          "&:hover": {
            border: `1px solid ${palette.green.base}`,
            cursor: "pointer",
            "& > .hover-box": {
              display: "flex", // Display the absolute box on hover
            },
          },
        }}
      >
        <Avatar sx={{ height: "3rem", width: "3rem" }} src={token.icon} />
        <Typography
          sx={{
            color: palette.textNormal,
            fontSize: "0.75rem",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "1rem",
            letterSpacing: "0.03rem",
            textTransform: "uppercase",
          }}
        >
          {token.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "end" }}>
          <Typography
            sx={{
              color: palette.textLoud,
              fontSize: "2rem",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "2.5rem",
            }}
          >
            {tokenBalanceSplit.integer}
          </Typography>
          <Typography
            sx={{
              color: palette.textNormal,
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "1.5rem",
            }}
          >
            {tokenBalanceSplit.decimal}
          </Typography>
        </Box>
        <Typography
          sx={{
            color: palette.textNormal,
            fontSize: "1rem",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "1.5rem",
          }}
        >
          ${token.usdValue * tokenBalance}
        </Typography>
        <Box
          className="hover-box"
          sx={{
            position: "absolute",
            height: "1rem",
            background: palette.green.base,
            bottom: 0,
            width: "100%",
            overflow: "hidden",
            borderRadius: "0 0 1rem 1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: palette.textBlack,
              fontFamily: "Inter",
              fontSize: "0.75rem",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "1rem",
            }}
          >
            <Repeat sx={{ width: "0.75rem", height: "0.75rem" }} /> Quick Swap
          </Typography>
        </Box>
      </Box>
    </>
  );
};

const AssetList = (params: AssetListProps) => {
  // Filter States
  const [search, setSearch] = useState<string>();
  const [_sortBy, _setSortBy] = useState<string>("value_asc");
  const [sortBy, setSortBy] = useState<string>("value_asc");
  const [sortDirection, setSortDirection] = useState<string>("asc");

  // Entries State
  const [entries, setEntries] = useState<Token[]>([]);

  // Use Effect to filter entries
  useEffect(() => {
    // Filter by search
    const filteredEntries = params.entries.filter((entry) => {
      if (!search) return true;
      return entry.name.toLowerCase().includes(search.toLowerCase());
    });

    const valueAddedEntries = filteredEntries.map((entry) => {
      return {
        ...entry,
        value: entry.usdValue * microAmountToAmount(entry),
      };
    });

    // Sort by sort
    const sortedEntries = valueAddedEntries.sort((a, b) => {
      if (!sortBy) return 0;
      if (a[sortBy] > b[sortBy]) {
        return sortDirection === "desc" ? 1 : -1;
      }
      if (a[sortBy] < b[sortBy]) {
        return sortDirection === "desc" ? -1 : 1;
      }
      return 0;
    });

    // Set entries
    setEntries(sortedEntries);
  }, [params.entries, search, sortBy, sortDirection]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: "0rem 1rem",
            alignItems: "center",
            gap: "0.5rem",
            borderLeft: `1px solid ${palette.textLoud}`,
            mb: "1rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "1.75rem",
              color: palette.textLoud,
            }}
          >
            Assets
          </Typography>
        </Box>

        <Box>
          <Box sx={{ display: { md: "flex", xs: "block" } }}>
            <Input
              placeholder="Search"
              fullWidth
              onChange={(e: any) => setSearch(e.target.value)}
              sx={{
                borderRadius: "0.625rem",
                border: `1px solid ${palette.strokePrimary}`,
                background: palette.bgAlpha25,
                padding: "0.5rem 1rem",
                lineHeight: "1.5rem",
                fontSize: "1rem",
                mr: "1rem",
                my: { xs: "1rem", md: 0 },
                color: palette.textNormal,
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
                  border: `1px solid ${palette.strokePrimary}`,
                  background: palette.bgAlpha25,
                  cursor: "pointer",
                  backdropFilter: "blur(20px)",
                }}
                value={_sortBy}
                onChange={(e) => {
                  _setSortBy(e.target.value);
                  switch (e.target.value) {
                    case "balance_asc":
                      setSortBy("balance");
                      setSortDirection("asc");
                      break;
                    case "balance_desc":
                      setSortBy("balance");
                      setSortDirection("desc");
                      break;
                    case "value_asc":
                      setSortBy("value");
                      setSortDirection("asc");
                      break;
                    case "value_desc":
                      setSortBy("value");
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
                            color: palette.textMuted,
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
                      background: palette.bgAlpha25,
                      backdropFilter: "blur(20px)",
                    },
                  },
                }}
                label=""
                id="sort-table"
              >
                <MenuItem value="balance_asc">
                  <ArrowUp />
                  Highest Balance
                </MenuItem>
                <MenuItem value="balance_desc">
                  <ArrowDown />
                  Lowest Balance
                </MenuItem>
                <MenuItem value="value_asc">
                  <ArrowUp />
                  Highest Value
                </MenuItem>
                <MenuItem value="value_desc">
                  <ArrowDown />
                  Lowest Value
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Grid
        sx={{
          mt: "1.5rem",
          borderRadius: "1.5rem",
          border: `1px solid ${palette.strokePrimary}`,
          background: palette.bgSecondary,
          padding: "1.5rem",
        }}
        spacing={2}
        container
      >
        {entries.map((entry, index) => (
          <Grid key={index} item xs={12} md={3}>
            <AssetListEntry token={entry} onClick={params.onClick} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export { AssetList };

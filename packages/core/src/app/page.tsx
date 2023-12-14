"use client";

import { useAppStore } from "@whelp/state";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { TestnetConfig, WhelpFactoryAddress } from "@whelp/utils";
import { WhelpFactoryQueryClient } from "@whelp/contracts";
import { Token, UiTypes } from "@whelp/types";
import { useEffect, useState } from "react";
import { AssetList, Card } from "@whelp/ui";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { palette } from "@whelp/ui";

const CardTitleStyles = {
  color: "#FFFF",
  fontSize: "2rem",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "2.5rem",
};

export default function Home() {
  // Init Store
  const appStore = useAppStore();

  // Some States
  const [allTokens, setAllTokens] = useState<Token[]>([]);
  const [pools, setPools] = useState<UiTypes.Pool[]>([]);

  // Get pools to fetch all tokens from it
  const getPools = async () => {
    // Get Pool Query Client
    const cosmWasmClient = await CosmWasmClient.connect(
      TestnetConfig.rpc_endpoint
    );
    const factoryClient = new WhelpFactoryQueryClient(
      cosmWasmClient,
      WhelpFactoryAddress
    );

    const { pools: fetchedPools } = await factoryClient.pools({});

    const allPools: Promise<UiTypes.Pool>[] = fetchedPools.map(async (pool) => {
      // Get Tokens
      const token_a = await appStore.fetchTokenBalance(pool.asset_infos[0]);
      const token_b = await appStore.fetchTokenBalance(pool.asset_infos[1]);

      // Return Pool
      return {
        token_a,
        token_b,
        tvl: 0,
        apr: 0,
        poolAddress: pool.contract_addr,
      };
    });

    // Await all promises
    const resolvedPools = await Promise.all(allPools);

    // Set pools to state
    return resolvedPools;
  };

  // Fetch all available tokens in pools
  const fetchTokens = async () => {
    // Get Pools first
    const pools = await getPools();
    setPools(pools);
    // Get all tokens in an array
    const allTokens: Token[] = pools.flatMap((pool) => {
      return [pool.token_a, pool.token_b];
    });

    // Remove duplicates
    const uniqueTokens = allTokens.filter(
      (token, index, self) =>
        index === self.findIndex((t) => t.tokenAddress === token.tokenAddress)
    );

    return uniqueTokens;
  };

  // Fetch all tokens
  useEffect(() => {
    fetchTokens().then((tokens) => setAllTokens(tokens));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStore.wallet.address]);

  return (
    <main>
      <Box
        sx={{
          maxWidth: "1216px",
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        <Box sx={{ background: palette.bgPrimary }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Card
                title={"Total Balance"}
                content={<Typography sx={CardTitleStyles}>$0</Typography>}
                warning={false}
              />
            </Grid>
            <Grid item xs={3}>
              <Card
                title={"Total Balance"}
                content={<Typography sx={CardTitleStyles}>$0</Typography>}
                warning={false}
              />
            </Grid>
            <Grid item xs={3}>
              <Card
                title={"Total Balance"}
                content={<Typography sx={CardTitleStyles}>$0</Typography>}
                warning={false}
              />
            </Grid>
            <Grid item xs={3}>
              <Card
                title={"Total Balance"}
                content={<Typography sx={CardTitleStyles}>$0</Typography>}
                warning={false}
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: "1.5rem", background: palette.strokePrimary }} />
          <AssetList
            entries={allTokens}
            onClick={(token) => console.log(token)}
          />
        </Box>
      </Box>
    </main>
  );
}

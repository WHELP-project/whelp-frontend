"use client";

import { Box } from "@mui/material";
import { PoolMultiple } from "@whelp/ui";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { TestnetConfig, WhelpFactoryAddress } from "@whelp/utils";
import { WhelpFactoryQueryClient } from "@whelp/contracts";
import { useEffect, useState } from "react";
import { UiTypes } from "@whelp/types";
import { useAppStore } from "@whelp/state";

export default function PoolsPage() {
  const appStore = useAppStore();

  const [pools, setPools] = useState<UiTypes.Pool[]>([]);

  // Get Pools
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
    setPools(resolvedPools);
  };

  // Init
  useEffect(() => {
    getPools();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <Box sx={{ p: "2rem 4rem" }}>
        <PoolMultiple pools={pools} />
      </Box>
    </main>
  );
}

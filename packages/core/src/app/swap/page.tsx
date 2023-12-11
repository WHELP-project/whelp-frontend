"use client";

import { SwapContainer } from "@whelp/ui";
import { Token, UiTypes } from "@whelp/types";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import {
  TestnetConfig,
  WhelpFactoryAddress,
  WhelpMultihopAddress,
  findBestPath,
  tokenToTokenInfo,
} from "@whelp/utils";
import {
  WhelpFactoryQueryClient,
  WhelpMultiHopQueryClient,
} from "@whelp/contracts";
import { useAppStore } from "@whelp/state";

export default function SwapPage() {
  // Set States
  const [allTokens, setAllTokens] = useState<Token[]>([]);
  const [fromToken, setFromToken] = useState<Token>();
  const [toToken, setToToken] = useState<Token>();
  const [fromAmount, setFromAmount] = useState<number>(0);
  const [toAmount, setToAmount] = useState<number>(0);
  const [slippageTolerance, setSlippageTolerance] = useState<number>(0.5);
  const [pools, setPools] = useState<UiTypes.Pool[]>([]);

  // Init Store
  const appStore = useAppStore();

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

  // Simulate Swap
  const simulateSwap = async () => {
    // Get Multihop Query Client
    const cosmWasmClient = await CosmWasmClient.connect(
      TestnetConfig.rpc_endpoint
    );

    const multiHopClient = new WhelpMultiHopQueryClient(
      cosmWasmClient,
      WhelpMultihopAddress
    );

    const { operations } = findBestPath(
      tokenToTokenInfo(fromToken!),
      tokenToTokenInfo(toToken!),
      pools.map((pool) => {
        return {
          asset_a: pool.token_a.tokenAddress!,
          asset_b: pool.token_b.tokenAddress!,
        };
      })
    );
    console.log({
      offerAmount: fromAmount.toString(),
      operations,
      referral: false,
    });
    // Simulate Swap
    const result = await multiHopClient.simulateSwapOperations({
      offerAmount: fromAmount.toString(),
      operations,
      referral: false,
    });
  };

  // Init
  useEffect(() => {
    fetchTokens().then((tokens) => {
      setAllTokens(tokens);
      setFromToken(tokens[0]);
      setToToken(tokens[1]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Simulate Swap Hook

  return (
    <main>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 150px)",
          position: "relative",
        }}
      >
        {/* Swap Container */}
        {fromToken && toToken && (
          <SwapContainer
            from_token={fromToken}
            to_token={toToken}
            from_amount={fromAmount}
            to_amount={toAmount}
            tokens={allTokens}
            onFromTokenChange={(token: Token) => setFromToken(token)}
            onToTokenChange={(token: Token) => setToToken(token)}
            onFromAmountChange={(amount: number) => setFromAmount(amount)}
            onToAmountChange={(amount: number) => setToAmount(amount)}
            onSwap={() => simulateSwap()}
            slippageTolerance={slippageTolerance}
            setSlippageTolerance={(slippageTolerance: number) =>
              setSlippageTolerance(slippageTolerance)
            }
          />
        )}
        <Box sx={{ position: "absolute", width: "100%", zIndex: -1 }}>
          <Box
            component="img"
            alt="Background img"
            src="/images/swap_bg.png"
            sx={{
              height: "100%",
              width: "100%",
              bottom: 0,
              zIndex: -1,
            }}
          />
        </Box>
      </Box>
    </main>
  );
}

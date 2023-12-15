"use client";

import { LoaderVideo, StatusModal, SwapContainer, SwapStats } from "@whelp/ui";
import { Token, UiTypes } from "@whelp/types";
import { Box } from "@mui/material";
import { use, useEffect, useState } from "react";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import {
  TestnetConfig,
  WhelpFactoryAddress,
  WhelpMultihopAddress,
  amountToMicroAmount,
  findBestPath,
  microAmountToAmount,
  tokenToTokenInfo,
} from "@whelp/utils";
import {
  Cw20Client,
  WhelpFactoryQueryClient,
  WhelpMultiHopClient,
  WhelpMultiHopQueryClient,
} from "@whelp/contracts";
import { useAppStore } from "@whelp/state";
import { toBase64, toUtf8 } from "@cosmjs/encoding";
import { useSearchParams } from "next/navigation";

export default function SwapPage() {
  // Set States
  const [allTokens, setAllTokens] = useState<Token[]>([]);
  const [fromToken, setFromToken] = useState<Token>();
  const [toToken, setToToken] = useState<Token>();
  const [fromAmount, setFromAmount] = useState<number>(0);
  const [toAmount, setToAmount] = useState<number>(0);
  const [slippageTolerance, setSlippageTolerance] = useState<number>(0.5);
  const [pools, setPools] = useState<UiTypes.Pool[]>([]);
  const [simulateLoading, setSimulateLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  // Stat States
  const [exchangeRateText, setExchangeRateText] = useState<string>("-");
  const [networkFeeText, setNetworkFeeText] = useState<string>("-");
  const [route, setRoute] = useState<string[]>([]);
  const [maximumSpreadText, setMaximumSpreadText] = useState<string>("-");

  // Status Modal States
  const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false);
  const [statusModalType, setStatusModalType] =
    useState<UiTypes.Status>("success");
  const [statusModalTxType, setStatusModalTxType] =
    useState<UiTypes.TxType>("addLiquidity");
  const [statusModalTokens, setStatusModalTokens] = useState<Token[]>([]);
  const [swapLoading, setSwapLoading] = useState<boolean>(false);

  // Init Store
  const appStore = useAppStore();

  // Check if token query
  const searchParams = useSearchParams();
  const _searchToken = searchParams.get("fromToken");

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
    // Set simulate loading
    setSimulateLoading(true);
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

    // Simulate Swap
    const result = await multiHopClient.simulateSwapOperations({
      offerAmount: amountToMicroAmount({
        ...fromToken!,
        balance: fromAmount,
      }).toString(),
      operations,
      referral: false,
    });

    // Set Stats Text
    setExchangeRateText(
      `${(
        microAmountToAmount({ ...toToken!, balance: Number(result.amount) }) /
        fromAmount
      ).toFixed(2)} ${toToken?.name} per ${fromToken?.name}`
    );
    setNetworkFeeText(
      `${microAmountToAmount({
        ...fromToken!,
        balance: Number(result.spread_amounts[0].amount),
      })} ${fromToken?.name}`
    );

    const _route: string[] = [];
    for (let i = 0; i < operations.length; i++) {
      const op = operations[i];
      const askAssetInfoName = (
        await appStore.fetchTokenBalance(op.dex_swap.ask_asset_info)
      ).name;
      _route.push(askAssetInfoName);

      if (i === operations.length - 1) {
        const offerAssetInfoName = (
          await appStore.fetchTokenBalance(op.dex_swap.offer_asset_info)
        ).name;
        _route.push(offerAssetInfoName);
      }
    }

    setRoute(_route.reverse());
    setMaximumSpreadText(`${slippageTolerance}%`);

    // Set toAmount
    setToAmount(
      microAmountToAmount({ ...toToken!, balance: Number(result.amount) })
    );
    // Set simulate loading
    setSimulateLoading(false);
  };

  // Get Signing Client
  const getMultiHopSigningClient = (): WhelpMultiHopClient => {
    const cosmWasmSigningClient = appStore.cosmWasmSigningClient!;
    return new WhelpMultiHopClient(
      cosmWasmSigningClient,
      appStore.wallet.address,
      WhelpMultihopAddress
    );
  };

  // Do Swap
  const swap = async () => {
    setSwapLoading(true);
    try {
      const multiHopClient = getMultiHopSigningClient();
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

      if (!fromToken) return;

      // Cw20 Swap
      if (fromToken.type === "cw20") {
        const cw20Contract = new Cw20Client(
          appStore.cosmWasmSigningClient!,
          appStore.wallet.address,
          fromToken.tokenAddress!
        );

        await cw20Contract.send({
          amount: microAmountToAmount({
            ...fromToken!,
            balance: fromAmount,
          }).toString(),
          contract: WhelpMultihopAddress,
          msg: toBase64(
            toUtf8(
              JSON.stringify({
                execute_swap_operations: {
                  operations,
                  max_spread: slippageTolerance,
                },
              })
            )
          ),
        });
        setStatusModalType("success");
        setStatusModalTxType("swap");
        setStatusModalTokens([
          { ...fromToken, balance: Number(fromAmount) },
          { ...toToken!, balance: Number(toAmount) },
        ]);
        setStatusModalOpen(true);
        setSwapLoading(false);
        return;
      }

      // Smart token swap
      await multiHopClient.executeSwapOperations(
        { operations, maxSpread: slippageTolerance.toString() },
        "auto",
        undefined,
        [
          {
            amount: amountToMicroAmount({
              ...fromToken!,
              balance: fromAmount,
            }).toString(),
            denom: fromToken.tokenAddress!,
          },
        ]
      );
      setStatusModalType("success");
      setStatusModalTxType("swap");
      setStatusModalTokens([
        { ...fromToken, balance: Number(fromAmount) },
        { ...toToken!, balance: Number(toAmount) },
      ]);
      setStatusModalOpen(true);
      setSwapLoading(false);
    } catch (e) {
      console.log(e);
      setStatusModalOpen(true);
      setStatusModalType("error");
      setStatusModalTxType("swap");
      setStatusModalTokens([]);
      setSwapLoading(false);
    }
  };

  // Init
  useEffect(() => {
    fetchTokens().then((tokens) => {
      const searchToken = tokens.find(
        (token) => token.tokenAddress === _searchToken
      );
      setAllTokens(tokens);
      setFromToken(searchToken ?? tokens[0]);
      setToToken(searchToken === tokens[1] ? tokens[0] : tokens[1]);
      setPageLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStore.wallet.address]);

  // Simulate Swap Hook
  useEffect(() => {
    if (fromAmount > 0 && toToken) {
      simulateSwap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromToken, toToken, fromAmount]);

  return (
    <main style={{ position: "relative" }}>
      <Box sx={{ position: "absolute", width: "100%", zIndex: -1 }}>
        <Box
          component="img"
          alt="Background img"
          src="/images/swap_bg.png"
          sx={{
            height: "100%",
            width: "100%",
            top: 0,
            zIndex: -1,
          }}
        />
      </Box>
      {pageLoading ? (
        <LoaderVideo variant={3} />
      ) : (
        <>
          <Box
            sx={{
              display: "block",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              maxWidth: "650px",
              mt: "2rem",
              flexDirection: "column",
              position: "relative",
              gap: "2rem",
              height: "calc(100vh - 72px)",
            }}
          >
            {/* Swap Container */}
            {fromToken && toToken && (
              <SwapContainer
                simulateLoading={simulateLoading}
                from_token={fromToken}
                to_token={toToken}
                from_amount={fromAmount}
                to_amount={toAmount}
                tokens={allTokens}
                onFromTokenChange={(token: Token) => setFromToken(token)}
                onToTokenChange={(token: Token) => setToToken(token)}
                onFromAmountChange={(amount: number) => setFromAmount(amount)}
                onToAmountChange={(amount: number) => setToAmount(amount)}
                onSwap={() => swap()}
                slippageTolerance={slippageTolerance}
                setSlippageTolerance={(slippageTolerance: number) =>
                  setSlippageTolerance(slippageTolerance)
                }
                swapLoading={swapLoading}
                maxFromAmount={microAmountToAmount(fromToken)}
                switchTokens={() => {
                  setFromToken(toToken);
                  setToToken(fromToken);
                }}
              />
            )}
            <SwapStats
              exchangeRateText={exchangeRateText}
              networkFeeText={networkFeeText}
              route={route}
              maximumSpreadText={maximumSpreadText}
              simulateLoading={simulateLoading}
            />
          </Box>
        </>
      )}
      <StatusModal
        open={statusModalOpen}
        onClose={() => {
          setStatusModalOpen(false);
        }}
        status={statusModalType}
        txType={statusModalTxType}
        tokens={statusModalTokens}
      />
    </main>
  );
}

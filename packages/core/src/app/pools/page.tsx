"use client";

import { Box } from "@mui/material";
import { PoolMultiple } from "@whelp/ui";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import {
  MainnetConfig,
  WhelpFactoryAddress,
  WhelpMultihopAddress,
  findBestPath,
  tokenToTokenInfo,
} from "@whelp/utils";
import {
  WhelpFactoryClient,
  WhelpFactoryQueryClient,
  WhelpMultiHopQueryClient,
  WhelpPoolQueryClient,
  WhelpStakeQueryClient,
} from "@whelp/contracts";
import { useEffect, useState } from "react";
import { Token, UiTypes } from "@whelp/types";
import { useAppStore } from "@whelp/state";
import { CreatePoolModal } from "@whelp/ui";

export default function PoolsPage() {
  const appStore = useAppStore();

  const [pools, setPools] = useState<UiTypes.Pool[]>([]);

  const [poolType, setPoolType] = useState<"stable" | "xyk">("xyk");
  const [poolCreationOpen, setPoolCreationOpen] = useState<boolean>(false);
  const [poolCreationError, setPoolCreationError] = useState<string>("");
  const [isPoolCreationDisabled, setIsPoolCreationDisabled] =
    useState<boolean>(false);
  const [isPoolCreationLoading, setIsPoolCreationLoading] =
    useState<boolean>(false);

  // Get Pools
  const getPools = async () => {
    // Get Pool Query Client
    const cosmWasmClient = await CosmWasmClient.connect(
      MainnetConfig.rpc_endpoint
    );
    const factoryClient = new WhelpFactoryQueryClient(
      cosmWasmClient,
      WhelpFactoryAddress
    );

    const { pools: fetchedPools } = await factoryClient.pools({});

    // @ts-ignore
    const allPools: Promise<UiTypes.Pool>[] = fetchedPools.map(async (pool) => {
      // Get Tokens
      const token_a = await appStore.fetchTokenBalance(pool.asset_infos[0]);
      const token_b = await appStore.fetchTokenBalance(pool.asset_infos[1]);
      const _poolQueryClient = new WhelpPoolQueryClient(
        cosmWasmClient,
        pool.contract_addr
      );
      // Get Pool Info
      const pairInfo = await _poolQueryClient.pair();
      const poolInfo = await _poolQueryClient.pool();
      const asset_lp = { smart_token: pairInfo.liquidity_token };
      const asset_lp_info = await appStore.fetchTokenBalance(asset_lp);

      const apr = await getAPR(
        pairInfo.staking_addr,
        asset_lp_info,
        token_a,
        token_b,
        Number(poolInfo.assets[0].amount),
        Number(poolInfo.assets[1].amount),
        Number(poolInfo.total_share)
      );

      // Return Pool
      return {
        token_a,
        token_b,
        tvl: `${
          Number(Number(poolInfo.assets[0].amount)) / 10 ** token_a.decimals
        } ${token_a.name} + ${
          Number(Number(poolInfo.assets[1].amount)) / 10 ** token_b.decimals
        } ${token_b.name}`,
        apr: apr[apr.length - 1].toFixed(2),
        poolAddress: pool.contract_addr,
      };
    });

    // Await all promises
    const resolvedPools = await Promise.all(allPools);

    // Set pools to state
    setPools(resolvedPools);
  };

  useEffect(() => {
    // Check get param for create_pool
    const urlParams = new URLSearchParams(window.location.search);
    const createPoolParam = urlParams.get("create_pool");
    if (createPoolParam !== null) {
      setPoolCreationOpen(true);
    }

    if (!appStore.wallet.address) {
      setIsPoolCreationDisabled(true);
    } else if (appStore.wallet.address) {
      // Check ucore balance
      appStore.fetchTokenBalance({ cw20_token: "ucore" }).then((ucore) => {
        if (Number(ucore.balance) < 32000000) {
          setIsPoolCreationDisabled(true);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStore.wallet.address]);

  // Get Signing Client
  const getFactorySigningClient = (): WhelpFactoryClient => {
    const cosmWasmSigningClient = appStore.cosmWasmSigningClient!;
    return new WhelpFactoryClient(
      cosmWasmSigningClient,
      appStore.wallet.address,
      WhelpMultihopAddress
    );
  };

  const createPool = async (
    newTokenA: {
      address: string;
      type: string;
    },
    newTokenB: {
      address: string;
      type: string;
    }
  ) => {
    setIsPoolCreationLoading(true);
    // Instantiate new
    const factoryClient = getFactorySigningClient();

    const tokenAInfo =
      newTokenA.type === "cw20"
        ? { cw20_token: newTokenA.address }
        : { smart_token: newTokenA.address };
    const tokenBInfo =
      newTokenB.type === "cw20"
        ? { cw20_token: newTokenB.address }
        : { smart_token: newTokenB.address };

    if (tokenAInfo === tokenBInfo) {
      setPoolCreationError("Tokens cannot be the same");
      setIsPoolCreationLoading(false);
      return;
    }

    // Check if tokens are valid
    try {
      const tokenA = await appStore.fetchTokenBalance(tokenAInfo);
      const tokenB = await appStore.fetchTokenBalance(tokenBInfo);
    } catch (e) {
      setPoolCreationError("Invalid token");
      setIsPoolCreationLoading(false);
      return;
    }

    // Get pooltype
    const _poolType = poolType === "xyk" ? { xyk: {} } : { stable: {} };
    try {
      await factoryClient.createPool(
        {
          assetInfos: [tokenAInfo, tokenBInfo],
          poolType: _poolType,
        },
        "auto",
        undefined,
        [
          {
            denom: "ucore",
            amount: "320000000",
          },
        ]
      );
      setPoolCreationError("Success!");
    } catch (e: any) {
      setPoolCreationError(e.message);
      setIsPoolCreationLoading(false);
      return;
    }

    setIsPoolCreationLoading(false);
  };

  // Get APR
  const getAPR = async (
    address: string,
    lp_token: Token,
    token_a: Token,
    token_b: Token,
    token_a_amount: number,
    token_b_amount: number,
    total_lp_issued: number
  ) => {
    // Get Clients
    const cosmWasmClient = await CosmWasmClient.connect(
      MainnetConfig.rpc_endpoint
    );
    const stakingQueryClient = new WhelpStakeQueryClient(
      cosmWasmClient,
      address
    );

    // Get Annualized Rewards
    const { rewards } = await stakingQueryClient.annualizedRewards();

    // Get total staked lp tokens
    const { total_staked: totalStakedLpTokens } =
      await stakingQueryClient.totalStaked();

    // Iterate over rewards buckets
    const res = rewards.map(async (reward) => {
      // Absolute amount of rewards in this bucket
      const absoluteRewards = reward[1];

      const aprs = absoluteRewards.map(async (absoluteReward) => {
        // Check if the reward token is in the pool
        let rewardTokenInPool = undefined;
        let rewardTokenAmountInPool = 0;

        if (absoluteReward.amount === "0") {
          return {
            unbondingPeriod: reward[0],
            apr: 0,
          };
        }

        // If the reward token is in the pool, we can use the pool ratio to calculate the value
        // If the reward token is not in the pool, we can use the token price from simulating a swap
        if (
          // @ts-ignore
          tokenToTokenInfo(token_a).smart_token ===
          // @ts-ignore
          absoluteReward.info.smart_token
        ) {
          rewardTokenInPool = token_a;
          rewardTokenAmountInPool = token_a_amount;
        } else if (
          // @ts-ignore
          tokenToTokenInfo(token_b).smart_token ===
          // @ts-ignore
          absoluteReward.info.smart_token
        ) {
          rewardTokenInPool = token_b;
          rewardTokenAmountInPool = token_b_amount;
        }
        if (rewardTokenInPool) {
          // Easy, our reward token is part of the pool.
          // Means 1% tokens of total staked tokens of the reward token is worth 2% token of the LP token
          // So, we need to get the difference between the total staked tokens and the unstaked tokens
          const stakedUnstakedRatio =
            Number(totalStakedLpTokens) / total_lp_issued;

          // Calculate the value of one lp token by the value of the total amount of staked tokens
          // And total amount of unstaked tokens and the total amount of rewardTokens times 2 (because we have 2 tokens in the pool)
          const oneLpTokenValueInRewardToken =
            ((stakedUnstakedRatio * rewardTokenAmountInPool) /
              Number(totalStakedLpTokens)) *
            2;

          // Calculate APR
          const apr =
            (Number(absoluteReward.amount) / oneLpTokenValueInRewardToken) *
            100;
          return {
            unbondingPeriod: reward[0],
            apr: typeof apr === "number" && !isNaN(apr) ? apr : 0,
          };
        } else {
          // The reward token is not in the pool, we need to simulate a swap
          // to get the value of the reward token in the pool
          // This solution only works when the reward token is paired with the staked token
          // We need to implement a solution for when the reward token is not paired with the staked token
          const multiHopClient = new WhelpMultiHopQueryClient(
            cosmWasmClient,
            WhelpMultihopAddress
          );

          const factoryClient = new WhelpFactoryQueryClient(
            cosmWasmClient,
            WhelpFactoryAddress
          );

          const { pools: fetchedPools } = await factoryClient.pools({});

          const allPools: Promise<UiTypes.Pool>[] = fetchedPools.map(
            async (pool) => {
              // Get Tokens
              const token_a = await appStore.fetchTokenBalance(
                pool.asset_infos[0]
              );
              const token_b = await appStore.fetchTokenBalance(
                pool.asset_infos[1]
              );

              // Return Pool
              return {
                token_a,
                token_b,
                tvl: "0asds",
                apr: 0,
                poolAddress: pool.contract_addr,
              };
            }
          );

          // Await all promises
          const resolvedPools = await Promise.all(allPools);

          const { operations } = findBestPath(
            tokenToTokenInfo(token_a),
            absoluteReward.info,
            resolvedPools.map((pool) => {
              return {
                asset_a: pool.token_a.tokenAddress!,
                asset_b: pool.token_b.tokenAddress!,
              };
            })
          );
          // Simulate Swap
          const result = await multiHopClient.simulateSwapOperations({
            offerAmount: "1000000",
            operations,
            referral: false,
          });

          // One token in the pool is worth the result.amount of the reward token
          const oneATokenAmountInRewardToken = Number(result.amount) / 1000000;

          rewardTokenInPool = token_a;
          rewardTokenAmountInPool =
            token_a_amount * oneATokenAmountInRewardToken;

          const stakedUnstakedRatio =
            Number(totalStakedLpTokens) / total_lp_issued;

          // Calculate the value of one lp token by the value of the total amount of staked tokens
          // And total amount of unstaked tokens and the total amount of rewardTokens times 2 (because we have 2 tokens in the pool)
          const oneLpTokenValueInRewardToken =
            ((stakedUnstakedRatio * rewardTokenAmountInPool) /
              Number(totalStakedLpTokens)) *
            2;

          // Calculate APR
          const apr =
            (Number(absoluteReward.amount) / oneLpTokenValueInRewardToken) *
            100;

          console.log(typeof apr === "number" ? apr : 0);

          return {
            unbondingPeriod: reward[0],
            apr: typeof apr === "number" && !isNaN(apr) ? apr : 0,
          };
        }
      });

      // Set APRs
      const _aprs = await Promise.all(aprs);
      return _aprs[0].apr;
    });
    return await Promise.all(res);
  };

  // Init
  useEffect(() => {
    getPools();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <Box sx={{ p: "2rem 4rem" }}>
        <PoolMultiple
          pools={pools}
          onCreatePoolOpen={() => setPoolCreationOpen(true)}
        />
        <CreatePoolModal
          isOpen={poolCreationOpen}
          setOpen={() => setPoolCreationOpen(!poolCreationOpen)}
          onCreatePoolClick={(tokenA, tokenB) => {
            createPool(tokenA, tokenB);
          }}
          onProvideLiquidityClick={() => {}}
          error={poolCreationError}
          isCreatePoolLoading={false}
          isProvideLiquidityLoading={false}
          poolType={poolType}
          setPoolType={(type) => setPoolType(type)}
          disabled={isPoolCreationDisabled}
        />
      </Box>
    </main>
  );
}

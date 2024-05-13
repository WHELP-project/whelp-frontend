"use client";
import {
  Box,
  Avatar,
  Typography,
  Grid,
  Alert,
  Button as MuiButton,
  Link,
} from "@mui/material";
import {
  WhelpFactoryQueryClient,
  WhelpMultiHopQueryClient,
  WhelpPoolClient,
  WhelpPoolQueryClient,
  WhelpPoolTypes,
  WhelpStakeClient,
  WhelpStakeQueryClient,
  WhelpStakeTypes,
} from "@whelp/contracts";
import { useAppStore } from "@whelp/state";
import { Token, UiTypes } from "@whelp/types";
import {
  WhelpFactoryAddress,
  WhelpMultihopAddress,
  amountToMicroAmount,
  findBestPath,
  microAmountToAmount,
  tokenToTokenInfo,
} from "@whelp/utils";
import {
  Button,
  Card,
  palette,
  PoolLiquidityForm,
  PoolStakeForm,
  StakingTable,
  StatusModal,
  UnbondingModal,
  UnstakeModal,
} from "@whelp/ui";
import { MainnetConfig } from "@whelp/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "react-huge-icons/outline";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { AssetValidated } from "@whelp/contracts/build/types/WhelpPool.types";

const typeSx = {
  color: palette.textLoud,
  fontSize: "2rem",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "2.5rem",
};

export default function SwapPage({
  params,
}: {
  params: { poolAddress: string };
}) {
  const poolAddress = params.poolAddress;
  const router = useRouter();
  const appStore = useAppStore();

  // Tokens
  const [tokenA, setTokenA] = useState<Token>({} as Token);
  const [tokenB, setTokenB] = useState<Token>({} as Token);
  const [tokenLP, setTokenLP] = useState<Token>({} as Token);
  const [assetRatio, setAssetRatio] = useState<number>(0);
  const [stakingAddress, setStakingAddress] = useState<string | undefined>(
    undefined
  );

  const [tokenAInfo, setTokenAInfo] = useState<WhelpPoolTypes.AssetInfo>(
    {} as WhelpPoolTypes.AssetInfo
  );
  const [tokenBInfo, setTokenBInfo] = useState<WhelpPoolTypes.AssetInfo>(
    {} as WhelpPoolTypes.AssetInfo
  );
  const [tokenLPInfo, setTokenLPInfo] = useState<WhelpPoolTypes.AssetInfo>(
    {} as WhelpPoolTypes.AssetInfo
  );

  // Loading states
  const [loadBalances, setLoadBalances] = useState<boolean>(false);

  // Status Modal states
  const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false);
  const [statusModalType, setStatusModalType] =
    useState<UiTypes.Status>("success");
  const [statusModalTxType, setStatusModalTxType] =
    useState<UiTypes.TxType>("addLiquidity");
  const [statusModalTokens, setStatusModalTokens] = useState<Token[]>([]);

  // Token Values
  const [tokenAValue, setTokenAValue] = useState<string>("");
  const [tokenBValue, setTokenBValue] = useState<string>("");
  const [tokenLPValue, setTokenLPValue] = useState<string>("");

  // APr
  const [aprFinal, setAprFinal] = useState<number>(0);

  // Staking Values
  const [stakingAmount, setStakingAmount] = useState<string>("0");
  const [userStakes, setUserStakes] = useState<any[]>([]);
  const [loadStaking, setLoadStaking] = useState<boolean>(false);
  const [bondingDurations, setBondingDurations] = useState<number[]>([]);
  const [bondingDurationSelected, setBondingdurationSelected] =
    useState<number>(0);
  const [stakingModalOpen, setStakingModalOpen] = useState<boolean>(false);
  const [userClaims, setUserClaims] = useState<WhelpStakeTypes.Claim[]>([]);

  // Staking rewards
  const [rewards, setRewards] = useState<UiTypes.StakeReward[]>([]);

  // Unstake Values
  const [unstakeModalOpen, setUnstakeModalOpen] = useState<boolean>(false);
  const [unstakeAmount, setUnstakeAmount] = useState<number>(0);
  const [availableUnstakeAmount, setAvailableUnstakeAmount] =
    useState<number>(0);
  const [unbondingPeriod, setUnbondingPeriod] = useState<number>(0);

  const [loading, setLoading] = useState<
    "add" | "remove" | "stake" | "unstake" | false
  >(false);

  // CosmWasmClient
  const [poolQueryClient, setPoolQueryClient] = useState<
    WhelpPoolQueryClient | undefined
  >(undefined);

  // Load initial data
  const init = async () => {
    // Set Loading Indicators
    setLoadStaking(true);
    setLoadBalances(true);

    // Get Pool Query Client
    const cosmWasmClient = await CosmWasmClient.connect(
      MainnetConfig.rpc_endpoint
    );
    const _poolQueryClient = new WhelpPoolQueryClient(
      cosmWasmClient,
      poolAddress
    );
    setPoolQueryClient(_poolQueryClient);
    if (!_poolQueryClient) return;

    // Get Pool Info
    const pairInfo = await _poolQueryClient.pair();
    const poolInfo = await _poolQueryClient.pool();

    const ratio =
      Number(poolInfo.assets[0].amount) / Number(poolInfo.assets[1].amount);

    // Get Staking Infos
    const stakingQueryClient = new WhelpStakeQueryClient(
      cosmWasmClient,
      pairInfo.staking_addr
    );
    const stakingInfo = await stakingQueryClient.bondingInfo();
    const durations = stakingInfo.bonding.map((bond) => bond.unbonding_period);

    // Get Token Info
    const asset_a = pairInfo.asset_infos[0];
    const asset_b = pairInfo.asset_infos[1];
    const asset_lp = { smart_token: pairInfo.liquidity_token };

    const asset_a_info = await appStore.fetchTokenBalance(asset_a);
    const asset_b_info = await appStore.fetchTokenBalance(asset_b);
    const asset_lp_info = await appStore.fetchTokenBalance(asset_lp);

    // Get user stakes
    if (appStore.wallet.address) {
      await getUserStakes(pairInfo.staking_addr, asset_lp_info);
    }
    await getAPR(
      pairInfo.staking_addr,
      asset_lp_info,
      asset_a_info,
      asset_b_info,
      Number(poolInfo.assets[0].amount),
      Number(poolInfo.assets[1].amount),
      Number(poolInfo.total_share)
    );

    // Get user rewards
    if (appStore.wallet.address) {
      // Fetch all withdrawable rewards from stake contract
      const { rewards: withdrawableRewards } =
        await stakingQueryClient.withdrawableRewards({
          owner: appStore.wallet.address,
        });

      // Get token info for each reward
      const _withdrawableRewards = withdrawableRewards.map(async (reward) => {
        const token = await appStore.fetchTokenBalance(reward.info);
        const amount = microAmountToAmount({
          ...token,
          balance: Number(reward.amount),
        });
        return {
          amount: amount.toString(),
          symbol: token.name,
        };
      });

      // Set rewards
      const _rewards = await Promise.all(_withdrawableRewards);
      setRewards(_rewards);
    }

    // Set Staking States
    setBondingDurations(durations);
    setBondingdurationSelected(durations[0]);

    // Set Pool States
    setAssetRatio(ratio);
    setStakingAddress(pairInfo.staking_addr);

    // Set Token States
    setTokenA(asset_a_info);
    setTokenB(asset_b_info);
    setTokenLP(asset_lp_info);
    setTokenAInfo(asset_a);
    setTokenBInfo(asset_b);
    setTokenLPInfo(asset_lp);

    // Remove loading indicators
    setLoadBalances(false);
    setLoadStaking(false);
  };

  const updateBalances = async () => {
    // Wait for next block
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Fetch new token balances
    const updatedLpToken = await appStore.fetchTokenBalance(tokenLPInfo);
    const updatedTokenA = await appStore.fetchTokenBalance(tokenAInfo);
    const updatedTokenB = await appStore.fetchTokenBalance(tokenBInfo);

    // Set states
    setTokenLP(updatedLpToken);
    setTokenA(updatedTokenA);
    setTokenB(updatedTokenB);
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

    // Get infos per bucket
    const { bonding } = await stakingQueryClient.bondingInfo();

    // Get total staked lp tokens
    const { total_staked: totalStakedLpTokens } =
      await stakingQueryClient.totalStaked();

    // Iterate over rewards buckets
    rewards.map(async (reward) => {
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
            apr,
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
                tvl: 0,
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

          return {
            unbondingPeriod: reward[0],
            apr,
          };
        }
      });

      // Set APRs
      const _aprs = await Promise.all(aprs);
      setAprFinal(_aprs[0].apr);
      return;
    });
  };

  const getUserStakes = async (address: string, token: Token) => {
    // Get Clients
    const cosmWasmClient = await CosmWasmClient.connect(
      MainnetConfig.rpc_endpoint
    );
    const stakingQueryClient = new WhelpStakeQueryClient(
      cosmWasmClient,
      address
    );

    // Get User Stakes
    const { stakes: userStakes } = await stakingQueryClient.allStaked({
      address: appStore.wallet.address,
    });

    const _tableEntries = userStakes.map((stake) => {
      return {
        lpToken: { ...token, balance: stake.stake },
        APR: 0,
        lockedPeriod: stake.unbonding_period,
        unstake: (tokenAmount: string, unbondingPeriod: number) => {
          unbond(Number(tokenAmount), unbondingPeriod);
        },
      };
    });

    // Filter for empty stakes
    const tableEntries = _tableEntries.filter(
      (entry) => Number(entry.lpToken.balance) > 0
    );

    // Get User claims
    const { claims } = await stakingQueryClient.claims({
      address: appStore.wallet.address,
    });

    // Set states
    setUserStakes(tableEntries);
    setUserClaims(claims);
  };

  const getPoolSigningClient = (): WhelpPoolClient => {
    const cosmWasmSigningClient = appStore.cosmWasmSigningClient!;
    return new WhelpPoolClient(
      cosmWasmSigningClient,
      appStore.wallet.address,
      poolAddress
    );
  };

  const getStakeSigningClient = (): WhelpStakeClient => {
    const cosmWasmSigningClient = appStore.cosmWasmSigningClient!;
    return new WhelpStakeClient(
      cosmWasmSigningClient,
      appStore.wallet.address,
      stakingAddress!
    );
  };

  // Stake
  const stake = async () => {
    setLoading("stake");
    try {
      const stakeClient = getStakeSigningClient();
      await stakeClient.delegate(
        {
          unbondingPeriod: bondingDurationSelected,
        },
        "auto",
        undefined,
        [
          {
            // @ts-ignore
            denom: tokenLPInfo.smart_token,
            amount: amountToMicroAmount({
              ...tokenLP,
              balance: Number(stakingAmount),
            }).toString(),
          },
        ]
      );

      await getUserStakes(stakingAddress!, tokenLP);

      // Set Status
      setStatusModalType("success");
      setStatusModalTxType("stakeLp");
      setStatusModalTokens([{ ...tokenLP, balance: Number(stakingAmount) }]);
      setStatusModalOpen(true);
      setLoading(false);

      await updateBalances();
    } catch (e) {
      setStatusModalOpen(true);
      setLoading(false);
      setStatusModalType("error");
      setStatusModalTxType("stakeLp");
      setStatusModalTokens([]);
      console.log(e);
    }
  };

  // Claim Rewards
  const claimRewards = async () => {
    try {
      const stakeClient = getStakeSigningClient();
      await stakeClient.withdrawRewards({});

      setStatusModalType("success");
      setStatusModalTxType("claim");
      setStatusModalTokens([
        {
          ...tokenLP,
        },
      ]);
      setStatusModalOpen(true);

      await updateBalances();
    } catch (e) {
      console.log(e);
    }
  };

  // Unstake
  const unbond = async (tokenAmount: number, unbondingPeriod: number) => {
    setLoading("unstake");
    try {
      const stakeClient = getStakeSigningClient();
      await stakeClient.unbond(
        {
          tokens: tokenAmount.toString(),
          unbondingPeriod: unbondingPeriod,
        },
        "auto",
        undefined
      );

      await getUserStakes(stakingAddress!, tokenLP);

      setUnstakeModalOpen(false);
      // Set Status
      setStatusModalType("success");
      setStatusModalTxType("unstakeLp");
      setStatusModalTokens([
        {
          ...tokenLP,
          balance: microAmountToAmount({ ...tokenLP, balance: tokenAmount }),
        },
      ]);
      setStatusModalOpen(true);

      await updateBalances();
    } catch (e) {
      setUnstakeModalOpen(false);

      setStatusModalOpen(true);
      setStatusModalType("error");
      setStatusModalTxType("unstakeLp");
      setStatusModalTokens([]);
      console.log(e);
    }
  };

  // Provide liquidity
  const provideLiquidity = async () => {
    setLoading("add");
    try {
      const amounts: WhelpPoolTypes.Asset[] = [
        {
          amount: amountToMicroAmount({
            ...tokenA,
            balance: Number(tokenAValue),
          }).toString(),
          info: tokenAInfo,
        },
        {
          amount: amountToMicroAmount({
            ...tokenB,
            balance: Number(tokenBValue),
          }).toString(),
          info: tokenBInfo,
        },
      ];

      // Sort Amounts by info.smart_token
      amounts.sort((a, b) => {
        // @ts-ignore
        if (a.info.smart_token < b.info.smart_token) {
          return -1;
        }
        // @ts-ignore
        if (a.info.smart_token > b.info.smart_token) {
          return 1;
        }
        return 0;
      });

      const poolClient = getPoolSigningClient();
      await poolClient.provideLiquidity(
        { assets: amounts },
        "auto",
        undefined,
        [
          {
            // @ts-ignore
            denom: amounts[0].info.smart_token,
            amount: Number(amounts[0].amount).toFixed(0),
          },
          {
            // @ts-ignore
            denom: amounts[1].info.smart_token,
            amount: Number(amounts[1].amount).toFixed(0),
          },
        ]
      );

      // Set Status
      setStatusModalType("success");
      setStatusModalTxType("addLiquidity");
      setStatusModalTokens([
        { ...tokenA, balance: Number(tokenAValue) },
        { ...tokenB, balance: Number(tokenBValue) },
      ]);
      setStatusModalOpen(true);

      setLoading(false);

      await updateBalances();
    } catch (e) {
      setStatusModalOpen(true);
      setLoading(false);
      setStatusModalType("error");
      setStatusModalTxType("addLiquidity");
      setStatusModalTokens([]);
      console.log(e);
    }
  };

  // Remove Liquidity
  const removeLiquidity = async () => {
    setLoading("remove");
    try {
      const amounts: WhelpPoolTypes.Asset[] = [
        {
          amount: amountToMicroAmount({
            ...tokenLP,
            balance: Number(tokenLPValue),
          }).toString(),
          info: tokenLPInfo,
        },
      ];
      const poolClient = getPoolSigningClient();
      await poolClient.withdrawLiquidity([
        {
          // @ts-ignore
          denom: amounts[0].info.smart_token,
          amount: amounts[0].amount,
        },
      ]);
      // Set Status
      setStatusModalType("success");
      setStatusModalTxType("withdrawLiquidity");
      setStatusModalTokens([
        {
          ...tokenLP,
          balance: microAmountToAmount({
            ...tokenLP,
            balance: Number(tokenLPValue),
          }),
        },
      ]);
      setStatusModalOpen(true);

      setLoading(false);

      await updateBalances();
    } catch (e) {
      setStatusModalOpen(true);
      setLoading(false);
      setStatusModalType("error");
      setStatusModalTxType("withdrawLiquidity");
      setStatusModalTokens([]);
      console.log(e);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStore.wallet.address]);

  const provideLiquidityProps = {
    addLiquidityClick: () => provideLiquidity(),
    removeLiquidityClick: () => removeLiquidity(),
  };

  const infoCardDetails = [
    {
      title: "My Share",
      content: <Typography sx={typeSx}>-</Typography>,
    },
    {
      title: "Lp Tokens",
      content: (
        <Typography sx={typeSx}>
          {microAmountToAmount({ ...tokenLP!, balance: tokenLP.balance })}
        </Typography>
      ),
    },
    {
      title: "TVL",
      content: <Typography sx={typeSx}>-</Typography>,
    },
    {
      title: "APR",
      content: <Typography sx={typeSx}>{aprFinal.toFixed(2)}%</Typography>,
    },
  ];
  return (
    <>
      {/* Main Container */}
      <Box sx={{ md: { p: "2rem 4rem" } }}>
        {/* Page Title */}
        <Box sx={{ background: palette.bgPrimary }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              padding: "1.5rem",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "1.5rem",
              borderRadius: "1.5rem",
              border: `1px solid ${palette.strokePrimary}}`,
              backdropFilter: "blur(20px)",
            }}
            bgcolor={palette.bgAlpha0}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                startIcon={
                  <ArrowLeft style={{ width: "24px", height: "24px" }} />
                }
                sx={{ p: "0.5rem" }}
                size="medium"
                type="secondary"
                onClick={() => router.push("/pools")}
              />
              <Box sx={{ display: "flex", ml: "1.5rem" }}>
                <Avatar
                  src="/cryptoIcons/usdt.svg"
                  alt="USDT"
                  sx={{ height: "3rem", width: "3rem" }}
                />
                <Avatar
                  src="/cryptoIcons/usdc.svg"
                  sx={{ ml: "-0.5rem", height: "3rem", width: "3rem" }}
                  alt="USDC"
                />
              </Box>
              <Typography
                sx={{
                  md: {
                    fontSize: "1.5rem",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "2rem",
                    color: palette.textLoud,
                    ml: "1rem",
                  },
                  xs: {
                    fontSize: "1rem",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "2rem",
                    color: palette.textLoud,
                    ml: "1rem",
                  },
                }}
              >
                {tokenA.name}/{tokenB.name}
              </Typography>
            </Box>

            {/* Cards */}
            <Grid container gap={{ xs: 1, md: 0 }}>
              {infoCardDetails.map((card, index) => (
                <Grid
                  sx={{ pl: { lg: index === 0 ? 0 : "1.5rem" } }}
                  item
                  lg={3}
                  md={6}
                  xs={12}
                  key={card.title}
                >
                  <Card title={card.title} content={card.content} />
                </Grid>
              ))}
            </Grid>

            {/* Provide Liquidity & Stake */}
            <Grid container>
              <Grid item xs={12} md={6}>
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
                      fontSize: "1.25rem",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "1.75rem",
                      color: palette.textLoud,
                    }}
                  >
                    Provide Liquidity
                  </Typography>
                </Box>
                <PoolLiquidityForm
                  {...provideLiquidityProps}
                  addLiquidityButtonDisabled={
                    !(
                      appStore.wallet.address &&
                      Number(tokenAValue) > 0 &&
                      Number(tokenAValue) <= microAmountToAmount(tokenA) &&
                      Number(tokenBValue) > 0 &&
                      Number(tokenBValue) <= microAmountToAmount(tokenB)
                    )
                  }
                  addLiquidityLoading={loading === "add"}
                  removeLiquidityButtonDisabled={
                    !(
                      appStore.wallet.address &&
                      Number(tokenLPValue) > 0 &&
                      Number(tokenLPValue) <= microAmountToAmount(tokenLP)
                    )
                  }
                  removeLiquidityLoading={loading === "remove"}
                  addLiquidityProps={[
                    {
                      token: tokenA,
                      onChange: (e) => {
                        setTokenAValue(e);
                        setTokenBValue((Number(e) / assetRatio).toFixed(5));
                      },
                      value: tokenAValue,
                      loading: loadBalances,
                    },
                    {
                      token: tokenB,
                      onChange: (e) => {
                        setTokenBValue(e);
                        setTokenAValue((Number(e) * assetRatio).toFixed(5));
                      },
                      value: tokenBValue,
                      loading: loadBalances,
                    },
                  ]}
                  removeLiquidityProps={{
                    token: tokenLP,
                    onChange: (e) => {
                      setTokenLPValue(e);
                    },
                    value: tokenLPValue,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ ml: { md: "1.5rem" } }}>
                  <Box
                    sx={{
                      display: "flex",
                      mt: { xs: "1rem", md: 0 },
                      padding: "0rem 1rem",
                      alignItems: "center",
                      gap: "0.5rem",
                      borderLeft: `1px solid ${palette.textLoud}`,
                      mb: "1rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.25rem",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "1.75rem",
                        color: palette.textLoud,
                      }}
                    >
                      Stake
                    </Typography>
                  </Box>
                  <PoolStakeForm
                    disabled={
                      !(
                        appStore.wallet.address &&
                        Number(stakingAmount) > 0 &&
                        Number(stakingAmount) <= microAmountToAmount(tokenLP)
                      )
                    }
                    loading={loading === "stake"}
                    tokenBoxProps={{
                      token: tokenLP,
                      onChange: (e) => {
                        setStakingAmount(e);
                      },
                      value: stakingAmount,
                      isStakeToken: true,
                      loading: loadStaking,
                    }}
                    stakeRewards={rewards}
                    stakeClick={() => stake()}
                    claimClick={() => claimRewards()}
                    changeStakePercentage={(percentage: number) => {
                      setStakingAmount(
                        (
                          (percentage *
                            microAmountToAmount({
                              ...tokenLP!,
                              balance: tokenLP.balance,
                            })) /
                          100
                        ).toFixed(5)
                      );
                    }}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* Staking Table */}
            <Box
              sx={{
                display: "flex",
                padding: "0rem 1rem",
                alignItems: "center",
                gap: "0.5rem",
                borderLeft: `1px solid ${palette.textLoud}`,
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "1.75rem",
                  color: palette.textLoud,
                }}
              >
                Currently Staking
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              {userClaims.length > 0 && (
                <Alert severity="info">
                  <Box>
                    You have unclaimed unbonding stakes. Click{" "}
                    <Link
                      onClick={() => setStakingModalOpen(true)}
                      sx={{ cursor: "pointer" }}
                    >
                      here
                    </Link>{" "}
                    to claim them.
                  </Box>
                </Alert>
              )}
              <StakingTable
                entries={userStakes}
                unstake={(tokenAmount, unbondingPeriod) => {
                  setAvailableUnstakeAmount(
                    microAmountToAmount({
                      balance: Number(tokenAmount),
                      decimals: 6,
                    } as Token)
                  );
                  setUnbondingPeriod(unbondingPeriod);

                  setUnstakeModalOpen(true);
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <StatusModal
        open={statusModalOpen}
        onClose={() => {
          setStatusModalOpen(false);
        }}
        status={statusModalType}
        txType={statusModalTxType}
        tokens={statusModalTokens}
      />
      <UnbondingModal
        open={stakingModalOpen}
        onClose={() => setStakingModalOpen(false)}
        claim={() => {}}
        lpToken={tokenLP}
        entries={userClaims}
      />
      <UnstakeModal
        open={unstakeModalOpen}
        disabled={
          !(unstakeAmount > 0 && unstakeAmount <= availableUnstakeAmount)
        }
        loading={loading === "unstake"}
        amount={unstakeAmount.toString()}
        onAmountChange={(amount: string) => {
          setUnstakeAmount(Number(amount));
        }}
        availableAmount={availableUnstakeAmount}
        onClose={() => setUnstakeModalOpen(false)}
        onClick={() => {
          unbond(
            amountToMicroAmount({
              balance: unstakeAmount,
              decimals: 6,
            } as Token),
            unbondingPeriod
          );

          setTimeout(() => appStore.fetchTokenBalance(tokenLPInfo), 1000);
        }}
      />
    </>
  );
}

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
  WhelpPoolClient,
  WhelpPoolQueryClient,
  WhelpPoolTypes,
  WhelpStakeClient,
  WhelpStakeQueryClient,
  WhelpStakeTypes,
} from "@whelp/contracts";
import { useAppStore } from "@whelp/state";
import { Token, UiTypes } from "@whelp/types";
import { amountToMicroAmount, microAmountToAmount } from "@whelp/utils";
import {
  Button,
  Card,
  palette,
  PoolLiquidityForm,
  PoolStakeForm,
  StakingTable,
  StatusModal,
  UnbondingModal,
} from "@whelp/ui";
import { TestnetConfig } from "@whelp/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "react-huge-icons/outline";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

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

  // Staking Values
  const [stakingAmount, setStakingAmount] = useState<string>("0");
  const [userStakes, setUserStakes] = useState<any[]>([]);
  const [loadStaking, setLoadStaking] = useState<boolean>(false);
  const [bondingDurations, setBondingDurations] = useState<number[]>([]);
  const [bondingDurationSelected, setBondingdurationSelected] =
    useState<number>(0);
  const [stakingModalOpen, setStakingModalOpen] = useState<boolean>(false);
  const [userClaims, setUserClaims] = useState<WhelpStakeTypes.Claim[]>([]);

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
      TestnetConfig.rpc_endpoint
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

  const getUserStakes = async (address: string, token: Token) => {
    // Get Clients
    const cosmWasmClient = await CosmWasmClient.connect(
      TestnetConfig.rpc_endpoint
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
          unbond(tokenAmount, unbondingPeriod);
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
    } catch (e) {
      setStatusModalOpen(true);
      setStatusModalType("error");
      setStatusModalTxType("stakeLp");
      setStatusModalTokens([]);
      console.log(e);
    }
  };

  // Unstake
  const unbond = async (tokenAmount: string, unbondingPeriod: number) => {
    try {
      const stakeClient = getStakeSigningClient();
      await stakeClient.unbond(
        {
          tokens: tokenAmount,
          unbondingPeriod: unbondingPeriod,
        },
        "auto",
        undefined
      );

      await getUserStakes(stakingAddress!, tokenLP);

      // Set Status
      setStatusModalType("success");
      setStatusModalTxType("unstakeLp");
      setStatusModalTokens([{ ...tokenLP, balance: Number(tokenAmount) }]);
      setStatusModalOpen(true);
    } catch (e) {
      setStatusModalOpen(true);
      setStatusModalType("error");
      setStatusModalTxType("unstakeLp");
      setStatusModalTokens([]);
      console.log(e);
    }
  };

  // Provide liquidity
  const provideLiquidity = async () => {
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

      appStore.fetchTokenBalance(tokenLPInfo);

      // Set Status
      setStatusModalType("success");
      setStatusModalTxType("addLiquidity");
      setStatusModalTokens([
        { ...tokenA, balance: Number(tokenAValue) },
        { ...tokenB, balance: Number(tokenBValue) },
      ]);
      setStatusModalOpen(true);
    } catch (e) {
      setStatusModalOpen(true);
      setStatusModalType("error");
      setStatusModalTxType("addLiquidity");
      setStatusModalTokens([]);
      console.log(e);
    }
  };

  // Remove Liquidity
  const removeLiquidity = async () => {
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
    } catch (e) {
      setStatusModalOpen(true);
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
      title: "Swap Fee",
      content: <Typography sx={typeSx}>-</Typography>,
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
                  addLiquidityProps={[
                    {
                      token: tokenA,
                      onChange: (e) => {
                        setTokenAValue(e);
                        setTokenBValue((Number(e) / assetRatio).toFixed(3));
                      },
                      value: tokenAValue,
                      loading: loadBalances,
                    },
                    {
                      token: tokenB,
                      onChange: (e) => {
                        setTokenBValue(e);
                        setTokenAValue((Number(e) * assetRatio).toFixed(3));
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
                    tokenBoxProps={{
                      token: tokenLP,
                      onChange: (e) => {
                        setStakingAmount(e);
                      },
                      value: stakingAmount,
                      isStakeToken: true,
                      loading: loadStaking,
                    }}
                    stakeRewards={100}
                    stakeClick={() => stake()}
                    claimClick={() => {}}
                    changeStakePercentage={(percentage: number) => {
                      setStakingAmount(
                        (
                          (percentage *
                            microAmountToAmount({
                              ...tokenLP!,
                              balance: tokenLP.balance,
                            })) /
                          100
                        ).toFixed(2)
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
                unstake={(tokenAmount, unbondingPeriod) =>
                  unbond(tokenAmount, unbondingPeriod)
                }
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
    </>
  );
}

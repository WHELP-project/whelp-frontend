"use client";
import { Box, Avatar, Typography, Grid } from "@mui/material";
import {
  WhelpPoolClient,
  WhelpPoolQueryClient,
  WhelpPoolTypes,
} from "@whelp/contracts";
import { useAppStore } from "@whelp/state";
import { Token } from "@whelp/types";
import {
  Button,
  Card,
  palette,
  PoolLiquidityForm,
  PoolStakeForm,
  StakingTable,
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

  // Token Values
  const [tokenAValue, setTokenAValue] = useState<string>("");
  const [tokenBValue, setTokenBValue] = useState<string>("");
  const [tokenLPValue, setTokenLPValue] = useState<string>("");

  // CosmWasmClient
  const [poolQueryClient, setPoolQueryClient] = useState<
    WhelpPoolQueryClient | undefined
  >(undefined);

  // Load initial data
  const init = async () => {
    setLoadBalances(true);
    const cosmWasmClient = await CosmWasmClient.connect(
      TestnetConfig.rpc_endpoint
    );
    const _poolQueryClient = new WhelpPoolQueryClient(
      cosmWasmClient,
      poolAddress
    );
    setPoolQueryClient(_poolQueryClient);
    if (!_poolQueryClient) return;
    const pairInfo = await _poolQueryClient.pair();

    const asset_a = pairInfo.asset_infos[0];
    const asset_b = pairInfo.asset_infos[1];
    const asset_lp = { smart_token: pairInfo.liquidity_token };

    const asset_a_info = await appStore.fetchTokenBalance(asset_a);
    const asset_b_info = await appStore.fetchTokenBalance(asset_b);
    const asset_lp_info = await appStore.fetchTokenBalance(asset_lp);

    setTokenA(asset_a_info);
    setTokenB(asset_b_info);
    setTokenLP(asset_lp_info);

    setTokenAInfo(asset_a);
    setTokenBInfo(asset_b);
    setTokenLPInfo(asset_lp);
    setLoadBalances(false);
  };

  const getPoolSigningClient = (): WhelpPoolClient => {
    const cosmWasmSigningClient = appStore.cosmWasmSigningClient!;
    return new WhelpPoolClient(
      cosmWasmSigningClient,
      appStore.wallet.address,
      poolAddress
    );
  };

  // Provide liquidity
  const provideLiquidity = async () => {
    const amounts: WhelpPoolTypes.Asset[] = [
      { amount: tokenAValue, info: tokenAInfo },
      {
        amount: tokenBValue,
        info: tokenBInfo,
      },
    ];

    const poolClient = getPoolSigningClient();
    await poolClient.provideLiquidity({ assets: amounts });
    appStore.fetchTokenBalance(tokenLPInfo);
  };

  // Remove Liquidity
  const removeLiquidity = async () => {
    const poolClient = getPoolSigningClient();
    // await poolClient.removeLiquidity({ share: "1000000" });
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStore.wallet.address]);

  const provideLiquidityProps = {
    addLiquidityClick: () => provideLiquidity(),
    removeLiquidityClick: () => removeLiquidity,
  };

  const stakeProps = {
    tokenBoxProps: {
      token: tokenLP,
      onChange: () => {},
      value: "0.00",
      isStakeToken: true,
    },
    stakeRewards: 100,
    stakeClick: () => {},
    claimClick: () => {},
    changeStakePercentage: (percentage: number) => {},
  };

  const infoCardDetails = [
    {
      title: "My Share",
      content: <Typography sx={typeSx}>-</Typography>,
    },
    {
      title: "Lp Tokens",
      content: <Typography sx={typeSx}>{tokenLP.balance}</Typography>,
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
      <Box sx={{ p: "2rem 4rem" }}>
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
                  fontSize: "1.5rem",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "2rem",
                  color: palette.textLoud,
                  ml: "1rem",
                }}
              >
                {tokenA.name}/{tokenB.name}
              </Typography>
            </Box>

            {/* Cards */}
            <Grid container>
              {infoCardDetails.map((card, index) => (
                <Grid
                  sx={{ pl: index === 0 ? 0 : "1.5rem" }}
                  item
                  xs={3}
                  key={card.title}
                >
                  <Card title={card.title} content={card.content} />
                </Grid>
              ))}
            </Grid>

            {/* Provide Liquidity & Stake */}
            <Grid container>
              <Grid item xs={6}>
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
                      },
                      value: tokenAValue,
                      loading: loadBalances,
                    },
                    {
                      token: tokenB,
                      onChange: (e) => {
                        setTokenBValue(e);
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
              <Grid item xs={6}>
                <Box sx={{ ml: "1.5rem" }}>
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
                      Stake
                    </Typography>
                  </Box>
                  <PoolStakeForm {...stakeProps} />
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
              <StakingTable entries={[]} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

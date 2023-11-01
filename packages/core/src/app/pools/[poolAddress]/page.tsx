"use client";
import { Box, Avatar, Typography, Grid } from "@mui/material";
import { Token } from "@whelp/types";
import {
  Button,
  Card,
  palette,
  PoolLiquidityForm,
  PoolStakeForm,
  StakingTable,
} from "@whelp/ui";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "react-huge-icons/outline";

export default function SwapPage() {
  const router = useRouter();

  const typeSx = {
    color: palette.textLoud,
    fontSize: "2rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "2.5rem",
  };

  const mockToken: Token = {
    name: "USDC",
    icon: "/cryptoIcons/usdt.svg",
    balance: 100,
    category: "Stable",
    usdValue: 1 * 100,
  };

  const provideLiquidityProps = {
    addLiquidityProps: [
      {
        token: mockToken,
        onChange: () => {},
        value: "0.00",
      },
      {
        token: mockToken,
        onChange: () => {},
        value: "0.00",
      },
    ],
    removeLiquidityProps: {
      token: mockToken,
      onChange: () => {},
      value: "0.00",
    },
    addLiquidityClick: () => {},
    removeLiquidityClick: () => {},
  };

  const stakeProps = {
    tokenBoxProps: {
      token: mockToken,
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
      content: <Typography sx={typeSx}>$560</Typography>,
    },
    {
      title: "Lp Tokens",
      content: <Typography sx={typeSx}>$560</Typography>,
    },
    {
      title: "TVL",
      content: <Typography sx={typeSx}>$560</Typography>,
    },
    {
      title: "Swap Fee",
      content: <Typography sx={typeSx}>$560</Typography>,
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
                USDT / USDC
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
                <PoolLiquidityForm {...provideLiquidityProps} />
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

"use client";

import { useAppStore } from "@whelp/state";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import {
  MainnetConfig,
  WhelpFactoryAddress,
  amountToMicroAmount,
} from "@whelp/utils";
import { getCustomClient } from "@whelp/wallets";
import { WhelpFactoryQueryClient } from "@whelp/contracts";
import { Token, UiTypes } from "@whelp/types";
import { useEffect, useState } from "react";
import {
  AssetList,
  Card,
  LoaderVideo,
  IbcDepositModal,
  Button,
  ConnectWalletButton,
} from "@whelp/ui";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { palette } from "@whelp/ui";
import { useRouter } from "next/navigation";
import { SigningStargateClient } from "@cosmjs/stargate";

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
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  const [ibcModalOpen, setIbcModalOpen] = useState<boolean>(false);
  const [ibcModalAmount, setIbcModalAmount] = useState<string>("");

  const [ibcAddress, setIbcAddress] = useState<string>("");
  const [ibcSigningClient, setIbcSigningClient] = useState<
    SigningStargateClient | undefined
  >(undefined);

  const [usdSum, setUsdSum] = useState<string>("0.00");

  // Router
  const router = useRouter();

  // Get pools to fetch all tokens from it
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

    const allPools: Promise<UiTypes.Pool>[] = fetchedPools.map(async (pool) => {
      // Get Tokens
      const token_a = await appStore.fetchTokenBalance(pool.asset_infos[0]);
      const token_b = await appStore.fetchTokenBalance(pool.asset_infos[1]);

      // Return Pool
      return {
        token_a,
        token_b,
        tvl: "0",
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

    const _usdSum = uniqueTokens
      .reduce((acc, token) => {
        return acc + (token.usdValue * token.balance) / 10 ** token.decimals;
      }, 0)
      .toFixed(2);
    setUsdSum(_usdSum);
    setPageLoaded(true);
    return uniqueTokens;
  };

  // Fetch all tokens
  useEffect(() => {
    fetchTokens().then((tokens) => setAllTokens(tokens));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStore.wallet.address]);

  const onIbcClick = async (token: Token) => {
    const customClient = await getCustomClient(appStore.wallet.type, "cosmos");

    if (customClient) {
      setIbcSigningClient(customClient.client);
      setIbcAddress(customClient.account.address);
    }

    setIbcModalOpen(true);
  };

  const onDeposit = async () => {
    try {
      const OneDayFromNowInSeconds = Math.floor(Date.now() / 1000) + 86400;

      const coinToSend = {
        denom: "",
        amount: 2,
      };

      if (!ibcSigningClient) return;
      /*
      await ibcSigningClient.sendIbcTokens(
        ibcAddress,
        appStore.wallet.address,
        coinToSend,
        "transfer",
        asset.channel,
        undefined,
        OneDayFromNowInSeconds,
        "auto"
      );
      */
    } catch (err) {
      console.log(err);
    }
  };

  const onWithdraw = async () => {
    try {
      const OneDayFromNowInSeconds = Math.floor(Date.now() / 1000) + 86400;

      const coinToSend = {
        denom: "",
        amount: 2,
      };

      if (!ibcSigningClient) return;

      /*
      await ibcSigningClient.sendIbcTokens(
        appStore.wallet.address,
        ibcAddress,
        coinToSend,
        "transfer",
        "0",
        undefined,
        OneDayFromNowInSeconds,
        "auto"
      );
      */
    } catch (err) {
      console.log(err);
    }
  };

  const AddPoolBox = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>
          Whelp is happy to introduce the first <br />
          <strong>Permissionless DEX </strong>on Coreum!
        </Typography>
        <Button
          onClick={() => router.push("/pools?create_pool")}
          label={"Create a new pool!"}
        />
      </Box>
    );
  };

  return (
    <>
      <main>
        {pageLoaded ? (
          <Box
            sx={{
              maxWidth: "1216px",
              margin: "0 auto",
              padding: "2rem",
            }}
          >
            <Box sx={{ background: palette.bgPrimary }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Card
                    title={"Welcome!"}
                    content={
                      <Typography>Great that you{"'"}re here!</Typography>
                    }
                    warning={false}
                  />
                </Grid>
                <Grid item xs={12} md={9}>
                  <Card
                    title={"Empty here?"}
                    content={<AddPoolBox />}
                    warning={false}
                  />
                </Grid>
              </Grid>
              <Divider
                sx={{ my: "1.5rem", background: palette.strokePrimary }}
              />
              <AssetList
                entries={allTokens}
                onClick={(token) =>
                  router.push(`/swap?fromToken=${token.tokenAddress}`)
                }
                onIbcClick={onIbcClick}
                showIbc={appStore.wallet.isConnected as boolean}
              />
            </Box>
          </Box>
        ) : (
          <LoaderVideo variant={1} />
        )}
      </main>
      <IbcDepositModal
        open={ibcModalOpen}
        fromAddress={appStore.wallet.address}
        toAddress={"foo"}
        availableAmountDeposit={300}
        availableAmountWithdraw={500}
        amount={ibcModalAmount}
        onAmountChange={(amount: string) => setIbcModalAmount(amount)}
        onClose={() => setIbcModalOpen(false)}
        onDepositClick={onDeposit}
        onWithdrawClick={onWithdraw}
      />
    </>
  );
}

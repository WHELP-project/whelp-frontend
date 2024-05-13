import { StateTypes, WalletTypes, Token } from "@whelp/types";
import {
  SigningCosmWasmClient,
  CosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { MainnetConfig, isCw20Token } from "@whelp/utils";
import { getWalletClient } from "@whelp/wallets";
import { assets, chains } from "chain-registry";
import { useAppStore, usePersistStore } from "../store";
import { Cw20QueryClient, WhelpPoolTypes } from "@whelp/contracts";

// Helper function to find chain and asset based on the chain name
const findChainAsset = (chainName: string) => {
  const chain = chains.find((c) => c.chain_name === chainName)!;
  const assetList = assets.find((asset) => asset.chain_name === chainName)!;
  return { chain, assetList };
};

const beautifyName = (name: string): string => {
  let match = name.match(/[a-zA-Z]*[a-zA-Z]{2}/);
  return match
    ? match[0].replace(/^u/, "").charAt(0).toUpperCase() +
        match[0].replace(/^u/, "").slice(1)
    : "";
};

// Function to add a new chain to the wallet client
const addChain = async (
  WalletClient: WalletTypes.Wallet,
  chainAsset: string
) => {
  const { chain, assetList } = findChainAsset(chainAsset);

  return await WalletClient.addChain?.({
    name: chainAsset,
    chain: chain,
    assetList,
  });
};

// Function to update the global state
const updateState = (
  account: any,
  walletType: WalletTypes.WalletTypes,
  cosmWasmClient: SigningCosmWasmClient
) => {
  useAppStore.setState((state: StateTypes.AppStore) => ({
    ...state,
    wallet: {
      address: account.address,
      isConnected: true,
      type: walletType,
    },
    cosmWasmSigningClient: cosmWasmClient,
  }));
};

// Generic function to connect to a wallet
const connectWalletGeneric = async (
  walletClient: any,
  envConfig: any,
  walletType: WalletTypes.WalletTypes
) => {
  await walletClient.enable(envConfig.chain_id);
  const account = await walletClient.getAccount(envConfig.chain_id);
  const cosmWasmClient: SigningCosmWasmClient =
    await walletClient.getSigningCosmWasmClient();
  updateState(account, walletType, cosmWasmClient);
};

// Main function to create wallet actions
export const createWalletActions = (
  setState: StateTypes.SetStateType,
  getState: StateTypes.GetStateType
): StateTypes.WalletActions => {
  return {
    // Initialize default state
    wallet: {
      address: "",
      isConnected: false,
      type: WalletTypes.WalletTypes.Leap,
    },
    cosmWasmSigningClient: undefined,
    tokens: [],

    // Function to connect wallet
    connectWallet: async (
      walletId: WalletTypes.WalletTypes,
      env: "prod" | "dev"
    ) => {
      // Determine environment configuration
      const envConfig = MainnetConfig;

      const walletClient = await getWalletClient(walletId);

      await connectWalletGeneric(walletClient, envConfig, walletId);

      usePersistStore.setState((state: StateTypes.AppStorePersist) => ({
        type: getState().wallet.type,
        isConnected: true,
      }));
    },
    // Function to disconnect wallet (placeholder)
    disconnectWallet: () => {
      setState((state: StateTypes.AppStore) => ({
        ...state,
        wallet: {
          address: "",
          isConnected: false,
          type: WalletTypes.WalletTypes.Leap,
        },
        cosmWasmSigningClient: undefined,
      }));

      usePersistStore.setState((state: StateTypes.AppStorePersist) => ({
        ...state,
        isConnected: false,
      }));
    },

    // Fetch token
    fetchTokenBalance: async (asset: WhelpPoolTypes.AssetInfo) => {
      const cosmWasmClient = await CosmWasmClient.connect(
        MainnetConfig.rpc_endpoint
      );
      let balance: number;
      let denom: string;
      let decimals: number;

      if (isCw20Token(asset)) {
        const cw20Client = new Cw20QueryClient(
          cosmWasmClient,
          asset.cw20_token
        );
        if (
          getState().wallet.address === "" ||
          getState().wallet.address === undefined
        ) {
          balance = 0;
        } else {
          balance = Number(
            (
              await cw20Client.balance({
                address: getState().wallet.address,
              })
            ).balance
          );
        }
        const tokenInfo = await cw20Client.tokenInfo();

        decimals = tokenInfo.decimals;
        denom = tokenInfo.symbol;
      } else {
        if (
          getState().wallet.address === "" ||
          getState().wallet.address === undefined
        ) {
          balance = 0;
        } else {
          console.log(getState().wallet.address);
          const query = await cosmWasmClient.getBalance(
            getState().wallet.address,
            asset.smart_token
          );
          balance = Number(query.amount);
        }

        decimals = 6; // !TODO!

        denom = asset.smart_token;
      }

      let prettyName = beautifyName(denom);

      if (prettyName.toLowerCase() === "core") {
        prettyName = "Coreum";
      } else if (prettyName.toLowerCase() === "drop") {
        prettyName = "XRP";
      }
      // Update token balance
      useAppStore.setState((state: StateTypes.AppStore) => {
        const updatedTokens: Token[] = state.tokens.map((token: Token) =>
          token.tokenAddress ===
          (isCw20Token(asset) ? asset.cw20_token : asset.smart_token)
            ? { ...token, balance, decimals }
            : token
        );
        // If token couldnt be found, add it
        if (
          !updatedTokens.find(
            (token: Token) =>
              token.tokenAddress ===
              (isCw20Token(asset) ? asset.cw20_token : asset.smart_token)
          )
        ) {
          updatedTokens.push({
            name: prettyName,
            icon: prettyName.endsWith("lp")
              ? "/cryptoIcons/lp.svg"
              : `/cryptoIcons/${prettyName.toLowerCase()}.svg`,
            usdValue: 1,
            balance: balance,
            category: "",
            decimals,
            tokenAddress: isCw20Token(asset)
              ? asset.cw20_token
              : asset.smart_token,
            type: isCw20Token(asset) ? "cw20" : "smart",
          });
        }
        return { tokens: updatedTokens };
      });

      return {
        name: prettyName,
        icon: prettyName.endsWith("lp")
          ? "/cryptoIcons/lp.svg"
          : `/cryptoIcons/${prettyName.toLowerCase()}.svg`,
        usdValue: 1,
        balance: balance,
        category: "",
        decimals,
        tokenAddress: isCw20Token(asset) ? asset.cw20_token : asset.smart_token,
        type: isCw20Token(asset) ? "cw20" : "smart",
      };
    },

    // Fetch multiple tokens
    fetchTokenBalances: async (assets: WhelpPoolTypes.AssetInfo[]) => {
      const tokens = await Promise.all(
        assets.map(
          async (asset) => await useAppStore().fetchTokenBalance(asset)
        )
      );
      return tokens;
    },
  };
};

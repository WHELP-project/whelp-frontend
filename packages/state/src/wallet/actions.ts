import { StateTypes, WalletTypes, Token } from "@whelp/types";
import {
  SigningCosmWasmClient,
  CosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import {
  MainnetConfig,
  TestnetConfig,
  isCw20Token,
  isSmartToken,
} from "@whelp/utils";
import {
  Cosmostation,
  Keplr,
  Leap,
  getCosmostationFromExtension,
  getKeplrFromExtension,
  getLeapFromExtension,
} from "@whelp/wallets";
import { assets, chains } from "chain-registry";
import { useAppStore, usePersistStore } from "../store";
import { Cw20QueryClient, WhelpPoolTypes } from "@whelp/contracts";

// Helper function to find chain and asset based on the chain name
const findChainAsset = (chainName: string) => {
  const chain = chains.find((c) => c.chain_name === chainName)!;
  const assetList = assets.find((asset) => asset.chain_name === chainName)!;
  return { chain, assetList };
};

// Function to add a new chain to the wallet client
const addChain = async (WalletClient: WalletTypes.Wallet) => {
  const { chain, assetList } = findChainAsset("coreumtestnet");
  return await WalletClient.addChain?.({
    name: "coreumtestnet",
    chain: { ...chain, chain_name: "coreumtestnet" },
    assetList,
    preferredEndpoints: {
      rpc: ["https://full-node.testnet-1.coreum.dev:26657"],
      rest: ["https://full-node.testnet-1.coreum.dev:1317"],
    },
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
  const cosmWasmClient = await walletClient.getSigningCosmWasmClient();
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
    cosmWasmQueryClient: undefined,
    tokens: [],

    init: async () => {
      const cosmWasmClient = await CosmWasmClient.connect(
        TestnetConfig.rpc_endpoint
      );
      useAppStore.setState((state: StateTypes.AppStore) => ({
        ...state,
        cosmWasmQueryClient: cosmWasmClient,
      }));
    },

    // Function to connect wallet
    connectWallet: async (
      walletId: WalletTypes.WalletTypes,
      env: "prod" | "dev"
    ) => {
      // Determine environment configuration
      const envConfig = env === "prod" ? MainnetConfig : TestnetConfig;

      // Switch case for different wallet types
      switch (walletId) {
        // Case for Leap Wallet
        case WalletTypes.WalletTypes.Leap:
          const LeapClient = await getLeapFromExtension();
          if (!LeapClient) throw new Error("No Leap client found");
          const LeapWalletClient = new Leap(LeapClient);

          // Add chain if in dev environment
          if (env === "dev") await addChain(LeapWalletClient);

          // Generic wallet connection logic
          await connectWalletGeneric(
            LeapWalletClient,
            envConfig,
            WalletTypes.WalletTypes.Leap
          );
          break;

        // Case for Cosmostation Wallet
        case WalletTypes.WalletTypes.Cosmostation:
          const CosmoStationClient = await getCosmostationFromExtension();
          if (!CosmoStationClient)
            throw new Error("No Cosmostation client found");
          const CosmostationWalletClient = new Cosmostation(CosmoStationClient);

          // Add chain if in dev environment
          if (env === "dev") await addChain(CosmostationWalletClient);

          // Generic wallet connection logic
          await connectWalletGeneric(
            CosmostationWalletClient,
            envConfig,
            WalletTypes.WalletTypes.Cosmostation
          );
          break;

        // Case for Keplr Wallet
        case WalletTypes.WalletTypes.Keplr:
          const KeplrClient = await getKeplrFromExtension();
          if (!KeplrClient) throw new Error("No Keplr client found");
          const KeplrWalletClient = new Keplr(KeplrClient);

          // Add chain if in dev environment
          if (env === "dev") await addChain(KeplrWalletClient);

          // Generic wallet connection logic
          await connectWalletGeneric(
            KeplrWalletClient,
            envConfig,
            WalletTypes.WalletTypes.Keplr
          );
          break;
        default:
          break;
      }

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
        TestnetConfig.rpc_endpoint
      );
      let balance: number;
      let denom: string;
      let decimals: number;

      if (isCw20Token(asset)) {
        const cw20Client = new Cw20QueryClient(
          cosmWasmClient,
          asset.cw20_token
        );
        balance = Number(
          (
            await cw20Client.balance({
              address: getState().wallet.address,
            })
          ).balance
        );

        const tokenInfo = await cw20Client.tokenInfo();

        decimals = tokenInfo.decimals;
        denom = tokenInfo.symbol;
      } else {
        const query = await cosmWasmClient.getBalance(
          getState().wallet.address,
          asset.smart_token
        );
        decimals = 6; // !TODO!
        balance = Number(query.amount);
        denom = query.denom;
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
            name: denom,
            icon: "",
            usdValue: 0,
            balance: balance,
            category: "",
            tokenAddress: isCw20Token(asset)
              ? asset.cw20_token
              : asset.smart_token,
            type: isCw20Token(asset) ? "cw20" : "smart",
          });
        }
        return { tokens: updatedTokens };
      });

      return {
        name: denom,
        icon: "",
        usdValue: 0,
        balance: balance,
        category: "",
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

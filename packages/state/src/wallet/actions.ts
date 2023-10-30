import { StateTypes, WalletTypes } from "@whelp/types";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { MainnetConfig, TestnetConfig } from "@whelp/utils";
import {
  Cosmostation,
  Keplr,
  Leap,
  getCosmostationFromExtension,
  getKeplrFromExtension,
  getLeapFromExtension,
} from "@whelp/wallets";
import { assets, chains } from "chain-registry";
import { useAppStore } from "../store";

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
  console.log(walletClient);
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
    },
    // Function to disconnect wallet (placeholder)
    disconnectWallet: () => {
      useAppStore.setState((state: StateTypes.AppStore) => ({
        ...state,
        wallet: {
          address: "",
          isConnected: false,
          type: WalletTypes.WalletTypes.Leap,
        },
        cosmWasmSigningClient: undefined,
      }));
    },
  };
};

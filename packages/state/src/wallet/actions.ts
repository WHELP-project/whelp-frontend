import { StateTypes, WalletTypes } from "@whelp/types";
import { MainnetConfig, TestnetConfig } from "@whelp/utils";
import {
  Cosmostation,
  Leap,
  getCosmostationFromExtension,
  getLeapFromExtension,
} from "@whelp/wallets";
import { assets, chains } from "chain-registry";
import { useAppStore } from "../store";
import { AppStore } from "@whelp/types/build/state";
import { Algo } from "@cosmjs/proto-signing";

// Add chain is sometimes needed when connecting to a testnet
const addChain = async (WalletClient: WalletTypes.Wallet) => {
  const coreumTestnetChain = chains.find(
    (chain) => chain.chain_name === "coreumtestnet"
  )!;
  const coreumTestnetAssetList = assets.find(
    (asset) => asset.chain_name === "coreumtestnet"
  )!;

  return await WalletClient.addChain?.({
    name: "coreumtestnet",
    chain: { ...coreumTestnetChain, chain_name: "coreumtestnet" },
    assetList: coreumTestnetAssetList,
    preferredEndpoints: {
      rpc: ["https://full-node.testnet-1.coreum.dev:26657"],
      rest: ["https://full-node.testnet-1.coreum.dev:1317"],
    },
  });
};

export const createWalletActions = (
  setState: StateTypes.SetStateType,
  getState: StateTypes.GetStateType
): StateTypes.WalletActions => {
  return {
    wallet: {
      address: "",
      isConnected: false,
      type: WalletTypes.WalletTypes.Leap,
    },
    cosmWasmSigningClient: {},
    connectWallet: async (
      walletId: WalletTypes.WalletTypes,
      env: "prod" | "dev"
    ) => {
      // Check envoirment file if its prod or dev
      const envConfig = env === "prod" ? MainnetConfig : TestnetConfig;

      let account: {
        username: string;
        address: string;
        algo: Algo;
        pubkey: Uint8Array;
      };

      // Check what kind of wallet it is
      switch (walletId) {
        // Leap
        case WalletTypes.WalletTypes.Leap:
          // Get the leap client
          const LeapClient = await getLeapFromExtension();
          if (!LeapClient) {
            throw new Error("No Leap client found");
          }
          const LeapWalletClient = new Leap(LeapClient);

          // If is tesnet, add chain
          if (env === "dev") {
            await addChain(LeapWalletClient);
          }

          // Enable / Connect wallet
          await LeapWalletClient.enable(envConfig.chain_id);

          // Get account (Wallet address)
          account = await LeapWalletClient.getAccount(envConfig.chain_id);

          useAppStore.setState((state: AppStore) => ({
            ...state,
            wallet: {
              address: account.address,
              isConnected: true,
              type: WalletTypes.WalletTypes.Leap,
            },
          }));
          break;

        // Cosmostation
        case WalletTypes.WalletTypes.Cosmostation:
          // Get Cosmostation client
          const CosmoStationClient = await getCosmostationFromExtension();
          if (!CosmoStationClient) {
            throw new Error("No Cosmostation client found");
          }
          const CosmostationWalletClient = new Cosmostation(CosmoStationClient);

          // If is testnet, add chain
          if (env === "dev") {
            await addChain(CosmostationWalletClient);
          }

          // Enable / Connect wallet
          await CosmostationWalletClient.ikeplr.enable(envConfig.chain_id);

          // Get account (Wallet address)
          account = await CosmostationWalletClient.getAccount(
            envConfig.chain_id
          );

          useAppStore.setState((state: AppStore) => ({
            ...state,
            wallet: {
              address: account.address,
              isConnected: true,
              type: WalletTypes.WalletTypes.Cosmostation,
            },
          }));

        default:
      }
    },
    disconnectWallet: () => {},
  };
};

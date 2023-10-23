import { StateTypes, WalletTypes } from "@whelp/types";
import { MainnetConfig, TestnetConfig } from "@whelp/utils";
import { Leap, getLeapFromExtension } from "@whelp/wallets";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useAppStore } from "../store";
import { AppStore } from "@whelp/types/build/state";

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
    connectWallet: async (walletId: WalletTypes.WalletTypes) => {
      switch (walletId) {
        case WalletTypes.WalletTypes.Leap:
          const LeapClient = await getLeapFromExtension();
          if (!LeapClient) {
            throw new Error("No Leap client found");
          }
          const WalletClient = new Leap(LeapClient);
          await WalletClient.enable(MainnetConfig.chain_id);

          const account = await WalletClient.getAccount(MainnetConfig.chain_id);

          useAppStore.setState((state: AppStore) => ({
            ...state,
            wallet: {
              address: account.address,
              isConnected: true,
              type: WalletTypes.WalletTypes.Leap,
            },
          }));
          break;
        default:
      }
    },
    disconnectWallet: () => {},
  };
};

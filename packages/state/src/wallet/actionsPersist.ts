import { StateTypes, WalletTypes } from "@whelp/types";
import { usePersistStore } from "../store";

// Main function to create wallet actions
export const createPersistActions = (): StateTypes.WalletPersistActions => {
  return {
    type: WalletTypes.WalletTypes.Leap,
    isConnected: false,
  };
};

import { create } from "zustand";
import { StateTypes } from "@whelp/types";
import { createWalletActions } from "./wallet/actions";

export const useAppStore = create<StateTypes.AppStore>()((set, get) => {
  const wallet = createWalletActions(set, get);

  return {
    ...wallet,
  };
});

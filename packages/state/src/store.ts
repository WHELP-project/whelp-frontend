import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { StateTypes } from "@whelp/types";
import { createWalletActions } from "./wallet/actions";
import { createPersistActions } from "./wallet/actionsPersist";

export const useAppStore = create<StateTypes.AppStore>()((set, get) => {
  const wallet = createWalletActions(set, get);

  return {
    ...wallet,
  };
});

export const usePersistStore = create<StateTypes.AppStorePersist>()(
  persist(
    (set, get) => {
      const state = createPersistActions();
      return {
        ...state,
      };
    },
    {
      name: "wallet-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

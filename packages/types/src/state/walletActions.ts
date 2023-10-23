import { SigningCosmWasmClientOptions } from "@cosmjs/cosmwasm-stargate";
import { WalletTypes } from "../wallet";

export interface WalletActions {
  connectWallet: (type: WalletTypes) => Promise<void>;
  disconnectWallet: () => void;
  cosmWasmSigningClient: SigningCosmWasmClientOptions;
  wallet: {
    address: string;
    isConnected?: boolean;
    type: WalletTypes;
  };
}

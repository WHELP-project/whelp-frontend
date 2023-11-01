import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { WalletTypes } from "../wallet";
import { WhelpPoolTypes } from "@whelp/contracts";
import { Token } from "../general";

export interface WalletActions {
  connectWallet: (type: WalletTypes, env: "dev" | "prod") => Promise<void>;
  disconnectWallet: () => void;
  cosmWasmSigningClient: SigningCosmWasmClient | undefined;
  cosmWasmQueryClient: CosmWasmClient | undefined;
  fetchTokenBalance: (asset: WhelpPoolTypes.AssetInfo) => Promise<Token>;
  fetchTokenBalances: (assets: WhelpPoolTypes.AssetInfo[]) => Promise<Token[]>;
  tokens: Token[];
  wallet: {
    address: string;
    isConnected?: boolean;
    type: WalletTypes;
  };
  init: () => Promise<void>;
}

export interface WalletPersistActions {
  type: WalletTypes;
  isConnected?: boolean;
}

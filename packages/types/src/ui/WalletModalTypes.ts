import { WalletTypes } from "..";

export interface WalletModalProps {
  wallets: {
    type: WalletTypes.WalletTypes;
    name: string;
    icon: string;
    onClick: () => void;
  }[];
  open: boolean;
  onClose: () => void;
}

import { WalletTypes } from "..";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

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

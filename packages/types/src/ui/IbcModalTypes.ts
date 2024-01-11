import { Token } from "../general";

export interface IbcDepositModalProps {
  open: boolean;
  type: "DEPOSIT" | "WITHDRAW";
  fromAddress: string;
  toAddress: string;
  availableAmount: number;
  amount: number;
  onAmountChange: (amount: number) => void;
  onClose: () => void;
  onClick: () => void;
}

import { Token } from "../general";

export interface IbcDepositModalProps {
  open: boolean;
  type: "DEPOSIT" | "WITHDRAW";
  fromToken: Token;
  fromAddress: string;
  toToken: Token;
  toAddress: string;
  availableAmount: number;
  amount: number;
  onAmountChange: (amount: number) => void;
  onClose: () => void;
  onClick: () => void;
}

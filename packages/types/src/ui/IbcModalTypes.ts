import { Token } from "../general";

export interface IbcDepositModalProps {
  open: boolean;
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

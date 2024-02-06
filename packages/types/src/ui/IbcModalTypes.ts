import { Token } from "../general";

export interface IbcDepositModalProps {
  open: boolean;
  fromAddress: string;
  toAddress: string;
  availableAmountDeposit: number;
  availableAmountWithdraw: number;
  amount: string;
  onAmountChange: (string: string) => void;
  onClose: () => void;
  onDepositClick: () => void;
  onWithdrawClick: () => void;
}

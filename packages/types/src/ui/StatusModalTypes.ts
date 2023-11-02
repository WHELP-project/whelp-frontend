import { Token } from "../general";

export type Status = "success" | "error" | "warning" | "info";
export type TxType =
  | "addLiquidity"
  | "withdrawLiquidity"
  | "swap"
  | "stakeLp"
  | "unstakeLp";

export interface StatusModalProps {
  tokens?: Token[];
  status: Status;
  txType: TxType;
  open: boolean;
  onClose: () => void;
}

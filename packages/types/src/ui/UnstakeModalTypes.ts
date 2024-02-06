export interface UnstakeModalProps {
  open: boolean;
  disabled: boolean;
  loading: boolean;
  availableAmount: number;
  amount: string;
  onAmountChange: (amount: string) => void;
  onClose: () => void;
  onClick: () => void;
}

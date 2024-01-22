export interface UnstakeModalProps {
  open: boolean;
  disabled: boolean;
  loading: boolean;
  availableAmount: number;
  amount: number;
  onAmountChange: (amount: number) => void;
  onClose: () => void;
  onClick: () => void;
}

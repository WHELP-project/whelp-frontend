export interface OnRampModalProps {
  open: boolean;
  onClose: () => void;
  walletAddress: string
  apiKey: string;
  network: string;
}

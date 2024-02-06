import { Token } from "../general";

export interface SwapContainerProps {
  from_token: Token;
  to_token: Token;
  from_amount: string;
  to_amount: string;
  tokens: Token[];
  onFromTokenChange: (token: Token) => void;
  onToTokenChange: (token: Token) => void;
  onFromAmountChange: (amount: string) => void;
  onToAmountChange: (amount: string) => void;
  onSwap: () => void;
  buttonDisabled?: boolean;
  slippageTolerance: number;
  setSlippageTolerance: (slippageTolerance: number) => void;
  simulateLoading: boolean;
  swapLoading: boolean;
  maxFromAmount: number;
  switchTokens: () => void;
}

export interface SlippagePopupProps {
  anchorEl: any;
  onClose: () => void;
  slippageTolerance: number;
  setSlippageTolerance: (slippageTolerance: number) => void;
}

export interface AssetSelectorProps {
  selectedToken: Token;
  tokens: Token[];
  onSelect: (token: Token) => void;
}

export interface SwapStatsProps {
  exchangeRateText: string;
  networkFeeText: string;
  route: string[];
  maximumSpreadText: string;
  simulateLoading: boolean;
}

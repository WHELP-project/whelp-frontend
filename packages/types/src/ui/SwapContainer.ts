import { Token } from "../general";

export interface SwapContainerProps {
  from_token: Token;
  to_token: Token;
  from_amount: number;
  to_amount: number;
  tokens: Token[];
  onFromTokenChange: (token: Token) => void;
  onToTokenChange: (token: Token) => void;
  onFromAmountChange: (amount: number) => void;
  onToAmountChange: (amount: number) => void;
  onSwap: () => void;
  buttonDisabled?: boolean;
  slippageTolerance: number;
  setSlippageTolerance: (slippageTolerance: number) => void;
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

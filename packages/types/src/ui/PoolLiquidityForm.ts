import { TokenBoxProps } from "./TokenBox";

export interface PoolLiquidityProps {
  addLiquidityButtonDisabled: boolean;
  addLiquidityLoading: boolean;
  removeLiquidityButtonDisabled: boolean;
  removeLiquidityLoading: boolean;
  addLiquidityProps: TokenBoxProps[];
  removeLiquidityProps: TokenBoxProps;
  addLiquidityClick: (e: any) => void;
  removeLiquidityClick: (e: any) => void;
}

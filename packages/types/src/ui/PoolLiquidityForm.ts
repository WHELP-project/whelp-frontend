import { TokenBoxProps } from "./TokenBox";

export interface PoolLiquidityProps {
  addLiquidityButtonDisabled: boolean;
  removeLiquidityButtonDisabled: boolean;
  addLiquidityProps: TokenBoxProps[];
  removeLiquidityProps: TokenBoxProps;
  addLiquidityClick: (e: any) => void;
  removeLiquidityClick: (e: any) => void;
}

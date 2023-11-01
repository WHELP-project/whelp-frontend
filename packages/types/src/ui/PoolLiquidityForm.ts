import { TokenBoxProps } from "./TokenBox";

export interface PoolLiquidityProps {
  addLiquidityProps: TokenBoxProps[];
  removeLiquidityProps: TokenBoxProps;
  addLiquidityClick: (e: any) => void;
  removeLiquidityClick: (e: any) => void;
}

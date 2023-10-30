import { TokenBoxProps } from "./TokenBox";

export interface PoolLiquidityProps {
  addLiquidityProps: TokenBoxProps[];
  removeLiquidityProps: TokenBoxProps;
  addLiquidityClick: () => void;
  removeLiquidityClick: () => void;
}

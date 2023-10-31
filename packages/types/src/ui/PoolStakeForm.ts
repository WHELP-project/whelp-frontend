import { TokenBoxProps } from "./TokenBox";

export interface PoolStakeProps {
  tokenBoxProps: TokenBoxProps;
  stakeRewards: number;
  stakeClick: () => void;
  claimClick: () => void;
  changeStakePercentage: (percentage: number) => void;
  disabled: boolean;
}

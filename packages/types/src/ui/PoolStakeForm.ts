import { TokenBoxProps } from "./TokenBox";

export interface PoolStakeProps {
  disabled: boolean;
  tokenBoxProps: TokenBoxProps;
  stakeRewards: number;
  stakeClick: () => void;
  claimClick: () => void;
  changeStakePercentage: (percentage: number) => void;
}

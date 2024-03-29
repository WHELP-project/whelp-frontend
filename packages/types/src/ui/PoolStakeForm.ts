import { AssetValidated } from "@whelp/contracts/build/types/WhelpPool.types";
import { TokenBoxProps } from "./TokenBox";

export interface StakeReward {
  symbol: string;
  amount: string;
}

export interface PoolStakeProps {
  disabled: boolean;
  loading: boolean;
  tokenBoxProps: TokenBoxProps;
  stakeRewards: StakeReward[];
  stakeClick: () => void;
  claimClick: () => void;
  changeStakePercentage: (percentage: number) => void;
}

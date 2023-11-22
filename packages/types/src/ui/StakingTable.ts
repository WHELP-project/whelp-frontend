import { Token } from "../general";

export interface StakingTableEntry {
  lpToken: Token;
  APR: number;
  lockedPeriod: string;
  unstake: (tokenAmount: string, unbondingPeriod: number) => void;
}

export interface StakingTableProps {
  entries: StakingTableEntry[];
  unstake: (tokenAmount: string, unbondingPeriod: number) => void;
}

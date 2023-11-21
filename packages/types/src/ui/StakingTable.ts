import { Token } from "../general";

export interface StakingTableEntry {
  lpToken: Token;
  APR: number;
  lockedPeriod: string;
  unstake: (entry: StakingTableEntry) => void;
}

export interface StakingTableProps {
  entries: StakingTableEntry[];
}

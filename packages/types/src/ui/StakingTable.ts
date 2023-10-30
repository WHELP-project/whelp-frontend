import { Token } from "../general";

export interface StakingTableEntry {
  lpToken: Token;
  startDate: string;
  APR: number;
  lockedPeriod: string;
  unstake: (entry: StakingTableEntry) => void;
}

export interface StakingTableProps {
  entries: StakingTableEntry[];
}

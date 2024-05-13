import { Token } from "../general";

export interface Pool {
  token_a: Token;
  token_b: Token;
  tvl: string;
  apr: number;
  poolAddress: string;
}

export interface PoolOverviewType {
  pools: Pool[];
  onCreatePoolOpen: () => void;
}

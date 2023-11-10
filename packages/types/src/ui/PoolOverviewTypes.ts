import { Token } from "../general";

export interface Pool {
  token_a: Token;
  token_b: Token;
  tvl: number;
  apr: number;
  poolAddress: string;
}

export interface PoolOverviewType {
  pools: Pool[];
}

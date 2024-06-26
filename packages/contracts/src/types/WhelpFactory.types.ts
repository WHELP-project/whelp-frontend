/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.35.3.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

export type Uint128 = string;
export type Decimal = string;
export type PoolType =
  | {
      xyk: {};
    }
  | {
      stable: {};
    }
  | {
      custom: string;
    };
export type AssetInfo =
  | {
      cw20_token: string;
    }
  | {
      smart_token: string;
    };
export interface InstantiateMsg {
  default_stake_config: DefaultStakeConfig;
  fee_address?: string | null;
  max_referral_commission: Decimal;
  owner: string;
  pool_configs: PoolConfig[];
  pool_creation_fee: Asset;
  trading_starts?: number | null;
}
export interface DefaultStakeConfig {
  max_distributions: number;
  min_bond: Uint128;
  staking_code_id: number;
  tokens_per_power: Uint128;
  unbonding_periods: number[];
}
export interface PoolConfig {
  code_id: number;
  fee_config: FeeConfig;
  is_disabled: boolean;
  pool_type: PoolType;
}
export interface FeeConfig {
  protocol_fee_bps: number;
  total_fee_bps: number;
}
export interface Asset {
  amount: Uint128;
  info: AssetInfo;
}
export type ExecuteMsg =
  | {
      update_config: {
        default_stake_config?: PartialDefaultStakeConfig | null;
        fee_address?: string | null;
        only_owner_can_create_pools?: boolean | null;
      };
    }
  | {
      update_pool_config: {
        config: PoolConfig;
      };
    }
  | {
      create_pool: {
        asset_infos: AssetInfo[];
        init_params?: Binary | null;
        pool_type: PoolType;
        staking_config?: PartialStakeConfig;
        total_fee_bps?: number | null;
      };
    }
  | {
      update_pool_fees: {
        asset_infos: AssetInfo[];
        fee_config: FeeConfig;
      };
    }
  | {
      deregister: {
        asset_infos: AssetInfo[];
      };
    }
  | {
      propose_new_owner: {
        expires_in: number;
        owner: string;
      };
    }
  | {
      drop_ownership_proposal: {};
    }
  | {
      claim_ownership: {};
    }
  | {
      mark_as_migrated: {
        pools: string[];
      };
    }
  | {
      create_pool_and_distribution_flows: {
        asset_infos: AssetInfo[];
        distribution_flows: DistributionFlow[];
        init_params?: Binary | null;
        pool_type: PoolType;
        staking_config?: PartialStakeConfig;
        total_fee_bps?: number | null;
      };
    }
  | {
      create_distribution_flow: {
        asset: AssetInfo;
        asset_infos: AssetInfo[];
        rewards: [number, Decimal][];
      };
    }
  | {
      receive: Cw20ReceiveMsg;
    };
export type Binary = string;
export interface PartialDefaultStakeConfig {
  max_distributions?: number | null;
  min_bond?: Uint128 | null;
  staking_code_id?: number | null;
  tokens_per_power?: Uint128 | null;
  unbonding_periods?: number[] | null;
}
export interface PartialStakeConfig {
  max_distributions?: number | null;
  min_bond?: Uint128 | null;
  staking_code_id?: number | null;
  tokens_per_power?: Uint128 | null;
  unbonding_periods?: number[] | null;
}
export interface DistributionFlow {
  asset: AssetInfo;
  reward_duration: number;
  rewards: [number, Decimal][];
}
export interface Cw20ReceiveMsg {
  amount: Uint128;
  msg: Binary;
  sender: string;
}
export type QueryMsg =
  | {
      config: {};
    }
  | {
      pool: {
        asset_infos: AssetInfo[];
      };
    }
  | {
      pools: {
        limit?: number | null;
        start_after?: AssetInfo[] | null;
      };
    }
  | {
      fee_info: {
        pool_type: PoolType;
      };
    }
  | {
      blacklisted_pool_types: {};
    }
  | {
      pools_to_migrate: {};
    }
  | {
      validate_staking_address: {
        address: string;
      };
    };
export type MigrateMsg =
  | {
      update: [];
    }
  | {
      add_permissionless_pool_deposit: Asset;
    };
export type ArrayOfPoolType = PoolType[];
export type Addr = string;
export interface ConfigResponse {
  fee_address?: Addr | null;
  max_referral_commission: Decimal;
  only_owner_can_create_pools: boolean;
  owner: Addr;
  pool_configs: PoolConfig[];
  trading_starts?: number | null;
}
export interface FeeInfoResponse {
  fee_address?: Addr | null;
  protocol_fee_bps: number;
  total_fee_bps: number;
}
export type AssetInfoValidated =
  | {
      cw20_token: Addr;
    }
  | {
      smart_token: string;
    };
export interface PairInfo {
  asset_infos: AssetInfoValidated[];
  contract_addr: Addr;
  fee_config: FeeConfig;
  liquidity_token: string;
  pool_type: PoolType;
  staking_addr: Addr;
  verified: boolean;
}
export interface PoolsResponse {
  pools: PairInfo[];
}
export type ArrayOfAddr = Addr[];
export type Boolean = boolean;

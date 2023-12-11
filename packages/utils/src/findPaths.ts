import { SwapOperation } from "@whelp/contracts/build/types/WhelpMultiHop.types";
import { AssetInfo } from "@whelp/contracts/build/types/WhelpPool.types";

type Pool = {
  asset_a: string;
  asset_b: string;
};
export function findBestPath(
  fromAsset: AssetInfo,
  toAsset: AssetInfo,
  pools: Pool[]
): { operations: SwapOperation[] } {
  const fromAssetAddress: string =
    // @ts-ignore
    fromAsset.cw20_token || fromAsset.smart_token;
  // @ts-ignore
  const toAssetAddress: string = toAsset.cw20_token || toAsset.smart_token;
  const operations: SwapOperation[] = [];
  // Helper function to avoid duplicate operations
  const addOperation = (ask: AssetInfo, offer: AssetInfo) => {
    if (
      !operations.some(
        (op) =>
          op.dex_swap.ask_asset_info === ask &&
          op.dex_swap.offer_asset_info === offer
      )
    ) {
      operations.push({
        dex_swap: {
          ask_asset_info: ask,
          offer_asset_info: offer,
        },
      });
    }
  };

  // Check direct route
  for (const pool of pools) {
    if (
      (pool.asset_a === fromAssetAddress && pool.asset_b === toAssetAddress) ||
      (pool.asset_b === fromAssetAddress && pool.asset_a === toAssetAddress)
    ) {
      addOperation(fromAsset, toAsset);
      return { operations };
    }
  }

  // Check indirect routes
  for (const pool1 of pools) {
    for (const pool2 of pools) {
      if (pool1 !== pool2) {
        const commonAsset =
          pool1.asset_a === pool2.asset_a || pool1.asset_a === pool2.asset_b
            ? pool1.asset_a
            : pool1.asset_b;

        if (
          (pool1.asset_a === fromAssetAddress ||
            pool1.asset_b === fromAssetAddress) &&
          (pool2.asset_a === toAssetAddress ||
            pool2.asset_b === toAssetAddress) &&
          commonAsset !== fromAssetAddress &&
          commonAsset !== toAssetAddress
        ) {
          // Figure if commonAsset is a CW20 or Smart token (if it starts with core1 or testcore1)
          const commonAssetInfo = commonAsset.startsWith("testcore1")
            ? { cw20_token: commonAsset }
            : { smart_token: commonAsset };
          addOperation(fromAsset, commonAssetInfo);
          addOperation(commonAssetInfo, toAsset);
          return { operations };
        }
      }
    }
  }

  return { operations };
}

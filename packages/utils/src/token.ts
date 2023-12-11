import { WhelpPoolTypes } from "@whelp/contracts";
import { Token } from "@whelp/types";

export function isCw20Token(
  asset: WhelpPoolTypes.AssetInfo
): asset is { cw20_token: string } {
  return "cw20_token" in asset;
}

export function isSmartToken(
  asset: WhelpPoolTypes.AssetInfo
): asset is { smart_token: string } {
  return "smart_token" in asset;
}

export function tokenToTokenInfo(asset: Token): WhelpPoolTypes.AssetInfo {
  if (asset.type === "cw20") {
    return { cw20_token: asset.tokenAddress! };
  } else {
    return { smart_token: asset.tokenAddress! };
  }
}

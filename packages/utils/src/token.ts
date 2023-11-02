import { WhelpPoolTypes } from "@whelp/contracts";

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

import { WhelpPoolTypes } from "@whelp/contracts";
import { Token } from "@whelp/types";

/**
 * Determines if a given asset is a CW20 token.
 *
 * @param asset - The asset to be checked.
 * @returns True if the asset is a CW20 token, false otherwise.
 */
export function isCw20Token(
  asset: WhelpPoolTypes.AssetInfo
): asset is { cw20_token: string } {
  return "cw20_token" in asset;
}

/**
 * Determines if a given asset is a Smart token.
 *
 * @param asset - The asset to be checked.
 * @returns True if the asset is a Smart token, false otherwise.
 */
export function isSmartToken(
  asset: WhelpPoolTypes.AssetInfo
): asset is { smart_token: string } {
  return "smart_token" in asset;
}

/**
 * Converts a token to its corresponding WhelpPoolTypes.AssetInfo structure.
 *
 * @param asset - The token to be converted.
 * @returns The AssetInfo representation of the token.
 */
export function tokenToTokenInfo(asset: Token): WhelpPoolTypes.AssetInfo {
  if (asset.type === "cw20") {
    return { cw20_token: asset.tokenAddress! };
  } else {
    return { smart_token: asset.tokenAddress! };
  }
}

/**
 * Converts a micro amount of a token to its standard amount.
 *
 * @param token - The token whose balance is to be converted.
 * @returns The standard amount of the token.
 */
export function microAmountToAmount(token: Token): number {
  return token.balance / Math.pow(10, token.decimals);
}

/**
 * Converts a standard amount of a token to its micro amount.
 *
 * @param token - The token whose balance is to be converted.
 * @returns The micro amount of the token.
 */
export function amountToMicroAmount(token: Token): number {
  return token.balance * Math.pow(10, token.decimals);
}

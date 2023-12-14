export function splitNumber(
  inputNumber: number | string,
  decimals: number = 2
): { integer: string; decimal: string } {
  // Convert to string and standardize the decimal separator to dot
  let numberString = inputNumber.toString().replace(",", ".");
  let parts = numberString.split(".");

  let integerPart = parts[0];
  let decimalPart = parts.length > 1 ? parts[1] : "";

  // Pad the decimal part with zeros to reach the required length
  decimalPart = decimalPart.padEnd(decimals, "0");

  return { integer: integerPart, decimal: "," + decimalPart };
}

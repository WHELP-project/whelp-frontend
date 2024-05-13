export const fetchPrice = async (tokenAddress: string): Promise<number> => {
  const url = "https://pro-api.coingecko.com/api/v3/simple/price";
  const options = {
    method: "GET",
    headers: { accept: "application/json", "x-cg-pro-api-key": "aasdsasd" },
  };

  const res = await fetch(url, options);

  return await res.json();
};

"use client";

import { SwapContainer } from "@whelp/ui";
import { Token } from "@whelp/types";
import { Box } from "@mui/material";
import { useState } from "react";

export default function SwapPage() {
  const token: Token = {
    name: "USDT",
    icon: "cryptoIcons/usdt.svg",
    balance: 100,
    category: "Stable",
    usdValue: 1 * 100,
    decimals: 7,
  };

  const token2: Token = {
    name: "USDC",
    icon: "cryptoIcons/usdc.svg",
    balance: 100,
    category: "Stable",
    usdValue: 1 * 100,
    decimals: 7,
  };

  const token3: Token = {
    name: "BTC",
    icon: "cryptoIcons/btc.svg",
    balance: 100,
    category: "Stable",
    usdValue: 1 * 100,
    decimals: 7,
  };

  const [allTokens, setAllTokens] = useState<Token[]>([token, token2, token3]);
  const [fromToken, setFromToken] = useState<Token>(token);
  const [toToken, setToToken] = useState<Token>(token2);
  const [fromAmount, setFromAmount] = useState<number>(0);
  const [toAmount, setToAmount] = useState<number>(0);
  const [slippageTolerance, setSlippageTolerance] = useState<number>(0.5);

  return (
    <main>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 150px)",
          position: "relative",
        }}
      >
        <SwapContainer
          from_token={fromToken}
          to_token={toToken}
          from_amount={fromAmount}
          to_amount={toAmount}
          tokens={allTokens}
          onFromTokenChange={(token: Token) => setFromToken(token)}
          onToTokenChange={(token: Token) => setToToken(token)}
          onFromAmountChange={(amount: number) => setFromAmount(amount)}
          onToAmountChange={(amount: number) => setToAmount(amount)}
          onSwap={() => console.log("Swap")}
          slippageTolerance={slippageTolerance}
          setSlippageTolerance={(slippageTolerance: number) =>
            setSlippageTolerance(slippageTolerance)
          }
        />
        <Box sx={{ position: "absolute", width: "100%", zIndex: -1 }}>
          <Box
            component="img"
            alt="Background img"
            src="/images/swap_bg.png"
            sx={{
              height: "100%",
              width: "100%",
              bottom: 0,
              zIndex: -1,
            }}
          />
        </Box>
      </Box>
    </main>
  );
}

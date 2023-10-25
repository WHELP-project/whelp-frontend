"use client";

import { useAppStore } from "@whelp/state";
import { WalletTypes } from "@whelp/types";
import { useEffect } from "react";

export default function Home() {
  const appStore = useAppStore();

  const doConnect = () => {
    appStore.connectWallet(
      WalletTypes.WalletTypes.Leap,
      process.env.ENVOIRONMENT === "prod" ? "prod" : "dev"
    );
  };

  useEffect(() => {
    console.log("walletAddress", appStore.wallet.address);
  }, [appStore.wallet.address]);

  return (
    <main>
      {appStore.wallet.address ? (
        <div>{appStore.wallet.address}</div>
      ) : (
        <button onClick={() => doConnect()}>Connect Wallet Test</button>
      )}
    </main>
  );
}

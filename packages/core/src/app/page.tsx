"use client";

import { useAppStore } from "@whelp/state";
import { WalletTypes } from "@whelp/types";
import { Suspense, useEffect } from "react";

export default function Home() {
  const appStore = useAppStore();

  const doConnectLeap = () => {
    appStore.connectWallet(WalletTypes.WalletTypes.Leap, "dev");
  };

  const doConnectCosmostation = () => {
    appStore.connectWallet(WalletTypes.WalletTypes.Cosmostation, "dev");
  };

  useEffect(() => {
    console.log("walletAddress", appStore.wallet.address);
    console.log(process.env.ENVOIRONMENT);
  }, [appStore.wallet.address]);

  return (
    <main>
      {appStore.wallet.address ? (
        <div>{appStore.wallet.address}</div>
      ) : (
        <>
          <button onClick={() => doConnectLeap()}>Connect Wallet Leap</button>
          <button onClick={() => doConnectCosmostation()}>
            Connect Wallet CosmoStation
          </button>
        </>
      )}
    </main>
  );
}

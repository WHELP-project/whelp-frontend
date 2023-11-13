"use client";
import { WalletTypes } from "@whelp/types";
import {
  ThemeProvider,
  LayoutProvider,
  WalletModal,
  palette,
  MobileNav,
} from "@whelp/ui";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore, usePersistStore } from "@whelp/state";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const appStorePersist = usePersistStore();
  const appStore = useAppStore();

  useEffect(() => {
    if (appStorePersist.isConnected) {
      appStore.connectWallet(appStorePersist.type, "dev");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStore.wallet.address]);

  const wallets = [
    {
      type: WalletTypes.WalletTypes.Leap,
      name: "Leap",
      icon: "/images/walletIcons/leap.png",
      onClick: () => {
        appStore.connectWallet(WalletTypes.WalletTypes.Leap, "dev");
        setOpen(false);
      },
    },
    {
      type: WalletTypes.WalletTypes.Cosmostation,
      name: "Cosmostation",
      icon: "/images/walletIcons/cosmostation.png",
      onClick: () => {
        appStore.connectWallet(WalletTypes.WalletTypes.Cosmostation, "dev");
        setOpen(false);
      },
    },
    {
      type: WalletTypes.WalletTypes.Keplr,
      name: "Keplr",
      icon: "/images/walletIcons/keplr.png",
      onClick: () => {
        appStore.connectWallet(WalletTypes.WalletTypes.Keplr, "dev");
        setOpen(false);
      },
    },
  ];

  const navMenu = [
    {
      label: "Overview",
      onClick: () => {
        router.push("/");
      },
      active: pathname === "/",
      icon: "/images/navbar/overview.svg",
      iconActive: "/images/navbar/overview_active.svg",
    },
    {
      label: "Swap",
      onClick: () => {
        router.push("/swap");
      },
      active: pathname === "/swap",
      icon: "/images/navbar/swap.svg",
      iconActive: "/images/navbar/swap_active.svg",
    },
    {
      label: "Pools",
      onClick: () => {
        router.push("/pools");
      },
      active: pathname === "/pools",
      icon: "/images/navbar/pools.svg",
      iconActive: "/images/navbar/pools_active.svg",
    },
  ];

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <LayoutProvider
            navMenu={navMenu}
            pageTitle={
              pathname === "/"
                ? "Overview"
                : (
                    pathname.charAt(1).toUpperCase() + pathname.slice(2)
                  ).substring(
                    0,
                    (
                      pathname.charAt(1).toUpperCase() + pathname.slice(2)
                    ).lastIndexOf("/")
                  )
            }
            connectWallet={() => setOpen(true)}
            disconnectWallet={() => appStore.disconnectWallet()}
            isConnected={appStore.wallet.isConnected}
            walletAddress={appStore.wallet.address}
            walletIcon={`/images/walletIcons/${appStore.wallet.type.toLowerCase()}.png`}
          >
            <main>{children}</main>
          </LayoutProvider>
          <WalletModal
            wallets={wallets}
            onClose={() => {
              setOpen(false);
            }}
            open={open}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

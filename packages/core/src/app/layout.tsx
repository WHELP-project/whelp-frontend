"use client";
import { WalletTypes } from "@whelp/types";
import { ThemeProvider, LayoutProvider, WalletModal } from "@whelp/ui";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@whelp/state";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const appStore = useAppStore();

  const wallets = [
    {
      type: WalletTypes.WalletTypes.Leap,
      name: "Leap",
      icon: "/images/walletIcons/leap.png",
      onClick: () => {
        appStore.connectWallet(WalletTypes.WalletTypes.Leap, "prod");
      },
    },
    {
      type: WalletTypes.WalletTypes.Cosmostation,
      name: "Cosmostation",
      icon: "/images/walletIcons/cosmostation.png",
      onClick: () => {
        appStore.connectWallet(WalletTypes.WalletTypes.Cosmostation, "prod");
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
                : pathname.charAt(1).toUpperCase() + pathname.slice(2)
            }
            connectWallet={() => setOpen(true)}
            isConnected={appStore.wallet.isConnected}
            walletAddress={appStore.wallet.address}
            walletIcon={`/images/walletIcons/${appStore.wallet.type.toLowerCase()}.png`}
          >
            {children}
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

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
import { Analytics } from "@vercel/analytics/react";
import { Typography, useMediaQuery } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery("(max-width:600px)");

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
      <head>
        {/* Title */}
        <title>Whelp - Your permission-less DEX on Coreum</title>
        <meta
            name="description"
            content="Explore Whelp's innovative permission-less DEX on Coreum - Your Enterprise-Grade Blockchain Solutions with Smart Tokens"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://app.whelp-hub.io"/>
        <meta property="og:title" content="Whelp - Permissionless DEX"/>
        <meta
            property="og:description"
            content="Explore Whelp's innovative permission-less DEX on Coreum - Your Enterprise-Grade Blockchain Solutions with Smart Tokens"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:url" content="https://app.whelp-hub.io"/>
        <meta name="twitter:title" content="Whelp - Permissionless DEX"/>
        <meta
            name="twitter:description"
            content="Explore Whelp's innovative permission-less DEX on Coreum - Your Enterprise-Grade Blockchain Solutions with Smart Tokens"
        />

        {/* Additional tags for responsiveness and browser compatibility */}
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      </head>
      <body>
      <ThemeProvider>
        {isMobile ? (
            <Typography>
              This application is not available on mobile devices. Please use a
              desktop or laptop to access this application.
            </Typography>
        ) : (
            <>
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

              <Analytics/>
            </>
        )}
      </ThemeProvider>
      </body>
      </html>
  );
}

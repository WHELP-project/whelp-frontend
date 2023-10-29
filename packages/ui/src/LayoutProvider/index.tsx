import { Box } from "@mui/material";
import React from "react";
import { Navigation } from "../Navigation";
import { AppBar } from "../AppBar";

interface LayoutProviderProps {
  children: React.ReactNode;
  pageTitle: string;
  connectWallet?: () => void;
  disconnectWallet?: () => void;
  isConnected?: boolean;
  walletAddress?: string;
  walletIcon?: string;
  navMenu: any[];
}

const LayoutProvider = ({ ...props }: LayoutProviderProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navigation menu={props.navMenu} />
      <Box sx={{ width: "100%" }}>
        <AppBar
          title={props.pageTitle}
          connectWallet={props.connectWallet}
          disconnectWallet={props.disconnectWallet}
          isConnected={props.isConnected}
          walletAddress={props.walletAddress}
          walletIcon={props.walletIcon}
        />
        {props.children}
      </Box>
    </Box>
  );
};

export { LayoutProvider };

import { ButtonProps as MuiButtonProps } from "@mui/material";

export interface AppBarProps {
  title: string;
  connectWallet?: () => void;
  disconnectWallet?: () => void;
  isConnected?: boolean;
  walletAddress?: string;
  walletIcon?: string;
  mobileNavOpen?: boolean;
  toggleMobileNav?: (open: boolean) => void;
}
export type Modify<T, R> = Omit<T, keyof R> & R;

export interface ButtonProps
  extends Modify<
    MuiButtonProps,
    {
      type?: "primary" | "secondary";
      size?: "medium" | "small";
      label?: string;
      iconBefore?: string;
      iconAfter?: string;
    }
  > {
  label?: string;
}

export interface LayoutProviderProps {
  children: React.ReactNode;
  pageTitle: string;
  connectWallet?: () => void;
  disconnectWallet?: () => void;
  isConnected?: boolean;
  walletAddress?: string;
  walletIcon?: string;
  navMenu: any[];
}

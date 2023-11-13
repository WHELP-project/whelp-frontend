export type Menu = {
  icon: string;
  iconActive: string;
  label: string;
  onClick: () => void;
  active: boolean;
};

export interface NavigationProps {
  menu: Menu[];
}

export interface MobileNavProps {
  menu: Menu[];
  isOpen: boolean;
  onClose: () => void;
  connectWallet?: () => void;
  disconnectWallet?: () => void;
  isConnected?: boolean;
  walletAddress?: string;
  walletIcon?: string;
}

import theme from "./Theme";
import WhelpThemeProvider from "./ThemeProvider/ThemeProvider";
export { WhelpThemeProvider as ThemeProvider };

const palette = theme.palette as { [key: string]: any };
export { palette };
export * from "./Button";
export * from "./Card";
export * from "./WalletModal";
export * from "./Navigation";
export * from "./AppBar";
export * from "./ConnectWalletButton";
export * from "./LayoutProvider";
export * from "./PoolSingle";

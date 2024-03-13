import { Token } from "../general";

export interface AssetListProps {
  entries: Token[];
  showIbc: boolean;
  onClick: (token: Token) => void;
  onIbcClick: (token: Token) => void;
  onOnRampClick: () => void;
}

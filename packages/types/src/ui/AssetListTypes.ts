import { Token } from "../general";

export interface AssetListProps {
  entries: Token[];
  onClick: (token: Token) => void;
  onIbcClick: (token: Token) => void;
}

import { Token } from "../general";

export interface TokenBoxProps {
  token: Token;
  onChange: (value: string) => void;
  value: string | undefined;
  disabled?: boolean;
  isStakeToken?: boolean;
  loading?: boolean;
}

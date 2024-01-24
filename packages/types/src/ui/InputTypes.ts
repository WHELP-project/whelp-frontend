export interface InputProps {
  type?: "text" | "number"
  disabled?: boolean;
  value: string | number;
  onChange: (e: any) => void;
  placeholder: string;
  min?: number;
  max?: number;
}

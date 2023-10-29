export interface CardProps {
  title: string;
  content: React.ReactElement;
  warning?: boolean;
  warningText?: string;
  percentage?: number;
  percentageText?: string;
}

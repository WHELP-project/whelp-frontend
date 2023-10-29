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

export interface IMenuOption {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  divider?: boolean;
}
import type { IconType } from "react-icons/lib";

export interface IMenuOption {
  id: string;
  label: string;
  url?: string;
  icon?: IconType;
  onClick?: () => void;
  divider?: boolean;
}
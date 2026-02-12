import type { IconType } from "react-icons/lib";

export interface IRoute {
  id: string;
  url: string;
  label: string;
  icon?: IconType;
}
import type { IconType } from "react-icons/lib";
import type { UserRole } from "./authContext.type";

export interface IRoute {
  id: string;
  url: string;
  label: string;
  icon?: IconType;
  roles?: UserRole[];
}
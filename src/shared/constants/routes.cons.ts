import type { IRoute } from "../types/routes.types";
import { IoIosHome } from "react-icons/io";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdAccountBalance, MdNotificationsNone, MdHistory } from "react-icons/md";
import { TbCategoryFilled, TbReportMoney } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";

export const PUBLIC_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const;

export const ADMIN_ROUTES = {
  ADMIN_HOME: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_NOTIFICATIONS: '/admin/notifications',
  ADMIN_NOTIFICATIONS_HISTORY: '/admin/notifications/history',
} as const;

export const USER_ROUTES = {
  NOTIFICATIONS: '/notifications',
} as const;

export const ROUTES: IRoute[] = [
  {
    id: "home",
    url: "/",
    label: "Home",
    icon: IoIosHome,
    roles: ["User"],
  },
  {
    id: "admin-home",
    url: "/admin",
    label: "Home",
    icon: IoIosHome,
    roles: ["Admin"],
  },
  {
    id: "transactions",
    url: "/transactions",
    label: "Transações",
    icon: AiOutlineTransaction,
    roles: ["User"],
  },
  {
    id: "account",
    url: "/account",
    label: "Conta",
    icon: MdAccountBalance,
    roles: ["User"],
  },
  {
    id: "categories",
    url: "/categories",
    label: "Categorias",
    icon: TbCategoryFilled,
    roles: ["User"],
  },
  {
    id: "summary",
    url: "/summary",
    label: "Resumo",
    icon: TbReportMoney,
    roles: ["User"],
  },
  {
    id: "admin-users",
    url: "/admin/users",
    label: "Usuários",
    icon: RiAdminLine,
    roles: ["Admin"],
  },
  {
    id: "admin-notifications",
    url: "/admin/notifications",
    label: "Enviar Notificação",
    icon: MdNotificationsNone,
    roles: ["Admin"],
  },
  {
    id: "admin-notifications-history",
    url: "/admin/notifications/history",
    label: "Histórico de Notificações",
    icon: MdHistory,
    roles: ["Admin"],
  },
];

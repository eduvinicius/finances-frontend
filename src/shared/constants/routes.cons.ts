import type { IRoute } from "../types/routes.types";
import { IoIosHome } from "react-icons/io";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdAccountBalance } from "react-icons/md";
import { TbCategoryFilled, TbReportMoney } from "react-icons/tb";

export const PUBLIC_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const;

export const ROUTES: IRoute[] = [
  {
    id: "home",
    url: "/",
    label: "Home",
    icon: IoIosHome,
  },
  {
    id: "transactions",
    url: "/transactions",
    label: "Transações",
    icon: AiOutlineTransaction,
  },
  {
    id: "account",
    url: "/account",
    label: "Conta",
    icon: MdAccountBalance,
  },
  {
    id: "categories",
    url: "/categories",
    label: "Categorias",
    icon: TbCategoryFilled,
  },
  {
    id: "summary",
    url: "/summary",
    label: "Resumo",
    icon: TbReportMoney,
  }
];

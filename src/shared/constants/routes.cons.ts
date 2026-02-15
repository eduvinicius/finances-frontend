import type { IRoute } from "../types/routes.types";
import { IoIosHome } from "react-icons/io";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdAccountBalance } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";


export const ROUTES: IRoute[] = [
  {
    id: "home",
    url: "/home",
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
  }
];

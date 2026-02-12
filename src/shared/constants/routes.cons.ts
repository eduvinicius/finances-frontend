import type { IRoute } from "../types/routes.types";
import { IoIosHome } from "react-icons/io";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";


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
    id: "configuration",
    url: "/configuration",
    label: "Configuração",
    icon: IoSettingsOutline,
  },
];

import type { IRoute } from "../types/routes.types";

export const ROUTES: IRoute[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
    icon: "🏠",
  },
  {
    id: "transactions",
    path: "/transactions",
    label: "Transações",
    icon: "📚",
  },
  {
    id: "configuration",
    path: "/configuration",
    label: "Configuração",
    icon: "🗄️",
  },
];

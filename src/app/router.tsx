import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { Login } from "@/features/auth/pages/login";
import { ProtectedLayout } from "@/features/Layout";

const Home = lazy(() => import("@/features/Home").then(m => ({ default: m.Home })));
const Account = lazy(() => import("@/features/Account/pages").then(m => ({ default: m.Account })));
const Transactions = lazy(() => import("@/features/Transactions").then(m => ({ default: m.Transactions })));
const Categories = lazy(() => import("@/features/Categories/pages").then(m => ({ default: m.Categories })));
const Settings = lazy(() => import("@/features/Settings").then(m => ({ default: m.Settings })));

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: ProtectedLayout,
    children: [
      { index: true, Component: Home },
      { path: "home", Component: Home },
      { path: "account", Component: Account },
      { path: "transactions", Component: Transactions },
      { path: "categories", Component: Categories },
      { path: "settings", Component: Settings },
    ],
  },
]);

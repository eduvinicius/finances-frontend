import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Login } from "@/features/auth/pages/login";
import { Register } from "@/features/auth/pages/register";
import { AdminLayout, ProtectedLayout, UserOnlyLayout } from "@/features/Layout";
import { NotFound } from "@/features/NotFound";

const Home = lazy(() => import("@/features/Home").then(m => ({ default: m.Home })));
const Account = lazy(() => import("@/features/Account/pages").then(m => ({ default: m.Account })));
const Transactions = lazy(() => import("@/features/Transactions/pages").then(m => ({ default: m.Transactions })));
const Categories = lazy(() => import("@/features/Categories/pages").then(m => ({ default: m.Categories })));
const Settings = lazy(() => import("@/features/Settings").then(m => ({ default: m.Settings })));
const Summary = lazy(() => import("@/features/Summary").then(m => ({ default: m.Summary })));
const ForgotPasswordPage = lazy(() =>
  import("@/features/auth/pages/ForgotPasswordPage").then(m => ({ default: m.ForgotPasswordPage }))
);
const ResetPasswordPage = lazy(() =>
  import("@/features/auth/pages/ResetPasswordPage").then(m => ({ default: m.ResetPasswordPage }))
);
const AdminUsersPage = lazy(() =>
  import("@/features/admin/pages/AdminUsersPage").then(m => ({ default: m.AdminUsersPage }))
);

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/forgot-password",
    Component: ForgotPasswordPage,
  },
  {
    path: "/reset-password",
    Component: ResetPasswordPage,
  },
  {
    path: "/",
    Component: ProtectedLayout,
    children: [
      { index: true, Component: Home },
      { path: "home", Component: Home },
      { path: "settings", Component: Settings },
      {
        Component: UserOnlyLayout,
        children: [
          { path: "account", Component: Account },
          { path: "transactions", Component: Transactions },
          { path: "categories", Component: Categories },
          { path: "summary", Component: Summary },
        ],
      },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { path: "users", Component: AdminUsersPage },
    ],
  },
  { path: "*", Component: NotFound },
]);

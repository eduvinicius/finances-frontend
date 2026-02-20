import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { PrivateRoute } from "./privateRoute";
import { Login } from "@/features/auth/pages/login";
import { Layout } from "@/features/Layout";

// Lazy load feature modules for better performance
const Home = lazy(() => import("@/features/Home").then(m => ({ default: m.Home })));
const Account = lazy(() => import("@/features/Account/pages").then(m => ({ default: m.Account })));
const Transactions = lazy(() => import("@/features/Transactions").then(m => ({ default: m.Transactions })));
const Categories = lazy(() => import("@/features/Categories/pages").then(m => ({ default: m.Categories })));
const Settings = lazy(() => import("@/features/Settings").then(m => ({ default: m.Settings })));

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "account", element: <Account /> },
      { path: "transactions", element: <Transactions /> },
      { path: "categories", element: <Categories /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

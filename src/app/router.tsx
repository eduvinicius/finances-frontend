import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./privateRoute";
import { Login } from "@/features/auth/pages/login";
import { Home } from "@/features/Home";
import { Layout } from "@/features/Layout";
import { Account } from "@/features/Account/pages";
import { Transactions } from "@/features/Transactions";
import { Categories } from "@/features/Categories/pages";
import { Settings } from "@/features/Settings";

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

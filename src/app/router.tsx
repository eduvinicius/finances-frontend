import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./privateRoute";
import { Login } from "@/features/auth/pages/Login";
import { Home } from "@/features/home";
import { Layout } from "@/features/layout";
import { Account } from "@/features/account/account";
import { Transactions } from "@/features/transactions/transactions";

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
      { path: "home", element: <Home /> },
      { path: "account", element: <Account /> },
      { path: "transactions", element: <Transactions /> },
    ],
  },
]);

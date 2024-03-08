import { createBrowserRouter } from "react-router-dom";
import { homePagePath, authPagePath } from "./paths";
import HomePage from "../pages/homePage";
import RootLayout from "../layouts/rootLayout";
import AuthPage from "../pages/auth/authPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: homePagePath,
        element: <HomePage />,
      },
      {
        path: authPagePath,
        element: <AuthPage />,
      },
    ],
  },
]);

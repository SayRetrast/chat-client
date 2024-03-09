import { createBrowserRouter } from "react-router-dom";
import { homePagePath, authPagePath, settingsPagePath } from "./paths";
import HomePage from "../pages/homePage";
import RootLayout from "../layouts/rootLayout";
import AuthPage from "../pages/auth/authPage";
import SettingsPage from "../pages/settings/settingsPage";

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
      {
        path: settingsPagePath,
        element: <SettingsPage />,
      },
    ],
  },
]);

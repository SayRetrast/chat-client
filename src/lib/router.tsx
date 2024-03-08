import { createBrowserRouter } from "react-router-dom";
import { homePagePath, signInPagePath, signUpPagePath } from "./paths";
import HomePage from "../pages/homePage";
import RootLayout from "../layouts/rootLayout";
import SignInPage from "../pages/auth/signInPage";
import SignUpPage from "../pages/auth/signUpPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: homePagePath,
        element: <HomePage />,
      },
      {
        path: signInPagePath,
        element: <SignInPage />,
      },
      {
        path: signUpPagePath,
        element: <SignUpPage />,
      },
    ],
  },
]);

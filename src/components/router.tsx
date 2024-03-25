import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import { homePagePath, authPagePath, settingsPagePath, dialogPagePath } from "../lib/paths";
import HomePage from "../pages/homePage";
import RootLayout from "../layouts/rootLayout";
import AuthPage from "../pages/auth/authPage";
import SettingsPage from "../pages/settings/settingsPage";
import DialogPage from "../pages/dialog/dialogPage";

import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const protectedWhenLoginRoutes: RouteProps[] = [
  {
    path: settingsPagePath,
    element: <SettingsPage />,
  },
  {
    path: dialogPagePath,
    element: <DialogPage />,
  },
];

const protectedWhenNotLoginRoutes: RouteProps[] = [
  {
    path: authPagePath,
    element: <AuthPage />,
  },
];

export default function Router() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={homePagePath} element={<HomePage />}></Route>
        {user.isAuth &&
          protectedWhenLoginRoutes.map(({ path, element }) => <Route key={path} path={path} element={element}></Route>)}
        {!user.isAuth &&
          protectedWhenNotLoginRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element}></Route>
          ))}
      </Route>

      <Route path="*" element={<Navigate to={homePagePath} />}></Route>
    </Routes>
  );
}

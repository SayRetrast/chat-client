import { Link } from "react-router-dom";
import { homePagePath, authPagePath, settingsPagePath } from "../lib/paths";
import { Button } from "primereact/button";
import { cn } from "../lib/utils";
import { Avatar } from "primereact/avatar";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useDispatch } from "react-redux";
import { cleanAccessToken } from "../state/slices/accessToken.slice";
import { cleanUser } from "../state/slices/user.slice";
import { useDeleteMutation } from "../state/services/auth.service";

export default function Header() {
  const user = useSelector((state: RootState) => state.user);
  const accessToken = useSelector((state: RootState) => state.accessToken.accessToken);
  const dispatch = useDispatch();
  const [logout] = useDeleteMutation();

  function logoutHandler() {
    try {
      if (!accessToken) {
        throw new Error("Unauthorized");
      }
      logout({ accessToken });

      dispatch(cleanAccessToken());
      dispatch(cleanUser());
    } catch (error) {
      console.error("There was an error when trying to sign out.", error);
    }
  }

  return (
    <header className="mx-4 pt-4">
      <div className="container mx-auto flex h-[46px] items-center justify-between rounded bg-[var(--primary-color)] ">
        <Link to={homePagePath} className="text-sm font-semibold tracking-wide text-[var(--primary-color-text)]">
          {user.isAuth ? (
            <div className="flex items-center gap-x-2">
              <Avatar id="avatar" icon="pi pi-user" className="h-[28px] w-[28px] text-[var(--text-color)]" />
              <p>{user.username}</p>
            </div>
          ) : (
            "ChatApp"
          )}
        </Link>

        <nav>
          <ul className="flex gap-x-1">
            <li className={cn({ hidden: !user.isAuth })}>
              <Link to={homePagePath} className="font-medium text-[var(--highlight-text-color)]">
                <Button icon="pi pi-comments" size="small" className="h-[28px] w-[28px] p-0" />
              </Link>
            </li>

            <li className={cn({ hidden: !user.isAuth })}>
              <Link to={settingsPagePath} className="font-medium text-[var(--highlight-text-color)]">
                <Button icon="pi pi-cog" size="small" className="h-[28px] w-[28px] p-0" />
              </Link>
            </li>

            <li className={cn({ hidden: !user.isAuth })}>
              <Link to={"#"} className="font-medium text-[var(--highlight-text-color)]">
                <Button
                  icon="pi pi-sign-out"
                  label="Sign out"
                  size="small"
                  className="h-[28px] p-0 px-2"
                  onClick={logoutHandler}
                />
              </Link>
            </li>

            <li className={cn({ hidden: user.isAuth })}>
              <Link to={authPagePath} className="font-medium text-[var(--highlight-text-color)]">
                <Button icon="pi pi-sign-in" label="Sign in" size="small" className="h-[28px] p-0 px-2" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

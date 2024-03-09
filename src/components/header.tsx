import { Link } from "react-router-dom";
import { homePagePath, authPagePath, settingsPagePath } from "../lib/paths";
import { Button } from "primereact/button";
import { cn } from "../lib/utils";
import { user } from "../lib/placeholders";
import { Avatar } from "primereact/avatar";

export default function Header() {
  return (
    <header className="mx-4">
      <div className="container mx-auto mt-4 flex h-[46px] items-center justify-between rounded bg-[var(--primary-color)] ">
        <Link to={homePagePath} className="text-sm font-semibold tracking-wide text-[var(--primary-color-text)]">
          {user.isAuth ? (
            <div className="flex items-center gap-x-2">
              <Avatar id="avatar" icon="pi pi-user" className="h-[28px] w-[28px] text-[var(--text-color)]" />
              <p>Retrast</p>
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
                <Button icon="pi pi-sign-out" label="Sign out" size="small" className="h-[28px] p-0 px-2" />
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

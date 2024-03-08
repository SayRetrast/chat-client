import { Link } from "react-router-dom";
import { homePagePath, authPagePath } from "../lib/paths";
import { Button } from "primereact/button";

export default function Header() {
  return (
    <header className="mx-4">
      <div
        className="container mx-auto mt-1 flex h-[46px] items-center justify-between rounded-xl shadow"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        <Link
          to={homePagePath}
          className="text-sm font-semibold tracking-wide"
          style={{ color: "var(--primary-color-text)" }}
        >
          ChatApp
        </Link>

        <nav>
          <ul className="flex gap-x-4">
            <li>
              <Link to={authPagePath} className="font-medium" style={{ color: "var(--highlight-text-color)" }}>
                <Button icon="pi pi-comments" size="small" className="h-[28px] w-[28px] p-0" />
              </Link>
            </li>

            <li>
              <Link to={authPagePath} className="font-medium" style={{ color: "var(--highlight-text-color)" }}>
                <Button icon="pi pi-search" size="small" className="h-[28px] w-[28px] p-0" />
              </Link>
            </li>

            <li>
              <Link to={authPagePath} className="font-medium" style={{ color: "var(--highlight-text-color)" }}>
                <Button icon="pi pi-sign-in" size="small" className="h-[28px] w-[28px] p-0" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

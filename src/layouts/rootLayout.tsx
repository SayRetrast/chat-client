import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <header>
        <div className="mx-auto px-4 lg:container">Header</div>
      </header>
      <main className="mx-auto px-4 lg:container">
        <Outlet />
      </main>
    </>
  );
}

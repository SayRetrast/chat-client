import { Outlet } from "react-router-dom";
import Header from "../components/header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="mx-auto my-6 px-4 lg:container">
        <Outlet />
      </main>
    </>
  );
}

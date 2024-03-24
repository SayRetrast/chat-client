import { Link, useSearchParams } from "react-router-dom";
import { authPagePath } from "../lib/paths";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
// import { Divider } from "primereact/divider";
import SearchUsersForm from "../components/forms/searchUserForm";
import FoundUsers from "../components/contacts/foundUsers";
import Contacts from "../components/contacts/contacts";

function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <h2 className="text-center text-lg font-bold">Sign in to your account to start chatting.</h2>

      <Link to={authPagePath}>
        <Button label="Sign in to an account" />
      </Link>
    </div>
  );
}

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramSearchValue = searchParams.get("search")?.toString();

  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      {user.isAuth ? (
        <div>
          <SearchUsersForm searchParams={searchParams} setSearchParams={setSearchParams} />
          {paramSearchValue && <FoundUsers paramSearchValue={paramSearchValue} currentUserId={user.id!} />}
          <Contacts currentUserId={user.id!} />
        </div>
      ) : (
        <SignIn />
      )}
    </>
  );
}

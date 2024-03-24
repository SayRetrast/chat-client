import { Link, useSearchParams } from "react-router-dom";
import { authPagePath } from "../lib/paths";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Divider } from "primereact/divider";
import ContactsList from "../components/contacts/contactsList";
import SearchUsersForm from "../components/forms/searchUserForm";
import FoundUsersList from "../components/contacts/foundUsersList";

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
          {paramSearchValue && <FoundUsersList paramSearchValue={paramSearchValue} currentUserId={user.id!} />}

          <div>
            <Divider />
            <h2 className="mb-3.5 px-3 text-lg font-bold">Contacts</h2>
            <ContactsList />
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </>
  );
}

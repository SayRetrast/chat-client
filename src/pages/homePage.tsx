import { Link } from "react-router-dom";
import { authPagePath } from "../lib/paths";
import { Button } from "primereact/button";
import { user } from "../lib/placeholders";
import ContactsList from "../components/contacts/contactsList";

function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-3">
      <h2 className="text-center text-lg font-bold">Sign in to your account to start chatting.</h2>

      <Link to={authPagePath}>
        <Button label="Sign in to an account" />
      </Link>
    </div>
  );
}

export default function HomePage() {
  return <>{user.isAuth ? <ContactsList /> : <SignIn />}</>;
}

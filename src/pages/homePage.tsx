import { Link, SetURLSearchParams, useSearchParams } from "react-router-dom";
import { authPagePath } from "../lib/paths";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";
import debounce from "debounce";
import { Divider } from "primereact/divider";
import { useSearchUsersQuery } from "../state/services/user.service";
import FoundUserContact from "../components/contacts/foundUserContact";
import ContactsList from "../components/contacts/contactsList";
import { ProgressSpinner } from "primereact/progressspinner";

interface FormInputs {
  search: string;
}

function SearchUsersForm({
  searchParams,
  setSearchParams,
}: {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}) {
  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: {
      search: searchParams.get("search") || "",
    },
  });

  const searchOnSubmit = debounce((formData: FormInputs) => {
    searchParams.set("search", formData.search);
    setSearchParams(searchParams);
  }, 500);

  return (
    <form>
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <InputText
            className="w-full"
            type="text"
            placeholder="Find an user to chat with"
            onChange={(e) => {
              field.onChange(e.target.value);
              handleSubmit(searchOnSubmit)();
            }}
            defaultValue={searchParams.get("search")?.toString()}
          />
        )}
      />
    </form>
  );
}

function FoundUsers({ paramSearchValue }: { paramSearchValue?: string }) {
  const { accessToken } = useSelector((state: RootState) => state.accessToken);
  const { data, isLoading, isSuccess } = useSearchUsersQuery({
    accessToken: accessToken!,
    username: paramSearchValue!,
  });

  return (
    <div>
      <Divider />
      <h2 className="px-3 text-lg font-bold">Found users</h2>

      {isLoading && (
        <div className="flex w-full">
          <ProgressSpinner className="h-8 w-8" />
        </div>
      )}

      {isSuccess && data.length > 0 && (
        <ul className="mt-3.5 flex grid-cols-2 flex-col gap-y-3.5 md:grid">
          {data.map((user) => (
            <FoundUserContact key={user.userId} userId={user.userId} username={user.username} />
          ))}
        </ul>
      )}

      {isSuccess && data.length === 0 && <h2 className="text-center text-lg font-bold">No users were found.</h2>}
    </div>
  );
}

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
          {paramSearchValue && <FoundUsers paramSearchValue={paramSearchValue} />}

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

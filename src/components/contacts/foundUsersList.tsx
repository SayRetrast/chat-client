import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useSearchUsersQuery } from "../../state/services/user.service";
import { Divider } from "primereact/divider";
import { ProgressSpinner } from "primereact/progressspinner";
import FoundUserContact from "./foundUserContact";

export default function FoundUsersList({
  paramSearchValue,
  currentUserId,
}: {
  paramSearchValue?: string;
  currentUserId: string;
}) {
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
          {data.map(
            (user) =>
              currentUserId !== user.userId && (
                <FoundUserContact key={user.userId} userId={user.userId} username={user.username} />
              )
          )}
        </ul>
      )}

      {isSuccess && data.length === 0 && <p className="text-center text-lg font-bold">No users were found.</p>}
    </div>
  );
}

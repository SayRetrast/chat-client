import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { UserResponseType, useSearchUsersQuery } from "../../state/services/user.service";
import { Divider } from "primereact/divider";
import { ProgressSpinner } from "primereact/progressspinner";
import FoundUserContact from "./foundUserContact";
import { useGetReceiverIdsQuery } from "../../state/services/dialog.service";
import { useEffect, useState } from "react";

export default function FoundUsers({
  paramSearchValue,
  currentUserId,
}: {
  paramSearchValue?: string;
  currentUserId: string;
}) {
  const [filteredFoundUsers, setFilteredFoundUsers] = useState<UserResponseType[]>([]);

  const { accessToken } = useSelector((state: RootState) => state.accessToken);
  const {
    data: foundUsers,
    isLoading: isLoadingFoundUsers,
    isSuccess: isSuccessFoundUsers,
  } = useSearchUsersQuery({
    accessToken: accessToken!,
    username: paramSearchValue!,
  });
  const {
    data: receiverIds,
    isLoading: isLoadingReceiverIds,
    isSuccess: isSuccessReceiverIds,
  } = useGetReceiverIdsQuery({ accessToken: accessToken! });

  useEffect(() => {
    if (isSuccessFoundUsers && isSuccessReceiverIds) {
      const newFilteredFoundUsers = foundUsers.filter((user) => {
        if (currentUserId !== user.userId && !receiverIds.includes(user.userId)) {
          return user;
        }
      });
      setFilteredFoundUsers(newFilteredFoundUsers);
    }
  }, [currentUserId, foundUsers, isSuccessFoundUsers, isSuccessReceiverIds, receiverIds]);

  return (
    <div>
      <Divider />
      <h2 className="px-3 text-lg font-bold">Found users</h2>

      {isLoadingFoundUsers ||
        (isLoadingReceiverIds && (
          <div className="flex w-full">
            <ProgressSpinner className="h-8 w-8" />
          </div>
        ))}

      {filteredFoundUsers.length > 0 && (
        <ul className="mt-3.5 flex grid-cols-2 flex-col gap-y-3.5 md:grid">
          {filteredFoundUsers.map(
            (user) =>
              currentUserId !== user.userId &&
              !receiverIds?.includes(user.userId) && (
                <FoundUserContact key={user.userId} userId={user.userId} username={user.username} />
              )
          )}
        </ul>
      )}

      {filteredFoundUsers.length === 0 && <p className="text-center text-lg font-bold">No users were found.</p>}
      {filteredFoundUsers.length === 1 && filteredFoundUsers[0].userId === currentUserId && (
        <p className="text-center text-lg font-bold">No users were found.</p>
      )}
    </div>
  );
}

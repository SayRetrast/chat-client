import { Divider } from "primereact/divider";
import { ProgressSpinner } from "primereact/progressspinner";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useGetUserDialogsQuery } from "../../state/services/dialog.service";
import ContactItem from "./contactItem";

export default function Contacts({ currentUserId }: { currentUserId: string }) {
  const { accessToken } = useSelector((state: RootState) => state.accessToken);
  const { data, isLoading, isSuccess } = useGetUserDialogsQuery({ accessToken: accessToken! });

  return (
    <div>
      <Divider />
      <h2 className="px-3 text-lg font-bold">Contacts</h2>

      {isLoading && (
        <div className="flex w-full">
          <ProgressSpinner className="h-8 w-8" />
        </div>
      )}

      {isSuccess && data.length > 0 && (
        <ul className="mt-3.5 flex grid-cols-2 flex-col gap-y-3.5 md:grid">
          {data.map((contact) => (
            <ContactItem
              key={contact.dialogId}
              dialogId={contact.dialogId}
              username={currentUserId === contact.userOneId ? contact.userTwo.username : contact.userOne.username}
            />
          ))}
        </ul>
      )}

      {isSuccess && data.length === 0 && <p className="text-center text-lg font-bold">No contacts.</p>}
    </div>
  );
}

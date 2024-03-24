import { Avatar } from "primereact/avatar";
import { useCreateDialogMutation } from "../../state/services/dialog.service";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useNavigate } from "react-router-dom";

export default function FoundUserContact({ userId, username }: { userId: string; username: string }) {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state: RootState) => state.accessToken);
  const [createDialog] = useCreateDialogMutation();

  const createDialogHandler = async () => {
    const dialog = await createDialog({ accessToken: accessToken!, userId: userId }).unwrap();
    navigate(`/dialog/${dialog.dialogId}`);
  };

  return (
    <li className="cursor-pointer rounded px-4 py-1.5 transition-colors hover:bg-[var(--surface-ground)]">
      <div className="flex gap-x-4" onClick={createDialogHandler}>
        <Avatar className="p-overlay-badge" icon="pi pi-user" size="large"></Avatar>

        <div className="flex flex-col">
          <p className="text-lg font-medium leading-none">{username}</p>
          <p className="mt-1 text-[var(--text-color-secondary)]">Click to start chatting</p>
        </div>
      </div>
    </li>
  );
}

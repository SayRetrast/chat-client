import { Avatar } from "primereact/avatar";
import { Link } from "react-router-dom";

export default function FoundUserContact({ userId, username }: { userId: string; username: string }) {
  return (
    <li className="cursor-pointer rounded px-4 py-1.5 transition-colors hover:bg-[var(--surface-ground)]">
      <Link to={`/dialog/${userId}`} className="flex gap-x-4">
        <Avatar className="p-overlay-badge" icon="pi pi-user" size="large"></Avatar>

        <div className="flex flex-col">
          <p className="text-lg font-medium leading-none">{username}</p>
          <p className="mt-1 text-[var(--text-color-secondary)]">Click to start chatting</p>
        </div>
      </Link>
    </li>
  );
}

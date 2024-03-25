import { Avatar } from "primereact/avatar";
import { Link } from "react-router-dom";

export default function ContactItem({ dialogId, username }: { dialogId: string; username: string }) {
  return (
    <li className="cursor-pointer rounded px-4 py-1.5 transition-colors hover:bg-[var(--surface-ground)]">
      <Link to={`/dialog/${dialogId}`} className="flex gap-x-4">
        <Avatar className="p-overlay-badge" icon="pi pi-user" size="large"></Avatar>

        <h3 className="text-lg font-medium leading-none">{username}</h3>
      </Link>
    </li>
  );
}

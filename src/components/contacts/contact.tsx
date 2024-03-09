import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { Link } from "react-router-dom";

export default function Contact({
  userId,
  username,
  message,
  unreadMessagesCount,
}: {
  userId: number;
  username: string;
  message: string;
  unreadMessagesCount: number;
}) {
  return (
    <li className="cursor-pointer rounded px-4 py-1.5 transition-colors hover:bg-[var(--surface-ground)]">
      <Link to={`/dialog/${userId}`} className="flex gap-x-4">
        <Avatar className="p-overlay-badge" icon="pi pi-user" size="large">
          {unreadMessagesCount && <Badge value={unreadMessagesCount} className="mr-1 mt-1" />}
        </Avatar>

        <div className="mt-auto flex flex-col">
          <h3 className="text-lg font-medium leading-none">{username}</h3>
          <p className="mt-1 text-[var(--text-color-secondary)]">{message}</p>
        </div>

        <div className="my-auto ml-auto flex flex-col">
          <i className="pi pi-check translate-y-1 text-xs text-[var(--primary-color)]"></i>
          <i className="pi pi-check -translate-y-1 text-xs text-[var(--primary-color)]"></i>
        </div>
      </Link>
    </li>
  );
}

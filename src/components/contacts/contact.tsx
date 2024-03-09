import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";

export default function Contact({
  username,
  message,
  unreadMessagesCount,
}: {
  username: string;
  message: string;
  unreadMessagesCount: number;
}) {
  return (
    <li className="flex cursor-pointer gap-x-4 rounded px-4 py-1.5 transition-colors hover:bg-[var(--surface-ground)]">
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
    </li>
  );
}

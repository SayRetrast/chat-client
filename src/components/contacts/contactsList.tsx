import { contacts } from "../../lib/placeholders";
import { cn } from "../../lib/utils";
import Contact from "./contact";

export default function ContactsList({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-y-3", className)}>
      {contacts.map(({ id, username, messages }) => (
        <Contact
          key={id}
          userId={id}
          username={username}
          message={messages[messages.length - 1]}
          unreadMessagesCount={messages.length - 2}
        />
      ))}
    </ul>
  );
}

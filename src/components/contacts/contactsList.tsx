import { contacts } from "../../lib/placeholders";
import Contact from "./contact";

export default function ContactsList() {
  return (
    <ul className="flex flex-col gap-y-3">
      {contacts.map(({ id, username, messages }) => (
        <Contact
          key={id}
          username={username}
          message={messages[messages.length - 1]}
          unreadMessagesCount={messages.length - 2}
        />
      ))}
    </ul>
  );
}

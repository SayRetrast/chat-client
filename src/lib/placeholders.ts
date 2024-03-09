// Temporary file that contains JSON Mockups.

type Contact = {
  id: number;
  username: string;
  messages: string[];
};

export const user: { id: number; username: string; isAuth: boolean } = {
  id: 46,
  username: "Retrast",
  isAuth: true,
};

export const contacts: Contact[] = [
  { id: 1, username: "Keke3h", messages: ["First message", "Second message", "Last message"] },
  { id: 2, username: "AndreyMolot", messages: ["First message", "Second message", "Last message"] },
  { id: 3, username: "Tetrast", messages: ["First message", "Second message", "Last message"] },
  { id: 4, username: "LovePink", messages: ["First message", "Second message", "Last message"] },
];

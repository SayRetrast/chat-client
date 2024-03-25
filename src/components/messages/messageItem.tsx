import { cn, extractTimeFromDate } from "../../lib/utils";

export default function MessageItem({
  text,
  username,
  date,
  isRight,
}: {
  text: string;
  username: string;
  date: string;
  isRight: boolean;
}) {
  return (
    <div
      className={cn("max-w-[calc(100%_-_35%)] break-all rounded bg-[var(--surface-ground)] p-2", {
        "ml-[35%] bg-[var(--surface-overlay)]": isRight,
      })}
    >
      <div className="flex justify-between text-sm text-[var(--text-color-secondary)]">
        <p>{username}</p>
        <p>{extractTimeFromDate(date)}</p>
      </div>

      <div className="flex gap-x-2">
        <p className="mt-1">{text}</p>
      </div>
    </div>
  );
}

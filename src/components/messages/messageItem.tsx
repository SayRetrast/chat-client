import { Button } from "primereact/button";
import { cn, extractTimeFromDate } from "../../lib/utils";

export default function MessageItem({
  text,
  username,
  date,
  isRight,
  messageId,
  deleteMessage,
}: {
  text: string;
  username: string;
  date: string;
  isRight: boolean;
  messageId: number;
  deleteMessage: (messageId: number) => void;
}) {
  return (
    <div
      className={cn("max-w-[calc(100%_-_35%)] break-all rounded bg-[var(--surface-ground)] p-2", {
        "ml-[35%] bg-[var(--surface-overlay)]": isRight,
      })}
    >
      <div className="flex justify-between text-sm text-[var(--text-color-secondary)]">
        <p>{username}</p>

        <div className="flex gap-x-2">
          <p>{extractTimeFromDate(date)}</p>
          {isRight && (
            <Button
              icon="pi pi-trash"
              size="small"
              className="h-fit w-fit border-0 bg-transparent p-0 text-red-500"
              onClick={() => deleteMessage(messageId)}
            />
          )}
        </div>
      </div>

      <div className="flex gap-x-2">
        <p className="mt-1">{text}</p>
      </div>
    </div>
  );
}

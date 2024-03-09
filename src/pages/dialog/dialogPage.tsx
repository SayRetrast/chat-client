import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { cn } from "../../lib/utils";

const noMessages: boolean = false;

function Message({ text, username, time, isRight }: { text: string; username: string; time: string; isRight?: true }) {
  return (
    <div
      className={cn("max-w-[calc(100%_-_15%)] break-all rounded bg-[var(--surface-ground)] p-2", {
        "ml-[15%] bg-[var(--surface-overlay)]": isRight,
      })}
    >
      <div className="flex justify-between text-sm text-[var(--text-color-secondary)]">
        <p>{username}</p>
        <p>{time}</p>
      </div>

      <div className="flex gap-x-2">
        <p className="mt-1">{text}</p>

        <div className="ml-auto mt-auto flex flex-col">
          {!isRight && <i className="pi pi-check translate-y-1 text-xs text-[var(--text-color-secondary)]"></i>}
          <i className="pi pi-check -translate-y-1 text-xs text-[var(--text-color-secondary)]"></i>
        </div>
      </div>
    </div>
  );
}

export default function DialogPage() {
  return (
    <div className="flex h-[calc(100svh_-_46px_-_4rem)] flex-col gap-y-3">
      {noMessages ? (
        <p className="text-center text-lg font-medium">Start chatting by typing in the filed bellow.</p>
      ) : (
        <>
          <p className="text-center">24 March</p>
          <Message username="AndreyMolot" text="Some message" time="13:11" />
          <Message username="Retrast" text="Some message second" time="13:12" isRight />
        </>
      )}

      <div className="mt-auto grid grid-cols-[1fr_31.5px] gap-x-2">
        <InputText placeholder="Type your message here" />
        <Button icon="pi pi-send" />
      </div>
    </div>
  );
}

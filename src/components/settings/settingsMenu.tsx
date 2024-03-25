import { cn } from "../../lib/utils";

export default function SettingsMenu({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ul className={cn("flex flex-col gap-y-3", className)}>{children}</ul>;
}

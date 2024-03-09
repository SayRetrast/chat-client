import { cn } from "../../lib/utils";

export default function SettingsMenuItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <li className={cn("flex flex-col gap-y-2", className)}>{children}</li>;
}

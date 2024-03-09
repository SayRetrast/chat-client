export default function SettingsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="text-xl font-bold">{title}</h2>

      {children}
    </div>
  );
}

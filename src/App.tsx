import { Button } from "primereact/button";

export default function App() {
  return (
    <main className="flex gap-4 p-4">
      <h1 className="text-bold text-3xl underline">Hello world</h1>
      <Button label="Primary" icon="pi pi-check" className="bg-bluegray-600" />
      <Button label="Secondary" severity="secondary" />
    </main>
  );
}

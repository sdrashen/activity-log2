import EmptyState from "@/components/EmptyState";
import ActiviyForm from "@/components/ActivityForm";
import DurationBadge from "@/components/DurationBadge";
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-2xl font-bold mb-8">ActivityLog</h1>
      <ActiviyForm />
      <DurationBadge duration="2h 30m" />
      <EmptyState />
    </main>
  );
}
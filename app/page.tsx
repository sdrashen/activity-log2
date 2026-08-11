import ActivityForm from "@/components/ActivityForm";
import EmptyState from "@/components/EmptyState";
import ActivityList from "@/components/ActivityList";

const activities = [
  {
    id: "1",
    description: "Reunião de alinhamento com o time",
    startTime: "09:00",
    endTime: "10:30",
    duration: "1h 30min",
  },
  {
    id: "2",
    description: "Desenvolvimento do componente ActivityForm",
    startTime: "11:00",
    endTime: "13:00",
    duration: "2h 0min",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">ActivityLog</h1>
      <ActivityForm />
      {activities.length > 0 ? (
        <ActivityList activities={activities} />
      ) : (
        <EmptyState />
      )}
    </main>
  );
}
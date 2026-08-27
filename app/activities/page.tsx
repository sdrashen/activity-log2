import { getActivities, getActivitySummary } from '@/lib/activities';
import ActivityManager from '@/components/ActivityManager';
import ActivitySummary from '@/components/ActivitySummary';

function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function formatDuration(start: Date, end: Date): string {
  const totalMin = Math.floor((end.getTime() - start.getTime()) / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
}

function toDatetimeLocalValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default async function ActivitiesPage() {
  const [activitiesResult, summaryResult] = await Promise.all([
    getActivities(),
    getActivitySummary(),
  ]);

  if (!activitiesResult.success) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Atividades</h1>
        <p role="alert" className="text-red-400">
          {activitiesResult.error}
        </p>
      </main>
    );
  }

  const activities = activitiesResult.data.map((activity) => ({
    id: String(activity.id),
    description: activity.description,
    startTime: formatTime(activity.startTime),
    endTime: formatTime(activity.endTime),
    duration: formatDuration(activity.startTime, activity.endTime),
    startTimeInput: toDatetimeLocalValue(activity.startTime),
    endTimeInput: toDatetimeLocalValue(activity.endTime),
  }));

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Atividades</h1>

      {summaryResult.success && summaryResult.data.count > 0 && (
        <ActivitySummary
          count={summaryResult.data.count}
          totalMinutes={summaryResult.data.totalMinutes}
          avgMinutes={summaryResult.data.avgMinutes}
        />
      )}

      <ActivityManager activities={activities} />
    </main>
  );
}

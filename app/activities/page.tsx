import { getActivities } from '@/lib/activities'
import ActivityManager from '@/components/ActivityManager'

function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function formatDuration(start: Date, end: Date): string {
  const totalMin = Math.floor((end.getTime() - start.getTime()) / 60000)
  const h = Math.floor(totalMin / 60)
  const m = totalMin % 60
  return h > 0 ? `${h}h ${m}min` : `${m}min`
}

export default async function ActivitiesPage() {
  const result = await getActivities()

  if (!result.success) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Atividades</h1>
        <p role="alert" className="text-red-400">{result.error}</p>
      </main>
    )
  }

  const activities = result.data.map((activity) => ({
    id: String(activity.id),
    description: activity.description,
    startTime: formatTime(activity.startTime),
    endTime: formatTime(activity.endTime),
    duration: formatDuration(activity.startTime, activity.endTime),
  }))

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Atividades</h1>
      <ActivityManager activities={activities} />
    </main>
  )
}
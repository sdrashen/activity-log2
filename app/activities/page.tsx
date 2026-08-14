import { getActivities } from '@/lib/activities'

function formatDuration(start: Date, end: Date): string {
  const minutes = Math.round((end.getTime() - start.getTime()) / 60000)
  return `${minutes} min`
}

export default async function ActivitiesPage() {
  const result = await getActivities()

  if (!result.success) {
    return (
      <main>
        <h1>Atividades</h1>
        <p role="alert">{result.error}</p>
      </main>
    )
  }

  const { data: activities } = result

  if (activities.length === 0) {
    return (
      <main>
        <h1>Atividades</h1>
        <p>Nenhuma atividade registrada ainda.</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Atividades</h1>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <strong>{activity.description}</strong>
            <div>Início: {activity.startTime.toLocaleString('pt-BR')}</div>
            <div>Término: {activity.endTime.toLocaleString('pt-BR')}</div>
            <div>Duração: {formatDuration(activity.startTime, activity.endTime)}</div>
          </li>
        ))}
      </ul>
    </main>
  )
}
type SummaryProps = {
  count: number
  totalMinutes: number
  avgMinutes: number
}

function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}min`
  if (m === 0) return `${h}h`
  return `${h}h ${m}min`
}

export default function ActivitySummary({ count, totalMinutes, avgMinutes }: SummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-slate-900 rounded-xl p-4 text-center">
        <p className="text-3xl font-bold text-white">{count}</p>
        <p className="text-sm text-slate-400 mt-1">Atividades</p>
      </div>
      <div className="bg-slate-900 rounded-xl p-4 text-center">
        <p className="text-3xl font-bold text-white">{formatMinutes(totalMinutes)}</p>
        <p className="text-sm text-slate-400 mt-1">Tempo total</p>
      </div>
      <div className="bg-slate-900 rounded-xl p-4 text-center">
        <p className="text-3xl font-bold text-white">{formatMinutes(avgMinutes)}</p>
        <p className="text-sm text-slate-400 mt-1">Média por atividade</p>
      </div>
    </div>
  )
}
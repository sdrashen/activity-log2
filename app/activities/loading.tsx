export default function Loading() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Atividades</h1>

      {/* Painel de resumo skeleton */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-900 rounded-xl p-4 text-center animate-pulse">
            <div className="h-8 bg-slate-700 rounded mb-2 mx-auto w-16" />
            <div className="h-4 bg-slate-700 rounded mx-auto w-24" />
          </div>
        ))}
      </div>

      {/* Lista skeleton */}
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-900 rounded-xl p-4 animate-pulse">
            <div className="h-4 bg-slate-700 rounded mb-3 w-3/4" />
            <div className="h-3 bg-slate-700 rounded w-1/2" />
          </div>
        ))}
      </div>
    </main>
  );
}

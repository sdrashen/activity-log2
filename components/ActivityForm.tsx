export default function ActivityFrom() {
  return(
    <div className="bg-slate-900 rounded-xl p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">Nova atividade</h2>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-slate-400 mb-1 block">
            Descrição
          </label>
          <textarea
            className="w-full bg-slate-800 rounded-lg p-3 text-white placeholder:text-slate-500 resize-none"
            placeholder="O que você fez?"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-400 mb-1 block">
              Início
            </label>
            <input
              type="datetime-local"
              className="w-full bg-slate-800 rounded-lg p-3 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">
              Término
            </label>
            <input
              type="datetime-local"
              className="w-full bg-slate-800 rounded-lg p-3 text-white"
            />
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors">
          Adicionar atividade
        </button>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';

type ActivityFormProps = {
  onAdd: (activity: {
    description: string;
    startTime: string;
    endTime: string;
  }) => void;
};

export default function ActivityForm({ onAdd }: ActivityFormProps) {
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    if (!description.trim()) {
      setError('A descrição é obrigatória.');
      return;
    }
    if (!startTime || !endTime) {
      setError('Preencha os horários de início e término.');
      return;
    }
    if (endTime <= startTime) {
      setError('O término deve ser após o início.');
      return;
    }

    setError('');
    onAdd({ description, startTime, endTime });
    setDescription('');
    setStartTime('');
    setEndTime('');
  }

  return (
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">
              Término
            </label>
            <input
              type="datetime-local"
              className="w-full bg-slate-800 rounded-lg p-3 text-white"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
        >
          Adicionar atividade
        </button>
      </div>
    </div>
  );
}
'use client';

import { useActionState, useEffect, useRef } from 'react';
import { createActivity, type CreateActivityState } from '@/lib/actions';

const initialState: CreateActivityState = { success: false, error: null };

export default function ActivityForm() {
  const [state, formAction, isPending] = useActionState(createActivity, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="bg-slate-900 rounded-xl p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">Nova atividade</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-slate-400 mb-1 block">Descrição</label>
          <textarea
            name="description"
            className="w-full bg-slate-800 rounded-lg p-3 text-white placeholder:text-slate-500 resize-none"
            placeholder="O que você fez?"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Início</label>
            <input
              type="datetime-local"
              name="startTime"
              className="w-full bg-slate-800 rounded-lg p-3 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Término</label>
            <input
              type="datetime-local"
              name="endTime"
              className="w-full bg-slate-800 rounded-lg p-3 text-white"
            />
          </div>
        </div>

        {state.error && <p className="text-red-400 text-sm">{state.error}</p>}
        {state.success && (
          <p className="text-green-400 text-sm">Atividade salva com sucesso!</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors"
        >
          {isPending ? 'Salvando...' : 'Adicionar atividade'}
        </button>
      </div>
    </form>
  );
}
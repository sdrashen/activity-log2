'use client';

import { useActionState, useEffect, useRef } from 'react';
import { createActivity, updateActivity, type ActivityFormState } from '@/lib/actions';

const initialState: ActivityFormState = { success: false, error: null };

type ActivityFormProps = {
  activity?: {
    id: string;
    description: string;
    startTimeInput: string;
    endTimeInput: string;
  };
  onCancel?: () => void;
  onSuccess?: () => void;
};

export default function ActivityForm({ activity, onCancel, onSuccess }: ActivityFormProps) {
  const action = activity ? updateActivity : createActivity;
  const [state, formAction, isPending] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
  if (state.success) {
    formRef.current?.reset();
    onSuccess?.();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="bg-slate-900 rounded-xl p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">
        {activity ? 'Editar atividade' : 'Nova atividade'}
      </h2>
      <div className="flex flex-col gap-4">
        {activity && <input type="hidden" name="id" value={activity.id} />}

        <div>
          <label className="text-sm text-slate-400 mb-1 block">Descrição</label>
          <textarea
            name="description"
            defaultValue={activity?.description}
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
              defaultValue={activity?.startTimeInput}
              className="w-full bg-slate-800 rounded-lg p-3 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Término</label>
            <input
              type="datetime-local"
              name="endTime"
              defaultValue={activity?.endTimeInput}
              className="w-full bg-slate-800 rounded-lg p-3 text-white"
            />
          </div>
        </div>

        {state.error && <p className="text-red-400 text-sm">{state.error}</p>}
        {state.success && (
          <p className="text-green-400 text-sm">
            {activity ? 'Alterações salvas!' : 'Atividade salva com sucesso!'}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {isPending ? 'Salvando...' : activity ? 'Salvar alterações' : 'Adicionar atividade'}
          </button>
          {activity && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-3 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
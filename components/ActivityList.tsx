'use client';

import { useState, useTransition } from 'react';
import DurationBadge from '@/components/DurationBadge';
import ActivityForm from '@/components/ActivityForm';
import { deleteActivity } from '@/lib/actions';

type Activity = {
  id: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: string;
  startTimeInput: string;
  endTimeInput: string;
};

type ActivityListProps = {
  activities: Activity[];
};

export default function ActivityList({ activities }: ActivityListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    setDeletingId(id);
    startTransition(async () => {
      await deleteActivity(Number(id));
      setDeletingId(null);
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {activities.map((activity) =>
        editingId === activity.id ? (
          <ActivityForm
            key={activity.id}
            activity={activity}
            onCancel={() => setEditingId(null)}
            onSuccess={() => setEditingId(null)}
          />
        ) : (
          <div
            key={activity.id}
            className={`bg-slate-900 rounded-xl p-4 flex flex-col gap-2 transition-opacity ${
              deletingId === activity.id ? 'opacity-50' : 'opacity-100'
            }`}
          >
            <div className="flex justify-between items-start">
              <p className="text-white font-medium">{activity.description}</p>
              <div className="flex gap-3 ml-4">
                <button
                  onClick={() => setEditingId(activity.id)}
                  disabled={deletingId === activity.id}
                  className="text-slate-500 hover:text-blue-400 transition-colors text-sm disabled:opacity-50"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(activity.id)}
                  disabled={deletingId === activity.id || isPending}
                  className="text-slate-500 hover:text-red-400 transition-colors text-sm disabled:opacity-50"
                >
                  {deletingId === activity.id ? 'Removendo...' : 'Remover'}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <span>
                {activity.startTime} → {activity.endTime}
              </span>
              <DurationBadge duration={activity.duration} />
            </div>
          </div>
        )
      )}
    </div>
  );
}

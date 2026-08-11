'use client';

import { useState } from 'react';
import ActivityForm from '@/components/ActivityForm';
import ActivityList from '@/components/ActivityList';
import EmptyState from '@/components/EmptyState';

type Activity = {
  id: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: string;
};

function calculateDuration(startTime: string, endTime: string): string {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffMs = end.getTime() - start.getTime();
  const totalMin = Math.floor(diffMs / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
}

export default function ActivityManager() {
  const [activities, setActivities] = useState<Activity[]>([]);

  function handleAdd(data: {
    description: string;
    startTime: string;
    endTime: string;
  }) {
    const newActivity: Activity = {
      id: crypto.randomUUID(),
      description: data.description,
      startTime: new Date(data.startTime).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      endTime: new Date(data.endTime).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      duration: calculateDuration(data.startTime, data.endTime),
    };

    setActivities((prev) => [...prev, newActivity]);
  }

  function handleRemove(id: string) {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div>
      <ActivityForm onAdd={handleAdd} />
      {activities.length > 0 ? (
        <ActivityList activities={activities} onRemove={handleRemove} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
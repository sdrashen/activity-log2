'use client';

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

type ActivityManagerProps = {
  activities: Activity[];
};

export default function ActivityManager({ activities }: ActivityManagerProps) {
  return (
    <div>
      <ActivityForm />
      {activities.length > 0 ? (
        <ActivityList
          activities={activities}
          onRemove={() => {
            // TODO: implementar exclusão persistida no banco em uma fase futura
          }}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
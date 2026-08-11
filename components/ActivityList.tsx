import DurationBadge from "@/components/DurationBadge";

type Activity = {
  id: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: string;
};

type ActivityListProps = {
  activities: Activity[];
};

export default function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="flex flex-col gap-3">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="bg-slate-900 rounded-xl p-4 flex flex-col gap-2"
        >
          <p className="text-white font-medium">{activity.description}</p>
          <div className="flex items-center gap-3 text-slate-400 text-sm">
            <span>{activity.startTime} → {activity.endTime}</span>
            <DurationBadge duration={activity.duration} />
          </div>
        </div>
      ))}
    </div>
  );
}
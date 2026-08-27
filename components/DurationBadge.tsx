type DurationBadgeProps = {
  duration: string;
};

export default function DurationBadge({ duration }: DurationBadgeProps) {
  return (
    <span className="bg-blue-900 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full">
      {duration}
    </span>
  );
}

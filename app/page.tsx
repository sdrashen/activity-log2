import ActivityManager from '@/components/ActivityManager';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">ActivityLog</h1>
      <ActivityManager />
    </main>
  );
}
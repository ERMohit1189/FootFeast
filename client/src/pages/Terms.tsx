import { Header } from '@/components/Header';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
        <p className="text-slate-400">This is mock Terms of Service content for development and testing purposes.</p>
      </main>
    </div>
  );
}

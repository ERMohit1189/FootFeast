import { Header } from '@/components/Header';

export default function BecomeRider() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Apply to Become a Rider</h1>
        <p className="text-slate-400">This is a mock application page for delivery partners. Replace with a real form when ready.</p>
      </main>
    </div>
  );
}

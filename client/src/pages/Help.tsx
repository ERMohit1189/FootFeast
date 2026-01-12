import { Header } from '@/components/Header';

export default function Help() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Help Center</h1>
        <p className="text-slate-400">For support, contact the mock support team at <strong>support@fooddash.local</strong>.</p>
      </main>
    </div>
  );
}

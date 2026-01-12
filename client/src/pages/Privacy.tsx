import { Header } from '@/components/Header';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-slate-400">This is mock Privacy Policy content for development and testing purposes.</p>
      </main>
    </div>
  );
}

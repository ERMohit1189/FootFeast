import { Header } from '@/components/Header';

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Blog</h1>
        <p className="text-slate-400">Blog listings will be populated here (mock content).</p>
      </main>
    </div>
  );
}

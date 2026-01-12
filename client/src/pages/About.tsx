import { Header } from '@/components/Header';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <p className="text-slate-400">FoodDash is a demo app showcasing a food delivery UI — this is placeholder content.</p>
      </main>
    </div>
  );
}

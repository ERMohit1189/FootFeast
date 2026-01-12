import { Header } from '@/components/Header';

export default function AddRestaurant() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Add Your Restaurant</h1>
        <p className="text-slate-400">This is a placeholder page to onboard restaurant partners.</p>
      </main>
    </div>
  );
}

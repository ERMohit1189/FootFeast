import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Categories } from '@/components/Categories';
import { RestaurantGrid } from '@/components/RestaurantGrid';
import { CartSidebar } from '@/components/CartSidebar';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-24 md:pb-0">
        <Hero />
        <Categories />
        <RestaurantGrid title="Featured Restaurants" showFeatured limit={4} />
        <RestaurantGrid title="All Restaurants Near You" />
      </main>
      <CartSidebar />
      <Footer />
    </div>
  );
}

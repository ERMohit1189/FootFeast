import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Categories } from '@/components/Categories';
import { RestaurantGrid } from '@/components/RestaurantGrid';
import { CartSidebar } from '@/components/CartSidebar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-24 md:pb-0">
        <Hero />
        <Categories />
        
        {/* Advertisement Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative h-48 rounded-[2rem] overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 p-8 flex items-center justify-between group cursor-pointer shadow-lg"
              >
                <div className="relative z-10">
                  <Badge className="bg-white/20 text-white border-none mb-3">Limited Offer</Badge>
                  <h3 className="text-2xl font-black text-white mb-2">First Order: 50% OFF</h3>
                  <p className="text-blue-100 text-sm">Use code: <span className="font-mono font-bold text-white bg-blue-500/50 px-2 py-0.5 rounded">NEW50</span></p>
                  <Button size="sm" className="mt-4 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl">Order Now</Button>
                </div>
                <div className="absolute right-0 bottom-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  <ShoppingBag className="w-40 h-40 translate-x-10 translate-y-10" />
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative h-48 rounded-[2rem] overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 p-8 flex items-center justify-between group cursor-pointer shadow-lg"
              >
                <div className="relative z-10">
                  <Badge className="bg-white/20 text-white border-none mb-3">Partner Program</Badge>
                  <h3 className="text-2xl font-black text-white mb-2">Become a Driver</h3>
                  <p className="text-purple-100 text-sm">Earn up to ₹30k per month + bonuses</p>
                  <Button size="sm" className="mt-4 bg-white text-purple-600 hover:bg-white/90 font-bold rounded-xl">Join Now</Button>
                </div>
                <div className="absolute right-0 bottom-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  <Zap className="w-40 h-40 translate-x-10 translate-y-10" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <RestaurantGrid title="Featured Restaurants" showFeatured limit={4} />
        <RestaurantGrid title="All Restaurants Near You" />
      </main>
      <CartSidebar />
      <Footer />
    </div>
  );
}

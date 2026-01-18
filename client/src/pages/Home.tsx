import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Categories } from '@/components/Categories';
import { RestaurantGrid } from '@/components/RestaurantGrid';
import { CartSidebar } from '@/components/CartSidebar';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, ShoppingBag, ChevronLeft, Gift, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

const ADVERTISEMENTS = [
  {
    id: 1,
    title: "First Order: 50% OFF",
    subtitle: "Use code: NEW50",
    description: "Valid on all restaurants. Maximum discount ₹150.",
    icon: <ShoppingBag className="w-40 h-40" />,
    color: "from-blue-600 to-indigo-700",
    badge: "Limited Offer",
    badgeColor: "bg-white/20 text-white",
    btnText: "Order Now",
    btnColor: "bg-white text-blue-600 hover:bg-blue-50"
  },
  {
    id: 2,
    title: "Become a Driver",
    subtitle: "Earn up to ₹30k/month",
    description: "Join India's largest delivery fleet with flexible hours.",
    icon: <Zap className="w-40 h-40" />,
    color: "from-purple-600 to-pink-600",
    badge: "Partner Program",
    badgeColor: "bg-white/20 text-white",
    btnText: "Join Now",
    btnColor: "bg-white text-purple-600 hover:bg-white/90"
  },
  {
    id: 3,
    title: "Free Delivery",
    subtitle: "On your first 3 orders",
    description: "No minimum order value required. Try it today!",
    icon: <Clock className="w-40 h-40" />,
    color: "from-emerald-600 to-teal-700",
    badge: "Exclusive",
    badgeColor: "bg-white/20 text-white",
    btnText: "Explore Now",
    btnColor: "bg-white text-emerald-600 hover:bg-emerald-50"
  },
  {
    id: 4,
    title: "Refer & Earn",
    subtitle: "Get ₹100 for each friend",
    description: "Share the love of food and earn wallet credits.",
    icon: <Gift className="w-40 h-40" />,
    color: "from-orange-500 to-amber-600",
    badge: "Referral",
    badgeColor: "bg-white/20 text-white",
    btnText: "Invite Friends",
    btnColor: "bg-white text-orange-600 hover:bg-orange-50"
  }
];

export default function Home() {
  const [adIndex, setAdIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % ADVERTISEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextAd = () => setAdIndex((prev) => (prev + 1) % ADVERTISEMENTS.length);
  const prevAd = () => setAdIndex((prev) => (prev - 1 + ADVERTISEMENTS.length) % ADVERTISEMENTS.length);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-24 md:pb-0">
        <Hero />
        <Categories />
        
        {/* Animated Advertisement Slider */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={adIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className={`relative h-56 md:h-64 rounded-[2.5rem] overflow-hidden bg-gradient-to-r ${ADVERTISEMENTS[adIndex].color} p-8 md:p-12 flex items-center justify-between shadow-xl`}
                >
                  <div className="relative z-10 max-w-lg">
                    <Badge className={`${ADVERTISEMENTS[adIndex].badgeColor} border-none mb-4 px-3 py-1 text-xs font-bold`}>
                      {ADVERTISEMENTS[adIndex].badge}
                    </Badge>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                      {ADVERTISEMENTS[adIndex].title}
                    </h3>
                    <p className="text-white/90 text-lg font-bold mb-2">
                      {ADVERTISEMENTS[adIndex].subtitle}
                    </p>
                    <p className="text-white/70 text-sm mb-6 hidden md:block">
                      {ADVERTISEMENTS[adIndex].description}
                    </p>
                    <Button size="lg" className={`${ADVERTISEMENTS[adIndex].btnColor} font-black rounded-2xl px-8 h-12 shadow-lg transition-transform active:scale-95`}>
                      {ADVERTISEMENTS[adIndex].btnText}
                    </Button>
                  </div>
                  
                  <div className="absolute right-0 bottom-0 opacity-20 group-hover:opacity-30 transition-opacity transform translate-x-10 translate-y-10">
                    {ADVERTISEMENTS[adIndex].icon}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button 
                onClick={prevAd}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextAd}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-6 left-12 flex gap-2">
                {ADVERTISEMENTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setAdIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === adIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>
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

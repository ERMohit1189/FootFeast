import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { restaurants } from '@/lib/store';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Star, ChevronDown, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';

export default function Home3() {
  const STAR_STROKE = 'rgba(255,255,255,0.22)';
  const [showOptions, setShowOptions] = useState(false);
  const membershipScrollRef = useRef<HTMLDivElement | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    const el = membershipScrollRef.current;
    if (!el) return;
    const check = () => {
      const hasOverflow = el.scrollHeight > el.clientHeight + 2;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
      setShowScrollHint(hasOverflow && !atBottom);
    };
    check();
    el.addEventListener('scroll', check);
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [restaurants.length]);

  const scrollChevron = () => {
    const el = membershipScrollRef.current;
    if (!el) return;
    const maxScrollTop = el.scrollHeight - el.clientHeight;
    const atBottom = el.scrollTop >= maxScrollTop - 4;
    if (atBottom) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const firstChild = el.firstElementChild as HTMLElement | null;
      const itemHeight = firstChild?.offsetHeight ?? 68;
      el.scrollBy({ top: itemHeight + 8, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('/patterns/dots.svg')] bg-gradient-to-br from-orange-50 via-background to-yellow-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6 rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1400&h=400&fit=crop" alt="Banner" className="w-full h-48 object-cover" />
              </motion.div>

              <div className="grid grid-cols-3 gap-4">
                {restaurants.map((r) => (
                  <motion.div key={r.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Number(r.id) * 0.05 }} className="bg-white rounded-2xl shadow-sm p-3 flex flex-col gap-2">
                    <div className="aspect-video rounded-lg overflow-hidden flex-shrink-0">
                      <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-sm truncate">{r.name}</h4>
                        <div className="text-[10px] text-muted-foreground whitespace-nowrap">{r.distance}</div>
                      </div>

                      <p className="text-[10px] text-muted-foreground truncate">{r.cuisine}</p>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <span>{r.rating}</span>
                          <Star className="w-2.5 h-2.5 fill-primary" />
                        </div>
                        <div className="text-[10px] text-muted-foreground truncate">{r.deliveryTime}</div>
                      </div>

                      <div className="mt-3">
                        <Link href={`/restaurant/${r.id}`}>
                          <Button size="sm" variant="outline" className="w-full text-[10px] h-7 rounded-lg">View menu</Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <aside className="lg:w-1/3 sticky top-24 self-start">
              <div className="bg-white/5 rounded-2xl p-4 border border-border/30">
                <h4 className="font-semibold">Membership</h4>
                <div ref={membershipScrollRef} className="mt-4 max-h-80 overflow-y-auto modern-scrollbar">
                  {restaurants.map(r => (
                    <div key={r.id} className="mb-3 p-3 rounded-lg bg-gradient-to-br from-slate-800/60 to-slate-900/60">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-12 rounded-md overflow-hidden flex-shrink-0"><img src={r.image} alt={r.name} className="w-full h-full object-cover" /></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between"><div className="font-semibold text-amber-100 truncate">{r.name}</div><div className="text-xs text-amber-200">{r.distance}</div></div>
                          <div className="text-xs text-amber-100">{r.cuisine}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {showScrollHint && (
                  <div className="mt-2 text-xs text-amber-200">Scroll to see more</div>
                )}

                <div className="mt-6">
                  <h5 className="font-medium">Top Offers</h5>
                  <ul className="mt-3 space-y-2">
                    <li className="text-sm">50% OFF at The Burger Joint</li>
                    <li className="text-sm">Buy 1 Get 1 at Pizza Paradise</li>
                    <li className="text-sm">Free Naan at Curry House</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <button onClick={() => setShowOptions(s => !s)} className="px-3 py-2 rounded-md bg-primary text-white inline-flex items-center gap-2"><Sliders className="w-4 h-4"/> Options</button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <CartSidebar />
      <Footer />
    </div>
  );
}

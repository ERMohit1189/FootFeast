import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store';

export function CartSidebar() {
  const { cart, cartTotal, cartCount } = useCart();

  if (cartCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden"
      >
        <Link href="/cart" data-testid="link-cart-mobile">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary text-white rounded-2xl p-4 shadow-2xl shadow-primary/30 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold">{cartCount} item{cartCount > 1 ? 's' : ''}</p>
                  <p className="text-sm text-white/80">${cartTotal.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                View Cart
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}

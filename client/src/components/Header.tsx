import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, MapPin, ShoppingBag, User, Menu, X, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export function Header({ theme }: { theme?: 'light' | 'dark' }) {
  const [location] = useLocation();
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const locationBtnClass = `hidden md:flex items-center gap-2 px-4 py-2 rounded-full transition-colors cursor-pointer ${theme === 'dark' ? 'bg-slate-800/40 hover:bg-slate-800/60 text-slate-100' : 'bg-muted hover:bg-muted/80'}`;
  const mutedText = theme === 'dark' ? 'text-slate-300' : 'text-muted-foreground';

  const containerClass = theme === 'dark' ? 'bg-slate-900 text-white border-b border-slate-800' : 'glass border-b border-border/50';

  return (
    <header className={`sticky top-0 z-50 ${containerClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          <div className="flex items-center gap-2 md:gap-8 flex-shrink-0">
            <Link href="/" data-testid="link-home">
              <motion.div 
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-white font-bold text-lg md:text-xl">F</span>
                </div>
                <span className="text-lg md:text-2xl font-bold text-foreground hidden sm:block">
                  Food<span className="text-primary">Dash</span>
                </span>

                {/* Quick variant links - visible on lg+ */}
                <nav className="hidden lg:flex items-center gap-2 ml-4">
                  <Link href="/home1" className="text-sm px-2 py-1 rounded hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-primary whitespace-nowrap">Home1</Link>
                  <Link href="/home2" className="text-sm px-2 py-1 rounded hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-primary whitespace-nowrap">Home2</Link>
                  <Link href="/home3" className="text-sm px-2 py-1 rounded hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-primary whitespace-nowrap">Home3</Link>
                </nav>
              </motion.div>
            </Link>

            <motion.button 
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap bg-muted hover:bg-muted/80"
              whileHover={{ scale: 1.02 }}
              data-testid="button-location"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className={`text-sm font-medium ${mutedText}`}>123 Main Street</span>
              <span className={`text-xs ${mutedText}`}>▼</span>
            </motion.button>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-2 lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search restaurants, cuisines..."
                className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 h-10 md:h-12 rounded-full border-border/50 bg-white/95 shadow-sm focus:bg-white focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary ring-offset-0 transition-colors text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-4 flex-shrink-0">
            <Link href="/cart" data-testid="link-cart">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative w-10 h-10 md:w-12 md:h-12 rounded-full hover:bg-primary/10"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Badge className="h-4 md:h-5 min-w-[1rem] md:min-w-[1.25rem] flex items-center justify-center p-0 text-[10px] md:text-xs bg-primary border-2 border-white">
                        {cartCount}
                      </Badge>
                    </motion.div>
                  )}
                </Button>
              </motion.div>
            </Link>

            <Link href="/login" data-testid="link-login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                <Button 
                  variant="outline" 
                  className="rounded-full gap-2 px-3 md:px-4 h-10 md:h-12 border-border/50 text-xs md:text-sm whitespace-nowrap"
                >
                  <User className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Login</span>
                </Button>
              </motion.div>
            </Link>

            <Link href="/restaurant/login" data-testid="link-restaurant-login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden xl:block">
                <Button 
                  variant="outline" 
                  className="rounded-full gap-2 px-4 h-12 border-border/50 bg-primary/5 border-primary/20 text-primary"
                >
                  <Store className="w-4 h-4" />
                  <span>Partner</span>
                </Button>
              </motion.div>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-10 h-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search restaurants..."
              className="w-full pl-12 pr-4 py-3 h-12 rounded-full border-border/50 bg-white/95 shadow-sm focus:bg-white focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-mobile"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background"
          >
            <div className="px-4 py-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Link href="/home1" className="p-3 rounded-xl hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-primary">Home1</Link>
                <Link href="/home2" className="p-3 rounded-xl hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-primary">Home2</Link>
                <Link href="/home3" className="p-3 rounded-xl hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-primary">Home3</Link>
                <Link href="/" className="p-3 rounded-xl hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-primary">Main</Link>
              </div>

              <div className="pt-2 border-t border-border/50">
                <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-muted transition-colors" data-testid="button-location-mobile">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Delivery to</p>
                  <p className={`text-sm ${mutedText}`}>123 Main Street</p>
                  </div>
                </button>
                <Link href="/login">
                  <Button variant="outline" className="w-full rounded-xl h-12 gap-2 mt-3" data-testid="button-login-mobile">
                    <User className="w-4 h-4" />
                    Login / Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

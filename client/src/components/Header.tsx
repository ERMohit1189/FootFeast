import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, MapPin, ShoppingBag, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [location] = useLocation();
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/" data-testid="link-home">
              <motion.div 
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <span className="text-xl md:text-2xl font-bold text-foreground hidden sm:block">
                  Food<span className="text-primary">Dash</span>
                </span>
              </motion.div>
            </Link>

            <motion.button 
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
              data-testid="button-location"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">123 Main Street</span>
              <span className="text-xs text-muted-foreground">▼</span>
            </motion.button>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for restaurants, cuisines, or dishes..."
                className="w-full pl-12 pr-4 py-3 h-12 rounded-full border-border/50 bg-muted/50 focus:bg-white transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/cart" data-testid="link-cart">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative w-12 h-12 rounded-full hover:bg-primary/10"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Badge className="h-5 min-w-5 flex items-center justify-center p-0 text-xs bg-primary border-2 border-white">
                        {cartCount}
                      </Badge>
                    </motion.div>
                  )}
                </Button>
              </motion.div>
            </Link>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
              <Button 
                variant="outline" 
                className="rounded-full gap-2 px-4 h-12 border-border/50"
                data-testid="button-login"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Button>
            </motion.div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-12 h-12"
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
              className="w-full pl-12 pr-4 py-3 h-12 rounded-full border-border/50 bg-muted/50"
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
              <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-muted transition-colors" data-testid="button-location-mobile">
                <MapPin className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Delivery to</p>
                  <p className="text-sm text-muted-foreground">123 Main Street</p>
                </div>
              </button>
              <Button variant="outline" className="w-full rounded-xl h-12 gap-2" data-testid="button-login-mobile">
                <User className="w-4 h-4" />
                Login / Sign Up
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

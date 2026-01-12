import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Restaurant } from '@/lib/store';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index?: number;
}

export function RestaurantCard({ restaurant, index = 0 }: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${restaurant.id}`} data-testid={`card-restaurant-${restaurant.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="group cursor-pointer"
      >
        <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Promotion / Featured row - overlays as a single top row */}
            <div className="absolute top-3 left-3 right-3 z-20 pointer-events-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {restaurant.offer && (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.35 }}
                      className="pointer-events-auto"
                    >
                      <Badge className="bg-primary text-white px-3 py-1 text-xs font-semibold rounded-full shadow-lg">
                        {restaurant.offer}
                      </Badge>
                    </motion.div>
                  )}

                  {restaurant.featured && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="pointer-events-auto"
                    >
                      <div title="Featured" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4 8.04 4 9.54 4.81 10.44 6.09 11.34 4.81 12.84 4 14.38 4 16.89 4 18.88 6 18.88 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* reserved for future tags or small actions */}
                </div>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 h-8 rounded-lg shadow">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium leading-none text-foreground">{restaurant.rating}</span>
              </div>

              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 h-8 rounded-lg shadow">
                <Clock className="w-4 h-4 text-foreground" />
                <span className="text-sm font-medium leading-none whitespace-nowrap text-foreground">{restaurant.deliveryTime}</span>
              </div>
            </div>
          </div>

          <div className="p-4 flex flex-col justify-between min-h-[96px]">
            <h3 className="font-bold text-lg md:text-xl mb-1 group-hover:text-primary transition-colors text-foreground leading-tight line-clamp-1 overflow-hidden">
              {restaurant.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
              {restaurant.cuisine}
            </p>
            
            <div className="flex items-center justify-between text-sm whitespace-nowrap">
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate">{restaurant.distance}</span>
              </div>
              <span className={`font-semibold ${restaurant.deliveryFee === 'Free' ? 'text-accent' : 'text-foreground'} truncate`}>
                {restaurant.deliveryFee === 'Free' ? 'Free Delivery' : restaurant.deliveryFee + ' delivery'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

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
            
            {restaurant.offer && (
              <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                className="absolute top-3 left-0"
              >
                <Badge className="rounded-l-none rounded-r-full bg-primary text-white px-3 py-1 text-xs font-semibold shadow-lg">
                  {restaurant.offer}
                </Badge>
              </motion.div>
            )}

            {restaurant.featured && (
              <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground shadow-lg">
                Featured
              </Badge>
            )}

            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg shadow">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-sm">{restaurant.rating}</span>
              </div>
              
              <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg shadow">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-medium">{restaurant.deliveryTime}</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
              {restaurant.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
              {restaurant.cuisine}
            </p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span>{restaurant.distance}</span>
              </div>
              <span className={`font-semibold ${restaurant.deliveryFee === 'Free' ? 'text-accent' : 'text-foreground'}`}>
                {restaurant.deliveryFee === 'Free' ? 'Free Delivery' : restaurant.deliveryFee + ' delivery'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

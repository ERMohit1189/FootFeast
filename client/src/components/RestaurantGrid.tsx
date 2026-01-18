import { restaurants } from '@/lib/store';
import { RestaurantCard } from './RestaurantCard';
import { ChevronRight } from 'lucide-react';

interface RestaurantGridProps {
  title?: string;
  showFeatured?: boolean;
  limit?: number;
}

export function RestaurantGrid({ title = "Restaurants Near You", showFeatured = false, limit }: RestaurantGridProps) {
  let displayRestaurants = showFeatured 
    ? restaurants.filter(r => r.featured)
    : restaurants;
  
  if (limit) {
    displayRestaurants = displayRestaurants.slice(0, limit);
  }

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <button className="text-primary font-medium hover:underline flex items-center gap-1" data-testid="button-see-all">
            More <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayRestaurants.map((restaurant, index) => (
            <RestaurantCard 
              key={restaurant.id} 
              restaurant={restaurant} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

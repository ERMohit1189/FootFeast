import { motion } from 'framer-motion';
import { Plus, Star, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { menuItems, restaurants, MenuItem, useCart } from '@/lib/store';

export function FoodItems() {
  const { addToCart } = useCart();
  
  // Flatten some menu items for "Trending Dishes"
  const allDishes: (MenuItem & { restaurantId: string; restaurantName: string })[] = [];
  Object.entries(menuItems).forEach(([rid, items]) => {
    const restaurant = restaurants.find(r => r.id === rid);
    items.slice(0, 2).forEach(item => {
      allDishes.push({
        ...item,
        restaurantId: rid,
        restaurantName: restaurant?.name ?? 'Restaurant'
      });
    });
  });

  const trendingDishes = allDishes.slice(0, 8);

  return (
    <section className="py-8 md:py-12 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Trending Dishes</h2>
            <p className="text-muted-foreground mt-1">Popular picks from top-rated restaurants</p>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary/80 font-medium">
            See all dishes
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingDishes.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {item.isVeg ? (
                    <Badge className="bg-green-500/90 text-white border-none text-[10px] h-5">Veg</Badge>
                  ) : (
                    <Badge className="bg-red-500/90 text-white border-none text-[10px] h-5">Non-Veg</Badge>
                  )}
                  {item.isBestseller && (
                    <Badge className="bg-amber-500/90 text-white border-none text-[10px] h-5">Bestseller</Badge>
                  )}
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg leading-tight truncate flex-1 mr-2">{item.name}</h3>
                  <span className="font-bold text-primary">₹{item.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-1">{item.restaurantName}</p>
                
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1 rounded-xl h-9 gap-1.5 text-xs">
                        <Info className="w-3.5 h-3.5" />
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] rounded-[2.5rem]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-black">{item.name}</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <div className="aspect-video rounded-3xl overflow-hidden mb-6 shadow-lg">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              {item.isVeg ? (
                                <Badge className="bg-green-100 text-green-700 border-none">Pure Veg</Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-700 border-none">Non-Vegetarian</Badge>
                              )}
                              {item.isBestseller && (
                                <Badge className="bg-amber-100 text-amber-700 border-none">Must Try</Badge>
                              )}
                            </div>
                            <span className="text-2xl font-black text-primary">₹{item.price}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-2">Description</h4>
                            <p className="text-slate-600 leading-relaxed">{item.description}</p>
                          </div>
                          <div className="pt-4 border-t">
                            <p className="text-xs text-muted-foreground mb-4 italic">from {item.restaurantName}</p>
                            <Button 
                              className="w-full rounded-2xl h-12 bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg shadow-primary/20"
                              onClick={() => addToCart({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                image: item.image,
                                restaurantId: item.restaurantId,
                                restaurantName: item.restaurantName
                              })}
                            >
                              Add to Cart • ₹{item.price}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    size="sm" 
                    className="flex-1 rounded-xl h-9 gap-1.5 text-xs bg-slate-900 hover:bg-primary text-white transition-colors"
                    onClick={() => addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      restaurantId: item.restaurantId,
                      restaurantName: item.restaurantName
                    })}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

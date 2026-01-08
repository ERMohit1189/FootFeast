import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Clock, MapPin, Share2, Heart, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/Header';
import { MenuItemCard } from '@/components/MenuItemCard';
import { CartSidebar } from '@/components/CartSidebar';
import { restaurants, menuItems } from '@/lib/store';

export default function Restaurant() {
  const { id } = useParams<{ id: string }>();
  const restaurant = restaurants.find(r => r.id === id);
  const menu = menuItems[id || ''] || [];

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
          <Link href="/">
            <Button>Go back home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const categories = Array.from(new Set(menu.map(item => item.category)));

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Header />
      
      <div className="relative h-56 md:h-72 lg:h-80 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Link href="/">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-full glass"
                data-testid="button-back"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </motion.div>
          </Link>
          
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="secondary" size="icon" className="rounded-full glass" data-testid="button-share">
                <Share2 className="w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="secondary" size="icon" className="rounded-full glass" data-testid="button-favorite">
                <Heart className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {restaurant.offer && (
              <Badge className="bg-primary text-white mb-3">{restaurant.offer}</Badge>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" data-testid="text-restaurant-name">
              {restaurant.name}
            </h1>
            <p className="text-white/80 text-sm md:text-base">{restaurant.cuisine}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-4 py-4 border-b border-border/50"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{restaurant.rating}</span>
            <span className="text-sm text-muted-foreground">(1.2k+ ratings)</span>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{restaurant.deliveryTime}</span>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{restaurant.distance}</span>
          </div>
          
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            restaurant.deliveryFee === 'Free' ? 'bg-accent/10 text-accent' : 'bg-muted'
          }`}>
            <span className="text-sm font-medium">
              {restaurant.deliveryFee === 'Free' ? '🎉 Free Delivery' : `${restaurant.deliveryFee} delivery`}
            </span>
          </div>
        </motion.div>

        <div className="py-6">
          <Tabs defaultValue={categories[0] || 'all'}>
            <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-muted/50 rounded-xl mb-6">
              {categories.map(category => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-lg px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  data-testid={`tab-${category.toLowerCase()}`}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map(category => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">{category}</h3>
                  <div className="grid gap-4">
                    {menu
                      .filter(item => item.category === category)
                      .map((item, index) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          restaurantId={restaurant.id}
                          restaurantName={restaurant.name}
                          index={index}
                        />
                      ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <CartSidebar />
    </div>
  );
}

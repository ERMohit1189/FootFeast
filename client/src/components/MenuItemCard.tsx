import { motion } from 'framer-motion';
import { Plus, Minus, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/store';
import type { MenuItem } from '@/lib/store';

interface MenuItemCardProps {
  item: MenuItem;
  restaurantId: string;
  restaurantName: string;
  index?: number;
}

export function MenuItemCard({ item, restaurantId, restaurantName, index = 0 }: MenuItemCardProps) {
  const { cart, addToCart, removeFromCart } = useCart();
  
  const cartItem = cart.find(i => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId,
      restaurantName
    });
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex gap-4 p-4 bg-card rounded-2xl border border-border/50 hover:shadow-lg transition-shadow"
      data-testid={`card-menu-item-${item.id}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 mb-2">
          {item.isVeg ? (
            <div className="w-5 h-5 border-2 border-accent rounded flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            </div>
          ) : (
            <div className="w-5 h-5 border-2 border-destructive rounded flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-base">{item.name}</h3>
              {item.isBestseller && (
                <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                  ⭐ Bestseller
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-lg font-bold mb-2">₹{item.price}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
      </div>

      <div className="relative flex-shrink-0">
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          {quantity === 0 ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleAdd}
                className="rounded-xl px-6 shadow-lg bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white"
                size="sm"
                data-testid={`button-add-${item.id}`}
              >
                ADD
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-0 bg-primary rounded-xl shadow-lg overflow-hidden"
            >
              <Button
                onClick={handleRemove}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-primary-foreground/20 rounded-none"
                data-testid={`button-minus-${item.id}`}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="px-3 font-bold text-white" data-testid={`text-quantity-${item.id}`}>{quantity}</span>
              <Button
                onClick={handleAdd}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-primary-foreground/20 rounded-none"
                data-testid={`button-plus-${item.id}`}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

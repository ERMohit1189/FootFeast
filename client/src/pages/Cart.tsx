import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, MapPin, Clock, CreditCard, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/lib/store';
import { Header } from '@/components/Header';

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount } = useCart();

  const deliveryFee = cartTotal >= 500 ? 0 : 49;
  const taxes = cartTotal * 0.08;
  const grandTotal = cartTotal + deliveryFee + taxes;

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <ShoppingBag className="w-16 h-16 text-muted-foreground" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-3" data-testid="text-empty-cart">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/">
            <Button size="lg" className="rounded-full px-8" data-testid="button-browse-restaurants">
              Browse Restaurants
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const restaurantName = cart[0]?.restaurantName;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold" data-testid="text-cart-title">Your Cart</h1>
            <p className="text-muted-foreground text-sm">{cartCount} item{cartCount > 1 ? 's' : ''} from {restaurantName}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border/50 overflow-hidden"
            >
              <div className="p-4 bg-muted/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{restaurantName}</p>
                    <p className="text-sm text-muted-foreground">{cartCount} items</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={clearCart}
                  data-testid="button-clear-cart"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              </div>

              <div className="divide-y divide-border/50">
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 flex gap-4"
                    data-testid={`cart-item-${item.id}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1">{item.name}</h3>
                      <p className="text-lg font-bold text-primary">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-0 bg-muted rounded-xl overflow-hidden h-fit">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-none hover:bg-muted"
                        onClick={() => removeFromCart(item.id)}
                        data-testid={`button-cart-minus-${item.id}`}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-3 font-semibold min-w-[2rem] text-center" data-testid={`text-cart-quantity-${item.id}`}>
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-none hover:bg-muted"
                        onClick={() => addToCart(item)}
                        data-testid={`button-cart-plus-${item.id}`}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-border/50 p-4"
            >
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-primary" />
                <Input
                  placeholder="Enter promo code"
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 px-0"
                  data-testid="input-promo-code"
                />
                <Button variant="outline" className="rounded-xl" data-testid="button-apply-promo">
                  Apply
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border/50 p-4"
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Delivery Address
              </h3>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div>
                  <p className="font-medium">123 Main Street</p>
                  <p className="text-sm text-muted-foreground">Apt 4B, New York, NY 10001</p>
                </div>
                <Button variant="ghost" size="sm" className="text-primary" data-testid="button-change-address">
                  Change
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl border border-border/50 p-6 sticky top-24"
            >
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className={`font-medium ${deliveryFee === 0 ? 'text-accent' : ''}`}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span className="font-medium">₹{taxes.toFixed(0)}</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-base">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary" data-testid="text-grand-total">₹{grandTotal.toFixed(0)}</span>
                </div>
              </div>

              {deliveryFee === 0 && (
                <div className="mt-4 p-3 bg-accent/10 rounded-xl text-sm text-accent font-medium text-center">
                  🎉 You saved ₹49 on delivery!
                </div>
              )}

              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Clock className="w-4 h-4" />
                <span>Estimated delivery: 25-35 min</span>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  className="w-full h-14 rounded-xl text-base font-semibold shadow-lg shadow-primary/30"
                  data-testid="button-checkout"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </Button>
              </motion.div>

              <p className="text-xs text-center text-muted-foreground mt-4">
                By placing this order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bike, MapPin, Clock, DollarSign, Phone, Navigation, CheckCircle, 
  XCircle, Package, User, Star, ChevronRight, Power, Bell, Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const currentOrder = {
  id: 'ORD-2847',
  restaurant: {
    name: 'The Burger Joint',
    address: '123 MG Road, Koramangala',
    phone: '+91 98765-43210'
  },
  customer: {
    name: 'Rahul Sharma',
    address: '456 Indiranagar, 12th Main',
    phone: '+91 98765-12345'
  },
  items: ['2x Classic Cheeseburger', '1x Loaded Fries', '2x Chocolate Shake'],
  total: '₹957',
  tip: '₹80',
  distance: '2.4 km',
  estimatedTime: '15 mins'
};

const todayStats = {
  earnings: '₹2,450',
  trips: 8,
  hours: '4.5h',
  rating: 4.9
};

const recentDeliveries = [
  { id: 'ORD-2846', restaurant: 'Pizza Paradise', customer: 'Priya P.', amount: '₹120', time: '25 mins ago', rating: 5 },
  { id: 'ORD-2845', restaurant: 'Sushi Master', customer: 'Amit K.', amount: '₹180', time: '1 hour ago', rating: 5 },
  { id: 'ORD-2844', restaurant: 'Taco Fiesta', customer: 'Sneha G.', amount: '₹95', time: '2 hours ago', rating: 4 },
];

export default function DeliveryDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [orderStatus, setOrderStatus] = useState<'pickup' | 'delivering' | 'delivered'>('pickup');
  const [hasActiveOrder, setHasActiveOrder] = useState(true);

  const handleStatusUpdate = () => {
    if (orderStatus === 'pickup') {
      setOrderStatus('delivering');
    } else if (orderStatus === 'delivering') {
      setOrderStatus('delivered');
      setTimeout(() => {
        setHasActiveOrder(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-emerald-500">
              <AvatarFallback className="bg-emerald-500 text-white">RK</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-white">Raj Kumar</p>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-slate-400">4.92</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
            </Button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-full">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-slate-500'}`} />
              <span className="text-sm text-white">{isOnline ? 'Online' : 'Offline'}</span>
              <Switch 
                checked={isOnline} 
                onCheckedChange={setIsOnline}
                className="data-[state=checked]:bg-emerald-500"
                data-testid="switch-online"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-4 gap-3"
        >
          {[
            { icon: DollarSign, value: todayStats.earnings, label: 'Earnings', color: 'text-emerald-400' },
            { icon: Package, value: todayStats.trips, label: 'Trips', color: 'text-blue-400' },
            { icon: Clock, value: todayStats.hours, label: 'Hours', color: 'text-amber-400' },
            { icon: Star, value: todayStats.rating, label: 'Rating', color: 'text-yellow-400' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/50 rounded-2xl p-3 text-center border border-slate-700/50"
              data-testid={`stat-${stat.label.toLowerCase()}`}
            >
              <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
              <p className="font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {hasActiveOrder ? (
            <motion.div
              key="active-order"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 rounded-3xl border border-emerald-700/50 overflow-hidden"
              data-testid="card-active-order"
            >
              <div className="p-4 bg-emerald-500/10 border-b border-emerald-700/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Bike className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Active Delivery</p>
                    <p className="text-sm text-emerald-300">{currentOrder.id}</p>
                  </div>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  {orderStatus === 'pickup' ? 'Pick Up' : orderStatus === 'delivering' ? 'In Transit' : 'Delivered'}
                </Badge>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${orderStatus === 'pickup' ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-500'}`} />
                    <div className="w-0.5 h-12 bg-slate-600" />
                    <div className={`w-3 h-3 rounded-full ${orderStatus === 'delivering' ? 'bg-emerald-500 animate-pulse' : orderStatus === 'delivered' ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-xs text-emerald-400 mb-1">PICK UP FROM</p>
                      <p className="font-semibold text-white">{currentOrder.restaurant.name}</p>
                      <p className="text-sm text-slate-400">{currentOrder.restaurant.address}</p>
                    </div>
                    <div>
                      <p className="text-xs text-emerald-400 mb-1">DELIVER TO</p>
                      <p className="font-semibold text-white">{currentOrder.customer.name}</p>
                      <p className="text-sm text-slate-400">{currentOrder.customer.address}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 h-11 rounded-xl border-slate-600 text-white hover:bg-slate-700"
                    data-testid="button-call"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 h-11 rounded-xl border-slate-600 text-white hover:bg-slate-700"
                    data-testid="button-navigate"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Navigate
                  </Button>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 mb-2">ORDER ITEMS</p>
                  <div className="space-y-1">
                    {currentOrder.items.map((item, i) => (
                      <p key={i} className="text-sm text-white">{item}</p>
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 pt-3 border-t border-slate-700">
                    <span className="text-slate-400">Earnings</span>
                    <span className="font-bold text-emerald-400">{currentOrder.tip}</span>
                  </div>
                </div>

                {orderStatus !== 'delivered' && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleStatusUpdate}
                      className="w-full h-14 rounded-xl text-base font-semibold bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-emerald-900"
                      data-testid="button-update-status"
                    >
                      {orderStatus === 'pickup' ? (
                        <>
                          <Package className="w-5 h-5 mr-2" />
                          Picked Up Order
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Delivered
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}

                {orderStatus === 'delivered' && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-4"
                  >
                    <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                    <p className="text-lg font-bold text-white">Delivery Complete!</p>
                    <p className="text-emerald-400">+{currentOrder.tip} earned</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="no-order"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 rounded-3xl border border-slate-700/50 p-8 text-center"
            >
              {isOnline ? (
                <>
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Bike className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Looking for orders...</h3>
                  <p className="text-slate-400 text-sm">Stay online to receive new delivery requests</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Power className="w-8 h-8 text-slate-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">You're Offline</h3>
                  <p className="text-slate-400 text-sm">Go online to start receiving orders</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
            <h2 className="font-bold text-white">Recent Deliveries</h2>
            <Button variant="ghost" size="sm" className="text-emerald-400">View All</Button>
          </div>
          <div className="divide-y divide-slate-700/50">
            {recentDeliveries.map((delivery, i) => (
              <motion.div
                key={delivery.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 flex items-center justify-between hover:bg-slate-700/20"
                data-testid={`delivery-${delivery.id}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{delivery.restaurant}</p>
                    <p className="text-sm text-slate-400">{delivery.customer} • {delivery.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-400">{delivery.amount}</p>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: delivery.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl border-t border-slate-700/50 px-4 py-3">
          <div className="max-w-lg mx-auto flex items-center justify-around">
            <Link href="/delivery/dashboard"><button className="flex flex-col items-center gap-1 px-4 py-2 text-emerald-400" data-testid="nav-home"><Bike className="w-5 h-5" /><span className="text-xs">Home</span></button></Link>
            <Link href="/delivery/orders"><button className="flex flex-col items-center gap-1 px-4 py-2 text-slate-500" data-testid="nav-orders"><Package className="w-5 h-5" /><span className="text-xs">Orders</span></button></Link>
            <Link href="/delivery/earnings"><button className="flex flex-col items-center gap-1 px-4 py-2 text-slate-500" data-testid="nav-earnings"><Wallet className="w-5 h-5" /><span className="text-xs">Earnings</span></button></Link>
            <Link href="/delivery/profile"><button className="flex flex-col items-center gap-1 px-4 py-2 text-slate-500" data-testid="nav-profile"><User className="w-5 h-5" /><span className="text-xs">Profile</span></button></Link>
          </div>
        </div>
      </main>
    </div>
  );
}

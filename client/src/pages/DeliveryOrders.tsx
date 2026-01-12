import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Bike, Package, Clock, MapPin, CheckCircle, XCircle, 
  ChevronRight, Calendar, Filter, User, Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const orders = {
  active: [
    { 
      id: 'ORD-2847', 
      restaurant: 'The Burger Joint', 
      customer: 'Rahul Sharma',
      pickup: '123 MG Road, Koramangala',
      dropoff: '456 Indiranagar, 12th Main',
      items: 3,
      earnings: '₹80',
      distance: '2.4 km',
      status: 'pickup'
    },
  ],
  completed: [
    { id: 'ORD-2846', restaurant: 'Pizza Paradise', customer: 'Priya P.', earnings: '₹120', time: 'Today, 2:30 PM', rating: 5 },
    { id: 'ORD-2845', restaurant: 'Sushi Master', customer: 'Amit K.', earnings: '₹180', time: 'Today, 1:15 PM', rating: 5 },
    { id: 'ORD-2844', restaurant: 'Taco Fiesta', customer: 'Sneha G.', earnings: '₹95', time: 'Today, 11:45 AM', rating: 4 },
    { id: 'ORD-2843', restaurant: 'Dragon Palace', customer: 'Vikram S.', earnings: '₹110', time: 'Yesterday, 8:30 PM', rating: 5 },
    { id: 'ORD-2842', restaurant: 'Curry House', customer: 'Neha M.', earnings: '₹150', time: 'Yesterday, 7:00 PM', rating: 4 },
    { id: 'ORD-2841', restaurant: 'The Burger Joint', customer: 'Arjun H.', earnings: '₹85', time: 'Yesterday, 5:30 PM', rating: 5 },
  ],
  cancelled: [
    { id: 'ORD-2838', restaurant: 'Mediterranean Grill', reason: 'Customer cancelled', time: 'Jan 7, 3:00 PM' },
  ]
};

export default function DeliveryOrders() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-24">
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 px-4 py-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-white">My Orders</h1>
          <p className="text-sm text-slate-400">Track all your deliveries</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl p-1">
            <TabsTrigger value="active" className="flex-1 rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              Active ({orders.active.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex-1 rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              Completed
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex-1 rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              Cancelled
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {orders.active.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No active orders</p>
              </div>
            ) : (
              orders.active.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/50 rounded-2xl border border-emerald-500/30 overflow-hidden"
                >
                  <div className="p-4 bg-emerald-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Bike className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold text-white">{order.id}</span>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      {order.status === 'pickup' ? 'Pick Up' : 'Delivering'}
                    </Badge>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-400">FROM</p>
                        <p className="text-white font-medium">{order.restaurant}</p>
                        <p className="text-sm text-slate-400">{order.pickup}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-400">TO</p>
                        <p className="text-white font-medium">{order.customer}</p>
                        <p className="text-sm text-slate-400">{order.dropoff}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span>{order.items} items</span>
                        <span>{order.distance}</span>
                      </div>
                      <span className="font-bold text-emerald-400">{order.earnings}</span>
                    </div>
                    <Link href="/delivery/dashboard">
                      <Button className="w-full bg-emerald-500 hover:bg-emerald-600 rounded-xl">
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-3">
            {orders.completed.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{order.restaurant}</p>
                    <p className="text-sm text-slate-400">{order.customer} • {order.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-400">{order.earnings}</p>
                  <div className="flex items-center gap-0.5 justify-end">
                    {Array.from({ length: order.rating }).map((_, j) => (
                      <span key={j} className="text-yellow-400 text-xs">★</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-3">
            {orders.cancelled.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{order.restaurant}</p>
                    <p className="text-sm text-red-400">{order.reason}</p>
                    <p className="text-xs text-slate-500">{order.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl border-t border-slate-700/50 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-around">
          <Link href="/delivery/dashboard"><button className="flex flex-col items-center gap-1 px-4 py-2 text-slate-500"><Bike className="w-5 h-5" /><span className="text-xs">Home</span></button></Link>
          <Link href="/delivery/orders"><button className="flex flex-col items-center gap-1 px-4 py-2 text-emerald-400"><Package className="w-5 h-5" /><span className="text-xs">Orders</span></button></Link>
          <Link href="/delivery/earnings"><button className="flex flex-col items-center gap-1 px-4 py-2 text-slate-500"><Wallet className="w-5 h-5" /><span className="text-xs">Earnings</span></button></Link>
          <Link href="/delivery/profile"><button className="flex flex-col items-center gap-1 px-4 py-2 text-slate-500"><User className="w-5 h-5" /><span className="text-xs">Profile</span></button></Link>
        </div>
      </nav>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Bike, Package, DollarSign, TrendingUp, Calendar, 
  ArrowUpRight, CreditCard, Wallet, User, ChevronRight, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const weeklyData = [
  { day: 'Mon', amount: 850, trips: 6 },
  { day: 'Tue', amount: 1240, trips: 8 },
  { day: 'Wed', amount: 680, trips: 5 },
  { day: 'Thu', amount: 1420, trips: 9 },
  { day: 'Fri', amount: 1790, trips: 12 },
  { day: 'Sat', amount: 2240, trips: 15 },
  { day: 'Sun', amount: 2450, trips: 8 },
];

const transactions = [
  { id: 1, type: 'earning', description: 'Order #2847 - Tip', amount: 80, time: '10 mins ago' },
  { id: 2, type: 'earning', description: 'Order #2846 - Delivery', amount: 45, time: '35 mins ago' },
  { id: 3, type: 'earning', description: 'Order #2846 - Tip', amount: 75, time: '35 mins ago' },
  { id: 4, type: 'bonus', description: 'Peak Hour Bonus', amount: 150, time: '1 hour ago' },
  { id: 5, type: 'earning', description: 'Order #2845 - Delivery', amount: 55, time: '2 hours ago' },
  { id: 6, type: 'earning', description: 'Order #2845 - Tip', amount: 125, time: '2 hours ago' },
  { id: 7, type: 'withdrawal', description: 'Bank Transfer', amount: -5000, time: 'Yesterday' },
];

const maxAmount = Math.max(...weeklyData.map(d => d.amount));

export default function DeliveryEarnings() {
  const totalWeek = weeklyData.reduce((sum, d) => sum + d.amount, 0);
  const totalTrips = weeklyData.reduce((sum, d) => sum + d.trips, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-24">
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 px-4 py-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-white">Earnings</h1>
          <p className="text-sm text-slate-400">Track your income</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-lg shadow-emerald-500/20"
        >
          <p className="text-emerald-100 text-sm mb-1">Available Balance</p>
          <p className="text-4xl font-bold mb-4">₹10,670</p>
          <div className="flex gap-3">
            <Button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl h-11">
              <CreditCard className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
            <Button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl h-11">
              <Clock className="w-4 h-4 mr-2" />
              History
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span className="text-sm text-slate-400">This Week</span>
            </div>
            <p className="text-2xl font-bold text-white">₹{totalWeek}</p>
            <div className="flex items-center gap-1 text-sm text-emerald-400 mt-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+12.5% vs last week</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-slate-400">Deliveries</span>
            </div>
            <p className="text-2xl font-bold text-white">{totalTrips}</p>
            <p className="text-sm text-slate-400 mt-1">₹{Math.round(totalWeek / totalTrips)} avg/trip</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4"
        >
          <h3 className="font-semibold text-white mb-4">Weekly Earnings</h3>
          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyData.map((day, i) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.amount / maxAmount) * 100}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`w-full rounded-t-lg ${
                    i === weeklyData.length - 1 ? 'bg-emerald-500' : 'bg-slate-600'
                  }`}
                />
                <span className="text-xs text-slate-400">{day.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
            <h3 className="font-semibold text-white">Recent Transactions</h3>
            <Button variant="ghost" size="sm" className="text-emerald-400">See All</Button>
          </div>
          <div className="divide-y divide-slate-700/50">
            {transactions.slice(0, 5).map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    tx.type === 'withdrawal' ? 'bg-red-500/10' :
                    tx.type === 'bonus' ? 'bg-yellow-500/10' : 'bg-emerald-500/10'
                  }`}>
                    {tx.type === 'withdrawal' ? (
                      <CreditCard className="w-5 h-5 text-red-400" />
                    ) : tx.type === 'bonus' ? (
                      <TrendingUp className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{tx.description}</p>
                    <p className="text-xs text-slate-400">{tx.time}</p>
                  </div>
                </div>
                <span className={`font-semibold ${tx.amount < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {tx.amount < 0 ? '-' : '+'}₹{Math.abs(tx.amount)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl border-t border-slate-700/50 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-around">
          <Link href="/delivery/dashboard"><button className="flex flex-col items-center gap-1 px-4 py-2 text-slate-500"><Bike className="w-5 h-5" /><span className="text-xs">Home</span></button></Link>
          <Link href="/delivery/orders"><button className="flex flex-col items-center gap-1 px-4 py-2 text-slate-500"><Package className="w-5 h-5" /><span className="text-xs">Orders</span></button></Link>
          <Link href="/delivery/earnings"><button className="flex flex-col items-center gap-1 px-4 py-2 text-emerald-400"><Wallet className="w-5 h-5" /><span className="text-xs">Earnings</span></button></Link>
          <Link href="/delivery/profile"><button className="flex flex-col items-center gap-1 px-4 py-2 text-slate-500"><User className="w-5 h-5" /><span className="text-xs">Profile</span></button></Link>
        </div>
      </nav>
    </div>
  );
}

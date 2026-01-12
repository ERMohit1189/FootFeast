import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Store, Users, ShoppingBag, TrendingUp, Settings, LogOut, 
  ArrowUpRight, ArrowDownRight, DollarSign, Bike, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: ShoppingBag, label: 'Orders', href: '/admin/orders' },
  { icon: Store, label: 'Restaurants', href: '/admin/restaurants' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: Bike, label: 'Delivery Partners', href: '/admin/drivers' },
  { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics', active: true },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

const monthlyData = [
  { month: 'Jan', revenue: 3200000, orders: 4800 },
  { month: 'Feb', revenue: 2800000, orders: 4200 },
  { month: 'Mar', revenue: 3500000, orders: 5200 },
  { month: 'Apr', revenue: 4100000, orders: 6100 },
  { month: 'May', revenue: 3800000, orders: 5700 },
  { month: 'Jun', revenue: 4500000, orders: 6800 },
  { month: 'Jul', revenue: 4857400, orders: 7200 },
];

const topRestaurants = [
  { name: 'The Burger Joint', orders: 1247, revenue: '₹3,74,100', growth: '+15%' },
  { name: 'Pizza Paradise', orders: 1089, revenue: '₹3,26,700', growth: '+12%' },
  { name: 'Sweet Treats Bakery', orders: 1345, revenue: '₹4,03,500', growth: '+18%' },
  { name: 'Sushi Master', orders: 892, revenue: '₹2,67,600', growth: '+8%' },
  { name: 'Curry House', orders: 923, revenue: '₹2,76,900', growth: '+10%' },
];

const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

export default function AdminAnalytics() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className="w-64 bg-slate-800/50 border-r border-slate-700/50 flex flex-col">
        <div className="p-4 border-b border-slate-700/50">
          <Link href="/admin/dashboard">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <span className="font-bold text-lg">FoodDash Admin</span>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${item.active ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700/50">
          <Link href="/"><Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white"><LogOut className="w-5 h-5" />Logout</Button></Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Analytics</h1>
              <p className="text-slate-400 text-sm">Business performance insights</p>
            </div>
            <Button variant="outline" className="border-slate-700 text-slate-300"><Calendar className="w-4 h-4 mr-2" />Last 7 Months</Button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: 'Total Revenue', value: '₹2.68 Cr', change: '+18.5%', up: true, icon: DollarSign },
              { label: 'Total Orders', value: '40,000+', change: '+12.3%', up: true, icon: ShoppingBag },
              { label: 'Active Users', value: '12,847', change: '+8.7%', up: true, icon: Users },
              { label: 'Avg. Order Value', value: '₹642', change: '-2.1%', up: false, icon: TrendingUp },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid xl:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="xl:col-span-2 bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
              <h3 className="font-bold text-lg mb-6">Revenue Trend</h3>
              <div className="flex items-end justify-between gap-4 h-64">
                {monthlyData.map((data, i) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className={`w-full rounded-t-lg ${i === monthlyData.length - 1 ? 'bg-gradient-to-t from-violet-600 to-violet-400' : 'bg-slate-600'}`}
                    />
                    <span className="text-xs text-slate-400">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center gap-8 text-sm">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-slate-600" /><span className="text-slate-400">Previous</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-violet-500" /><span className="text-slate-400">Current</span></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
              <h3 className="font-bold text-lg mb-4">Top Restaurants</h3>
              <div className="space-y-4">
                {topRestaurants.map((restaurant, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-medium">{i + 1}</span>
                      <div>
                        <p className="font-medium">{restaurant.name}</p>
                        <p className="text-xs text-slate-400">{restaurant.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-400">{restaurant.revenue}</p>
                      <p className="text-xs text-emerald-400">{restaurant.growth}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
              <h3 className="font-bold text-lg mb-4">Order Distribution</h3>
              <div className="space-y-4">
                {[
                  { label: 'Completed', value: 78, color: 'bg-emerald-500' },
                  { label: 'In Progress', value: 15, color: 'bg-blue-500' },
                  { label: 'Cancelled', value: 7, color: 'bg-red-500' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${item.value}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }} className={`h-full ${item.color} rounded-full`} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
              <h3 className="font-bold text-lg mb-4">Peak Hours</h3>
              <div className="grid grid-cols-6 gap-2">
                {['12PM', '1PM', '2PM', '7PM', '8PM', '9PM'].map((hour, i) => {
                  const intensity = [60, 45, 35, 85, 100, 75][i];
                  return (
                    <div key={hour} className="text-center">
                      <div className="h-24 rounded-lg mb-2 flex items-end justify-center" style={{ background: `rgba(139, 92, 246, ${intensity / 100 * 0.8})` }}>
                        <span className="text-xs font-medium mb-2">{intensity}%</span>
                      </div>
                      <span className="text-xs text-slate-400">{hour}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

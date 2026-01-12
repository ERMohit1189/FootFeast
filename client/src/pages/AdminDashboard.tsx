import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Store, Users, ShoppingBag, TrendingUp, Settings, LogOut, 
  Bell, Search, ChevronDown, DollarSign, Clock, Star, Bike, MoreVertical,
  ArrowUpRight, ArrowDownRight, Eye, Edit, Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { restaurants } from '@/lib/store';

const stats = [
  { label: 'Total Revenue', value: '₹48,57,400', change: '+12.5%', up: true, icon: DollarSign, color: 'from-emerald-500 to-green-600' },
  { label: 'Active Orders', value: '156', change: '+8.2%', up: true, icon: ShoppingBag, color: 'from-blue-500 to-cyan-600' },
  { label: 'Total Restaurants', value: '524', change: '+3.1%', up: true, icon: Store, color: 'from-violet-500 to-purple-600' },
  { label: 'Delivery Partners', value: '89', change: '-2.4%', up: false, icon: Bike, color: 'from-orange-500 to-amber-600' },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Rahul Sharma', restaurant: 'The Burger Joint', amount: '₹649', status: 'Delivered', time: '10 mins ago' },
  { id: 'ORD-002', customer: 'Priya Patel', restaurant: 'Pizza Paradise', amount: '₹799', status: 'In Transit', time: '15 mins ago' },
  { id: 'ORD-003', customer: 'Amit Kumar', restaurant: 'Sushi Master', amount: '₹1,149', status: 'Preparing', time: '20 mins ago' },
  { id: 'ORD-004', customer: 'Sneha Gupta', restaurant: 'Taco Fiesta', amount: '₹449', status: 'Pending', time: '25 mins ago' },
  { id: 'ORD-005', customer: 'Vikram Singh', restaurant: 'Dragon Palace', amount: '₹599', status: 'Delivered', time: '30 mins ago' },
];

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', active: true },
  { icon: ShoppingBag, label: 'Orders', href: '/admin/orders' },
  { icon: Store, label: 'Restaurants', href: '/admin/restaurants' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: Bike, label: 'Delivery Partners', href: '/admin/drivers' },
  { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'In Transit': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Preparing': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Pending': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default: return 'bg-slate-500/10 text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-800/50 border-r border-slate-700/50 flex flex-col transition-all duration-300`}>
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">F</span>
            </div>
            {sidebarOpen && <span className="font-bold text-lg">FoodDash Admin</span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item, i) => (
            <Link key={i} href={item.href}>
              <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${item.active ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`} data-testid={`nav-${item.label.toLowerCase()}`}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white" data-testid="button-logout">
              <LogOut className="w-5 h-5" />
              {sidebarOpen && 'Logout'}
            </Button>
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-slate-400 hover:text-white"
              >
                <LayoutDashboard className="w-5 h-5" />
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input 
                  placeholder="Search orders, restaurants..." 
                  className="w-80 pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 rounded-xl"
                  data-testid="input-search"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-violet-500 text-white">AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-slate-500">Super Admin</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Dashboard Overview</h1>
            <p className="text-slate-400">Welcome back! Here's what's happening today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-5"
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
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
            <div className="xl:col-span-2 bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="p-5 border-b border-slate-700/50 flex items-center justify-between">
                <h2 className="font-bold text-lg">Recent Orders</h2>
                <Button variant="ghost" size="sm" className="text-violet-400" data-testid="button-view-all-orders">
                  View All
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-slate-400 border-b border-slate-700/50">
                      <th className="px-5 py-3 font-medium">Order ID</th>
                      <th className="px-5 py-3 font-medium">Customer</th>
                      <th className="px-5 py-3 font-medium">Restaurant</th>
                      <th className="px-5 py-3 font-medium">Amount</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Time</th>
                      <th className="px-5 py-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, i) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-slate-700/30 hover:bg-slate-700/20"
                        data-testid={`row-order-${order.id}`}
                      >
                        <td className="px-5 py-4 font-medium text-violet-400">{order.id}</td>
                        <td className="px-5 py-4">{order.customer}</td>
                        <td className="px-5 py-4 text-slate-300">{order.restaurant}</td>
                        <td className="px-5 py-4 font-semibold">{order.amount}</td>
                        <td className="px-5 py-4">
                          <Badge className={`${getStatusColor(order.status)} border`}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-5 py-4 text-slate-400 text-sm">{order.time}</td>
                        <td className="px-5 py-4">
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="p-5 border-b border-slate-700/50 flex items-center justify-between">
                <h2 className="font-bold text-lg">Top Restaurants</h2>
                <Button variant="ghost" size="sm" className="text-violet-400">View All</Button>
              </div>
              <div className="p-4 space-y-3">
                {restaurants.slice(0, 5).map((restaurant, i) => (
                  <motion.div
                    key={restaurant.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700/30 transition-colors"
                    data-testid={`restaurant-item-${restaurant.id}`}
                  >
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{restaurant.name}</p>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{restaurant.rating}</span>
                        <span>•</span>
                        <span>{restaurant.cuisine.split(',')[0]}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

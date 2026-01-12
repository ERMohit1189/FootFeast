import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Store, Users, ShoppingBag, TrendingUp, Settings, LogOut, 
  Search, Plus, Star, MapPin, Clock, Eye, Edit, Trash2, MoreVertical, Bike
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { restaurants } from '@/lib/store';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: ShoppingBag, label: 'Orders', href: '/admin/orders' },
  { icon: Store, label: 'Restaurants', href: '/admin/restaurants', active: true },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: Bike, label: 'Delivery Partners', href: '/admin/drivers' },
  { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

const restaurantStats = [
  { id: '1', orders: 1247, revenue: '₹3,74,100', status: 'Active' },
  { id: '2', orders: 892, revenue: '₹2,67,600', status: 'Active' },
  { id: '3', orders: 654, revenue: '₹1,96,200', status: 'Active' },
  { id: '4', orders: 1089, revenue: '₹3,26,700', status: 'Active' },
  { id: '5', orders: 756, revenue: '₹2,26,800', status: 'Inactive' },
  { id: '6', orders: 923, revenue: '₹2,76,900', status: 'Active' },
  { id: '7', orders: 567, revenue: '₹1,70,100', status: 'Active' },
  { id: '8', orders: 1345, revenue: '₹4,03,500', status: 'Active' },
];

export default function AdminRestaurants() {
  const [searchQuery, setSearchQuery] = useState('');

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
              <h1 className="text-2xl font-bold">Restaurants</h1>
              <p className="text-slate-400 text-sm">Manage partner restaurants</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input placeholder="Search restaurants..." className="w-64 pl-10 bg-slate-800/50 border-slate-700 text-white rounded-xl" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Button className="bg-violet-500 hover:bg-violet-600"><Plus className="w-4 h-4 mr-2" />Add Restaurant</Button>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {restaurants.map((restaurant, i) => {
              const stats = restaurantStats.find(s => s.id === restaurant.id) || { orders: 0, revenue: '₹0', status: 'Active' };
              return (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden hover:border-violet-500/50 transition-colors"
                >
                  <div className="relative h-40">
                    <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <Badge className={`absolute top-3 right-3 ${stats.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-500'}`}>{stats.status}</Badge>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-bold text-lg text-white">{restaurant.name}</h3>
                      <p className="text-sm text-slate-300">{restaurant.cuisine}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-lg font-bold text-white">{restaurant.rating}</p>
                        <p className="text-xs text-slate-400 flex items-center justify-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />Rating</p>
                      </div>
                      <div className="text-center border-x border-slate-700">
                        <p className="text-lg font-bold text-white">{stats.orders}</p>
                        <p className="text-xs text-slate-400">Orders</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-emerald-400">{stats.revenue}</p>
                        <p className="text-xs text-slate-400">Revenue</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                      <MapPin className="w-4 h-4" /><span>{restaurant.distance}</span>
                      <Clock className="w-4 h-4 ml-2" /><span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"><Eye className="w-4 h-4 mr-1" />View</Button>
                      <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"><Edit className="w-4 h-4 mr-1" />Edit</Button>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Store, Users, ShoppingBag, TrendingUp, Settings, LogOut, 
  Search, Phone, Star, MapPin, Eye, Bike, Clock, CheckCircle, XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const drivers = [
  { id: '1', name: 'Raj Kumar', phone: '+91 98765-43210', rating: 4.92, deliveries: 1247, earnings: '₹2,49,400', status: 'Online', currentOrder: 'ORD-2847', vehicle: 'Bike' },
  { id: '2', name: 'Amit Singh', phone: '+91 98765-12345', rating: 4.85, deliveries: 892, earnings: '₹1,78,400', status: 'Online', currentOrder: 'ORD-2848', vehicle: 'Scooter' },
  { id: '3', name: 'Vijay Reddy', phone: '+91 98765-67890', rating: 4.78, deliveries: 654, earnings: '₹1,30,800', status: 'Offline', currentOrder: null, vehicle: 'Bike' },
  { id: '4', name: 'Neha Mehta', phone: '+91 98765-11111', rating: 4.95, deliveries: 1089, earnings: '₹2,17,800', status: 'Online', currentOrder: null, vehicle: 'Scooter' },
  { id: '5', name: 'Priya Das', phone: '+91 98765-22222', rating: 4.88, deliveries: 756, earnings: '₹1,51,200', status: 'Online', currentOrder: 'ORD-2849', vehicle: 'Bike' },
  { id: '6', name: 'Suresh Patel', phone: '+91 98765-33333', rating: 4.65, deliveries: 423, earnings: '₹84,600', status: 'Offline', currentOrder: null, vehicle: 'Scooter' },
  { id: '7', name: 'Anita Sharma', phone: '+91 98765-44444', rating: 4.91, deliveries: 967, earnings: '₹1,93,400', status: 'On Delivery', currentOrder: 'ORD-2850', vehicle: 'Bike' },
  { id: '8', name: 'Ravi Kumar', phone: '+91 98765-55555', rating: 4.72, deliveries: 534, earnings: '₹1,06,800', status: 'Online', currentOrder: null, vehicle: 'Scooter' },
];

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: ShoppingBag, label: 'Orders', href: '/admin/orders' },
  { icon: Store, label: 'Restaurants', href: '/admin/restaurants' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: Bike, label: 'Delivery Partners', href: '/admin/drivers', active: true },
  { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminDrivers() {
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'On Delivery': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Offline': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default: return 'bg-slate-500/10 text-slate-400';
    }
  };

  const onlineDrivers = drivers.filter(d => d.status !== 'Offline').length;

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
              <h1 className="text-2xl font-bold">Delivery Partners</h1>
              <p className="text-slate-400 text-sm">Manage delivery fleet</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input placeholder="Search drivers..." className="w-64 pl-10 bg-slate-800/50 border-slate-700 text-white rounded-xl" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
              <p className="text-slate-400 text-sm mb-1">Total Partners</p>
              <p className="text-2xl font-bold">{drivers.length}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
              <p className="text-slate-400 text-sm mb-1">Currently Online</p>
              <p className="text-2xl font-bold text-emerald-400">{onlineDrivers}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
              <p className="text-slate-400 text-sm mb-1">On Delivery</p>
              <p className="text-2xl font-bold text-blue-400">{drivers.filter(d => d.currentOrder).length}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
              <p className="text-slate-400 text-sm mb-1">Avg. Rating</p>
              <p className="text-2xl font-bold text-amber-400 flex items-center gap-1">4.83 <Star className="w-5 h-5 fill-amber-400" /></p>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-400 border-b border-slate-700/50">
                  <th className="px-5 py-4 font-medium">Driver</th>
                  <th className="px-5 py-4 font-medium">Contact</th>
                  <th className="px-5 py-4 font-medium">Rating</th>
                  <th className="px-5 py-4 font-medium">Deliveries</th>
                  <th className="px-5 py-4 font-medium">Earnings</th>
                  <th className="px-5 py-4 font-medium">Vehicle</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Current Order</th>
                  <th className="px-5 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver, i) => (
                  <motion.tr key={driver.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-slate-700/30 hover:bg-slate-700/20">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-emerald-500/20 text-emerald-400">{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{driver.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-sm">{driver.phone}</td>
                    <td className="px-5 py-4"><span className="flex items-center gap-1"><Star className="w-4 h-4 fill-amber-400 text-amber-400" />{driver.rating}</span></td>
                    <td className="px-5 py-4 font-medium">{driver.deliveries}</td>
                    <td className="px-5 py-4 font-semibold text-emerald-400">{driver.earnings}</td>
                    <td className="px-5 py-4"><Badge variant="outline" className="border-slate-600">{driver.vehicle}</Badge></td>
                    <td className="px-5 py-4"><Badge className={`${getStatusColor(driver.status)} border`}>{driver.status}</Badge></td>
                    <td className="px-5 py-4">{driver.currentOrder ? <span className="text-violet-400 font-medium">{driver.currentOrder}</span> : <span className="text-slate-500">—</span>}</td>
                    <td className="px-5 py-4"><Button variant="ghost" size="icon" className="text-slate-400 hover:text-white"><Eye className="w-4 h-4" /></Button></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

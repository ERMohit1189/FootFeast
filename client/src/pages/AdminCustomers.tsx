import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Store, Users, ShoppingBag, TrendingUp, Settings, LogOut, 
  Search, Mail, Phone, MapPin, Star, Eye, MoreVertical, Bike
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const customers = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul.sharma@email.com', phone: '+91 98765-43210', orders: 47, spent: '₹28,500', lastOrder: '2 hours ago', status: 'Active' },
  { id: '2', name: 'Priya Patel', email: 'priya.patel@email.com', phone: '+91 98765-12345', orders: 32, spent: '₹19,200', lastOrder: '1 day ago', status: 'Active' },
  { id: '3', name: 'Amit Kumar', email: 'amit.kumar@email.com', phone: '+91 98765-67890', orders: 65, spent: '₹42,500', lastOrder: '3 hours ago', status: 'VIP' },
  { id: '4', name: 'Sneha Gupta', email: 'sneha.gupta@email.com', phone: '+91 98765-11111', orders: 18, spent: '₹9,800', lastOrder: '5 days ago', status: 'Active' },
  { id: '5', name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91 98765-22222', orders: 89, spent: '₹56,700', lastOrder: '6 hours ago', status: 'VIP' },
  { id: '6', name: 'Anita Reddy', email: 'anita.reddy@email.com', phone: '+91 98765-33333', orders: 23, spent: '₹14,300', lastOrder: '2 days ago', status: 'Active' },
  { id: '7', name: 'Kiran Mehta', email: 'kiran.mehta@email.com', phone: '+91 98765-44444', orders: 5, spent: '₹2,800', lastOrder: '1 week ago', status: 'Inactive' },
  { id: '8', name: 'Deepak Joshi', email: 'deepak.joshi@email.com', phone: '+91 98765-55555', orders: 41, spent: '₹25,600', lastOrder: '12 hours ago', status: 'Active' },
];

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: ShoppingBag, label: 'Orders', href: '/admin/orders' },
  { icon: Store, label: 'Restaurants', href: '/admin/restaurants' },
  { icon: Users, label: 'Customers', href: '/admin/customers', active: true },
  { icon: Bike, label: 'Delivery Partners', href: '/admin/drivers' },
  { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminCustomers() {
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Active': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Inactive': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default: return 'bg-slate-500/10 text-slate-400';
    }
  };

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
              <h1 className="text-2xl font-bold">Customers</h1>
              <p className="text-slate-400 text-sm">Manage customer accounts</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input placeholder="Search customers..." className="w-64 pl-10 bg-slate-800/50 border-slate-700 text-white rounded-xl" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
              <p className="text-slate-400 text-sm mb-1">Total Customers</p>
              <p className="text-2xl font-bold">12,847</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
              <p className="text-slate-400 text-sm mb-1">Active This Month</p>
              <p className="text-2xl font-bold text-emerald-400">8,234</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
              <p className="text-slate-400 text-sm mb-1">VIP Members</p>
              <p className="text-2xl font-bold text-amber-400">1,247</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
              <p className="text-slate-400 text-sm mb-1">Avg. Order Value</p>
              <p className="text-2xl font-bold">₹642</p>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-400 border-b border-slate-700/50">
                  <th className="px-5 py-4 font-medium">Customer</th>
                  <th className="px-5 py-4 font-medium">Contact</th>
                  <th className="px-5 py-4 font-medium">Orders</th>
                  <th className="px-5 py-4 font-medium">Total Spent</th>
                  <th className="px-5 py-4 font-medium">Last Order</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, i) => (
                  <motion.tr key={customer.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-slate-700/30 hover:bg-slate-700/20">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-violet-500/20 text-violet-400">{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm">
                        <p className="text-slate-300 flex items-center gap-1"><Mail className="w-3 h-3" />{customer.email}</p>
                        <p className="text-slate-400 flex items-center gap-1"><Phone className="w-3 h-3" />{customer.phone}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium">{customer.orders}</td>
                    <td className="px-5 py-4 font-semibold text-emerald-400">{customer.spent}</td>
                    <td className="px-5 py-4 text-slate-400 text-sm">{customer.lastOrder}</td>
                    <td className="px-5 py-4"><Badge className={`${getStatusColor(customer.status)} border`}>{customer.status}</Badge></td>
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

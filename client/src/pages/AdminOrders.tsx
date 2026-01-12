import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Store, Users, ShoppingBag, TrendingUp, Settings, LogOut, 
  Bell, Search, ChevronDown, Filter, Eye, MoreVertical, Bike, Clock, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const allOrders = [
  { id: 'ORD-001', customer: 'Rahul Sharma', phone: '+91 98765-43210', restaurant: 'The Burger Joint', items: ['2x Classic Cheeseburger', '1x Fries'], amount: '₹649', status: 'Delivered', time: '10 mins ago', driver: 'Raj K.' },
  { id: 'ORD-002', customer: 'Priya Patel', phone: '+91 98765-12345', restaurant: 'Pizza Paradise', items: ['1x Pepperoni Supreme', '1x Garlic Bread'], amount: '₹799', status: 'In Transit', time: '15 mins ago', driver: 'Amit S.' },
  { id: 'ORD-003', customer: 'Amit Kumar', phone: '+91 98765-67890', restaurant: 'Sushi Master', items: ['2x Dragon Roll', '1x Miso Soup'], amount: '₹1,149', status: 'Preparing', time: '20 mins ago', driver: null },
  { id: 'ORD-004', customer: 'Sneha Gupta', phone: '+91 98765-11111', restaurant: 'Taco Fiesta', items: ['3x Tacos', '1x Nachos'], amount: '₹449', status: 'Pending', time: '25 mins ago', driver: null },
  { id: 'ORD-005', customer: 'Vikram Singh', phone: '+91 98765-22222', restaurant: 'Dragon Palace', items: ['1x Kung Pao Chicken', '1x Fried Rice'], amount: '₹599', status: 'Delivered', time: '30 mins ago', driver: 'Neha M.' },
  { id: 'ORD-006', customer: 'Anita Reddy', phone: '+91 98765-33333', restaurant: 'Curry House', items: ['1x Butter Chicken', '2x Naan'], amount: '₹549', status: 'In Transit', time: '35 mins ago', driver: 'Vijay R.' },
  { id: 'ORD-007', customer: 'Kiran Mehta', phone: '+91 98765-44444', restaurant: 'Mediterranean Grill', items: ['1x Shawarma Plate'], amount: '₹399', status: 'Cancelled', time: '40 mins ago', driver: null },
  { id: 'ORD-008', customer: 'Deepak Joshi', phone: '+91 98765-55555', restaurant: 'Sweet Treats Bakery', items: ['1x Chocolate Cake', '6x Cupcakes'], amount: '₹899', status: 'Delivered', time: '45 mins ago', driver: 'Priya D.' },
];

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: ShoppingBag, label: 'Orders', href: '/admin/orders', active: true },
  { icon: Store, label: 'Restaurants', href: '/admin/restaurants' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: Bike, label: 'Delivery Partners', href: '/admin/drivers' },
  { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'In Transit': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Preparing': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Pending': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
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
              <h1 className="text-2xl font-bold">Orders</h1>
              <p className="text-slate-400 text-sm">Manage all orders</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input placeholder="Search orders..." className="w-64 pl-10 bg-slate-800/50 border-slate-700 text-white rounded-xl" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Button variant="outline" className="border-slate-700 text-slate-300"><Filter className="w-4 h-4 mr-2" />Filter</Button>
            </div>
          </div>
        </header>

        <div className="p-6">
          <Tabs defaultValue="all">
            <TabsList className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-1 mb-6">
              <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-violet-500 data-[state=active]:text-white">All Orders</TabsTrigger>
              <TabsTrigger value="pending" className="rounded-lg data-[state=active]:bg-violet-500 data-[state=active]:text-white">Pending</TabsTrigger>
              <TabsTrigger value="preparing" className="rounded-lg data-[state=active]:bg-violet-500 data-[state=active]:text-white">Preparing</TabsTrigger>
              <TabsTrigger value="transit" className="rounded-lg data-[state=active]:bg-violet-500 data-[state=active]:text-white">In Transit</TabsTrigger>
              <TabsTrigger value="delivered" className="rounded-lg data-[state=active]:bg-violet-500 data-[state=active]:text-white">Delivered</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-slate-400 border-b border-slate-700/50">
                      <th className="px-5 py-4 font-medium">Order ID</th>
                      <th className="px-5 py-4 font-medium">Customer</th>
                      <th className="px-5 py-4 font-medium">Restaurant</th>
                      <th className="px-5 py-4 font-medium">Items</th>
                      <th className="px-5 py-4 font-medium">Amount</th>
                      <th className="px-5 py-4 font-medium">Driver</th>
                      <th className="px-5 py-4 font-medium">Status</th>
                      <th className="px-5 py-4 font-medium">Time</th>
                      <th className="px-5 py-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders.map((order, i) => (
                      <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-slate-700/30 hover:bg-slate-700/20">
                        <td className="px-5 py-4 font-medium text-violet-400">{order.id}</td>
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-xs text-slate-400">{order.phone}</p>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-300">{order.restaurant}</td>
                        <td className="px-5 py-4 text-sm text-slate-400 max-w-[200px] truncate">{order.items.join(', ')}</td>
                        <td className="px-5 py-4 font-semibold">{order.amount}</td>
                        <td className="px-5 py-4">{order.driver ? <span className="text-emerald-400">{order.driver}</span> : <span className="text-slate-500">Unassigned</span>}</td>
                        <td className="px-5 py-4"><Badge className={`${getStatusColor(order.status)} border`}>{order.status}</Badge></td>
                        <td className="px-5 py-4 text-slate-400 text-sm">{order.time}</td>
                        <td className="px-5 py-4"><Button variant="ghost" size="icon" className="text-slate-400 hover:text-white"><Eye className="w-4 h-4" /></Button></td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

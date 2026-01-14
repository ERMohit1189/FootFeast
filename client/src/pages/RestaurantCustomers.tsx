import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Menu as MenuIcon, 
  Settings, 
  Users, 
  TrendingUp,
  Search,
  LogOut,
  Bell,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  MoreVertical,
  Filter,
  Send,
  X,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const customers = [
  { 
    id: 1, 
    name: 'Rahul Sharma', 
    email: 'rahul.s@example.com', 
    phone: '+91 98765 43210', 
    totalOrders: 12, 
    totalSpent: '₹4,250', 
    lastOrder: '2 days ago',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Priya Patel', 
    email: 'priya.p@example.com', 
    phone: '+91 98765 43211', 
    totalOrders: 8, 
    totalSpent: '₹2,890', 
    lastOrder: '5 days ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'Amit Kumar', 
    email: 'amit.k@example.com', 
    phone: '+91 98765 43212', 
    totalOrders: 15, 
    totalSpent: '₹6,120', 
    lastOrder: 'Today',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    status: 'Loyal'
  },
  { 
    id: 4, 
    name: 'Sneha Gupta', 
    email: 'sneha.g@example.com', 
    phone: '+91 98765 43213', 
    totalOrders: 3, 
    totalSpent: '₹850', 
    lastOrder: '1 month ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    status: 'Inactive'
  }
];

export default function RestaurantCustomers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMailOpen, setIsMailOpen] = useState(false);
  const [mailForm, setMailForm] = useState({ subject: '', content: '' });
  const [isSending, setIsSending] = useState(false);

  const handleSendMail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Marketing mail sent successfully to all customers!');
    setIsSending(false);
    setIsMailOpen(false);
    setMailForm({ subject: '', content: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex relative">
      {/* Sidebar - Same as Dashboard */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl">FootFeast</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/restaurant/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/restaurant/orders">
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
              <ShoppingBag className="w-4 h-4" />
              Orders
              <Badge className="ml-auto bg-orange-100 text-orange-600 border-none">5</Badge>
            </Button>
          </Link>
          <Link href="/restaurant/menu">
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
              <MenuIcon className="w-4 h-4" />
              Menu Management
            </Button>
          </Link>
          <Link href="/restaurant/analytics">
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </Button>
          </Link>
          <Button variant="secondary" className="w-full justify-start gap-3 bg-orange-50 text-orange-600 hover:bg-orange-100">
            <Users className="w-4 h-4" />
            Customers
          </Button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
          <Link href="/restaurant/login">
            <Button variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 max-w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search customers by name or email..." 
                className="pl-10 bg-slate-50 border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5 text-slate-600" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-200">
              <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop" alt="User" />
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">Customer Management</h1>
              <p className="text-slate-500">Manage your restaurant's customer base and loyalty.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button 
                onClick={() => setIsMailOpen(true)}
                className="bg-orange-600 hover:bg-orange-700 gap-2"
              >
                <Send className="w-4 h-4" />
                Send Marketing Mail
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <th className="px-6 py-4 text-sm font-semibold text-slate-600">Customer</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-600">Contact</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-600">Total Orders</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-600">Revenue</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-600">Last Order</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {customers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={customer.avatar} alt={customer.name} className="w-10 h-10 rounded-full object-cover" />
                              <span className="font-semibold text-slate-900">{customer.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Mail className="w-3 h-3" />
                                {customer.email}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Phone className="w-3 h-3" />
                                {customer.phone}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{customer.totalOrders} orders</td>
                          <td className="px-6 py-4 font-semibold text-slate-900">{customer.totalSpent}</td>
                          <td className="px-6 py-4 text-sm text-slate-500">{customer.lastOrder}</td>
                          <td className="px-6 py-4">
                            <Badge className={`${
                              customer.status === 'Loyal' ? 'bg-purple-100 text-purple-700' :
                              customer.status === 'Active' ? 'bg-green-100 text-green-700' :
                              'bg-slate-100 text-slate-600'
                            } border-none`}>
                              {customer.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link href={`/restaurant/customer/${customer.id}`}>
                              <Button variant="ghost" size="icon">
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Marketing Mail Modal */}
      <AnimatePresence>
        {isMailOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-orange-600 text-white">
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  <h2 className="text-xl font-bold">New Marketing Campaign</h2>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsMailOpen(false)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <form onSubmit={handleSendMail} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Subject Line</label>
                  <Input 
                    required
                    placeholder="e.g. Weekend Special: 20% Off on All Biryanis!"
                    value={mailForm.subject}
                    onChange={(e) => setMailForm({...mailForm, subject: e.target.value})}
                    className="border-slate-200 focus:ring-orange-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">Email Content</label>
                    <Button type="button" variant="ghost" size="sm" className="text-orange-600 text-xs gap-1">
                      <Sparkles className="w-3 h-3" />
                      AI Rewrite
                    </Button>
                  </div>
                  <Textarea 
                    required
                    placeholder="Write your message here..."
                    className="min-h-[200px] border-slate-200 focus:ring-orange-500"
                    value={mailForm.content}
                    onChange={(e) => setMailForm({...mailForm, content: e.target.value})}
                  />
                  <p className="text-[10px] text-slate-400 italic">
                    Tip: Personalize with {"{customer_name}"} to increase engagement.
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsMailOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-[2] bg-orange-600 hover:bg-orange-700"
                    disabled={isSending}
                  >
                    {isSending ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending to {customers.length} users...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Campaign
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


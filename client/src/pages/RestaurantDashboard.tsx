import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Menu as MenuIcon, 
  Settings, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  Star,
  ChevronRight,
  Bell,
  Search,
  LogOut,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

export default function RestaurantDashboard() {
  const stats = [
    { title: 'Total Orders', value: '1,256', change: '+12.5%', trend: 'up', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Revenue', value: '₹1,45,230', change: '+18.2%', trend: 'up', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Avg. Rating', value: '4.8', change: '+0.2%', trend: 'up', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { title: 'Active Customers', value: '824', change: '-2.4%', trend: 'down', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  const orderTrends = [
    { time: '10am', orders: 12 },
    { time: '12pm', orders: 45 },
    { time: '2pm', orders: 32 },
    { time: '4pm', orders: 28 },
    { time: '6pm', orders: 56 },
    { time: '8pm', orders: 72 },
    { time: '10pm', orders: 48 },
  ];

  const recentOrders = [
    { id: '#ORD-7821', customer: 'Rahul Sharma', items: '2x Paneer Tikka, 1x Naan', amount: '₹650', status: 'In Progress', time: '5 mins ago' },
    { id: '#ORD-7820', customer: 'Priya Patel', items: '1x Butter Chicken, 2x Roti', amount: '₹420', status: 'Ready', time: '12 mins ago' },
    { id: '#ORD-7819', customer: 'Amit Kumar', items: '3x Veg Biryani', amount: '₹890', status: 'Delivered', time: '25 mins ago' },
    { id: '#ORD-7818', customer: 'Sneha Gupta', items: '1x Chole Bhature', amount: '₹180', status: 'Cancelled', time: '45 mins ago' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl">FootFeast</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/restaurant/dashboard">
            <Button variant="secondary" className="w-full justify-start gap-3 bg-orange-50 text-orange-600 hover:bg-orange-100">
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
          <Link href="/restaurant/customers">
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
              <Users className="w-4 h-4" />
              Customers
            </Button>
          </Link>
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
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 max-w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search orders, customers..." className="pl-10 bg-slate-50 border-none" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">Tandoori Nights</p>
                <p className="text-xs text-slate-500">Restaurant Manager</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop" alt="User" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Restaurant Dashboard</h1>
              <p className="text-slate-500">Welcome back, here's what's happening today.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Download Report</Button>
              <Link href="/restaurant/menu/add">
                <Button className="bg-orange-600 hover:bg-orange-700">Add New Menu Item</Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <Badge variant="secondary" className={`${
                      stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    } hover:bg-opacity-80 border-none flex items-center gap-1`}>
                      {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {stat.change}
                    </Badge>
                  </div>
                  <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Daily revenue performance for the current week.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ea580c" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="sales" stroke="#ea580c" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Trends</CardTitle>
                <CardDescription>Real-time order volume throughout the day.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={orderTrends}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      cursor={{fill: '#f8fafc'}}
                    />
                    <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>A list of your most recent transactions.</CardDescription>
                </div>
                <Link href="/restaurant/orders">
                  <Button variant="ghost" size="sm" className="text-orange-600">View All</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentOrders.map((order, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          order.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                          order.status === 'Ready' ? 'bg-yellow-50 text-yellow-600' :
                          order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {order.status === 'In Progress' ? <Clock className="w-5 h-5" /> :
                           order.status === 'Ready' ? <Bell className="w-5 h-5" /> :
                           order.status === 'Delivered' ? <CheckCircle2 className="w-5 h-5" /> :
                           <AlertCircle className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-semibold">{order.customer}</p>
                          <p className="text-xs text-slate-500">{order.items}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{order.amount}</p>
                        <p className="text-xs text-slate-500">{order.time}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={
                          order.status === 'In Progress' ? 'text-blue-600 border-blue-200 bg-blue-50' :
                          order.status === 'Ready' ? 'text-yellow-600 border-yellow-200 bg-yellow-50' :
                          order.status === 'Delivered' ? 'text-green-600 border-green-200 bg-green-50' :
                          'text-red-600 border-red-200 bg-red-50'
                        }>
                          {order.status}
                        </Badge>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Items */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Items</CardTitle>
                <CardDescription>Your best performing dishes this week.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { name: 'Paneer Tikka', orders: 45, image: 'https://images.unsplash.com/photo-1567184109411-b2033d9c79e6?w=100&h=100&fit=crop' },
                  { name: 'Butter Chicken', orders: 38, image: 'https://images.unsplash.com/photo-1603894584202-9ca82424c9ad?w=100&h=100&fit=crop' },
                  { name: 'Veg Biryani', orders: 32, image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=100&h=100&fit=crop' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.orders} orders this week</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">View All Items</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

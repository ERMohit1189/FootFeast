import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShoppingBag, 
  Users, 
  IndianRupee,
  Calendar,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function RestaurantAnalytics() {
  const stats = [
    { label: 'Weekly Revenue', value: '₹1,45,230', change: '+18.2%', up: true, icon: IndianRupee },
    { label: 'Avg. Order Value', value: '₹580', change: '+5.4%', up: true, icon: ShoppingBag },
    { label: 'Customer Retention', value: '64%', change: '+2.1%', up: true, icon: Users },
    { label: 'Cancellation Rate', value: '2.4%', change: '-0.8%', up: false, icon: TrendingUp },
  ];

  const revenueData = [
    { name: 'Mon', revenue: 4500, orders: 12 },
    { name: 'Tue', revenue: 5200, orders: 15 },
    { name: 'Wed', revenue: 4800, orders: 14 },
    { name: 'Thu', revenue: 6100, orders: 18 },
    { name: 'Fri', revenue: 7500, orders: 22 },
    { name: 'Sat', revenue: 9200, orders: 28 },
    { name: 'Sun', revenue: 8400, orders: 25 },
  ];

  const categoryData = [
    { name: 'Starters', value: 35, color: '#f97316' },
    { name: 'Main Course', value: 45, color: '#ea580c' },
    { name: 'Beverages', value: 12, color: '#fb923c' },
    { name: 'Desserts', value: 8, color: '#fdba74' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/restaurant/dashboard">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Restaurant Analytics</h1>
              <p className="text-slate-500 text-sm">Detailed performance insights for your restaurant</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline"><Calendar className="w-4 h-4 mr-2" />Select Date Range</Button>
            <Button className="bg-orange-600 hover:bg-orange-700">Export PDF</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-orange-50">
                      <stat.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <Badge variant="secondary" className={`${stat.up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} border-none`}>
                      {stat.up ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue & Orders</CardTitle>
              <CardDescription>Daily revenue and order volume comparison</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Order distribution across menu categories</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="250">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-full space-y-3 mt-6">
                {categoryData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-slate-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

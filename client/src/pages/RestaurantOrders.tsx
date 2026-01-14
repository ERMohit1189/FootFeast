import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  LayoutDashboard, 
  Menu as MenuIcon, 
  Settings, 
  Users, 
  TrendingUp,
  LogOut,
  Search,
  Bell,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Filter,
  Download,
  MoreVertical,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RestaurantOrders() {
  const orders = [
    { id: '#ORD-7821', customer: 'Rahul Sharma', items: '2x Paneer Tikka, 1x Naan', amount: '₹650', status: 'In Progress', time: '5 mins ago', type: 'Delivery' },
    { id: '#ORD-7820', customer: 'Priya Patel', items: '1x Butter Chicken, 2x Roti', amount: '₹420', status: 'Ready', time: '12 mins ago', type: 'Pickup' },
    { id: '#ORD-7819', customer: 'Amit Kumar', items: '3x Veg Biryani', amount: '₹890', status: 'Delivered', time: '25 mins ago', type: 'Delivery' },
    { id: '#ORD-7818', customer: 'Sneha Gupta', items: '1x Chole Bhature', amount: '₹180', status: 'Cancelled', time: '45 mins ago', type: 'Delivery' },
    { id: '#ORD-7817', customer: 'Vikram Singh', items: '1x Dal Makhani, 2x Garlic Naan', amount: '₹550', status: 'Delivered', time: '1 hour ago', type: 'Delivery' },
    { id: '#ORD-7816', customer: 'Anjali Ray', items: '2x Masala Dosa', amount: '₹320', status: 'Delivered', time: '2 hours ago', type: 'Pickup' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'text-blue-600 border-blue-200 bg-blue-50';
      case 'Ready': return 'text-yellow-600 border-yellow-200 bg-yellow-50';
      case 'Delivered': return 'text-green-600 border-green-200 bg-green-50';
      case 'Cancelled': return 'text-red-600 border-red-200 bg-red-50';
      default: return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Progress': return <Clock className="w-4 h-4" />;
      case 'Ready': return <Bell className="w-4 h-4" />;
      case 'Delivered': return <CheckCircle2 className="w-4 h-4" />;
      case 'Cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

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
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/restaurant/orders">
            <Button variant="secondary" className="w-full justify-start gap-3 bg-orange-50 text-orange-600 hover:bg-orange-100">
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
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
            <TrendingUp className="w-4 h-4" />
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
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
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 max-w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search orders, customers..." className="pl-10 bg-slate-50 border-none" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/restaurant/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </Button>
            </Link>
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
              <h1 className="text-2xl font-bold">Order Management</h1>
              <p className="text-slate-500">Manage and track your restaurant orders in real-time.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" className="text-orange-600 border-b-2 border-orange-600 rounded-none h-10 px-4">All Orders</Button>
                  <Button variant="ghost" className="text-slate-500 hover:text-slate-700 h-10 px-4">Pending</Button>
                  <Button variant="ghost" className="text-slate-500 hover:text-slate-700 h-10 px-4">Ready</Button>
                  <Button variant="ghost" className="text-slate-500 hover:text-slate-700 h-10 px-4">Completed</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="w-[120px] font-semibold">Order ID</TableHead>
                    <TableHead className="font-semibold">Customer</TableHead>
                    <TableHead className="font-semibold">Items</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Time</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="group hover:bg-slate-50/50">
                      <TableCell className="font-medium text-slate-900">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-slate-500">{order.items}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal border-slate-200">
                          {order.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{order.amount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`gap-1.5 px-3 py-1 font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-500">{order.time}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 group-hover:text-slate-600">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="gap-2">
                              <ExternalLink className="w-4 h-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              Mark as Ready
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-red-600">
                              <AlertCircle className="w-4 h-4" />
                              Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

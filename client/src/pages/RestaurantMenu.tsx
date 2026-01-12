import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Plus,
  Edit2,
  Trash2,
  MoreVertical,
  ChevronRight,
  Filter,
  Image as ImageIcon,
  X as CloseIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RestaurantMenu() {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Paneer Tikka', category: 'Starters', price: '₹320', status: 'Available', orders: 145, image: 'https://images.unsplash.com/photo-1567184109411-b2033d9c79e6?w=100&h=100&fit=crop' },
    { id: 2, name: 'Butter Chicken', category: 'Main Course', price: '₹450', status: 'Available', orders: 230, image: 'https://images.unsplash.com/photo-1603894584202-9ca82424c9ad?w=100&h=100&fit=crop' },
    { id: 3, name: 'Veg Biryani', category: 'Main Course', price: '₹380', status: 'Out of Stock', orders: 189, image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=100&h=100&fit=crop' },
    { id: 4, name: 'Garlic Naan', category: 'Bread', price: '₹60', status: 'Available', orders: 450, image: 'https://images.unsplash.com/photo-1533777324545-e016b7a224d8?w=100&h=100&fit=crop' },
    { id: 5, name: 'Gulab Jamun', category: 'Dessert', price: '₹120', status: 'Available', orders: 98, image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=100&h=100&fit=crop' },
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Starters',
    price: '',
    description: '',
    status: 'Available'
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      ...newItem,
      id: menuItems.length + 1,
      orders: 0,
      price: `₹${newItem.price}`,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop'
    };
    setMenuItems([item, ...menuItems]);
    setIsAddingItem(false);
    setNewItem({ name: '', category: 'Starters', price: '', description: '', status: 'Available' });
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
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
              <ShoppingBag className="w-4 h-4" />
              Orders
              <Badge className="ml-auto bg-orange-100 text-orange-600 border-none">5</Badge>
            </Button>
          </Link>
          <Link href="/restaurant/menu">
            <Button variant="secondary" className="w-full justify-start gap-3 bg-orange-50 text-orange-600 hover:bg-orange-100">
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
              <Input placeholder="Search dishes..." className="pl-10 bg-slate-50 border-none" />
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
              <h1 className="text-2xl font-bold">Menu Management</h1>
              <p className="text-slate-500">Add, edit and manage your restaurant menu items.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button 
                className="bg-orange-600 hover:bg-orange-700 gap-2"
                onClick={() => setIsAddingItem(true)}
              >
                <Plus className="w-4 h-4" />
                Add Item
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {isAddingItem && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8"
              >
                <Card className="border-orange-200 bg-orange-50/30">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Add New Menu Item</CardTitle>
                      <CardDescription>Fill in the details to add a new dish to your menu.</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsAddingItem(false)}>
                      <CloseIcon className="w-5 h-5" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Item Name</Label>
                          <Input 
                            id="name" 
                            placeholder="e.g. Masala Dosa" 
                            required 
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select 
                            value={newItem.category}
                            onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Starters">Starters</SelectItem>
                              <SelectItem value="Main Course">Main Course</SelectItem>
                              <SelectItem value="Bread">Bread</SelectItem>
                              <SelectItem value="Dessert">Dessert</SelectItem>
                              <SelectItem value="Beverages">Beverages</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Price (₹)</Label>
                          <Input 
                            id="price" 
                            type="number" 
                            placeholder="0.00" 
                            required 
                            value={newItem.price}
                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea 
                            id="description" 
                            placeholder="Describe the dish..." 
                            className="h-[115px]" 
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                          />
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                          <Button variant="outline" type="button" onClick={() => setIsAddingItem(false)}>Cancel</Button>
                          <Button type="submit" className="bg-orange-600 hover:bg-orange-700">Save Item</Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <Card>
            <CardHeader className="border-b border-slate-100">
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="text-orange-600 border-b-2 border-orange-600 rounded-none h-10 px-4">All Items</Button>
                <Button variant="ghost" className="text-slate-500 hover:text-slate-700 h-10 px-4">Starters</Button>
                <Button variant="ghost" className="text-slate-500 hover:text-slate-700 h-10 px-4">Main Course</Button>
                <Button variant="ghost" className="text-slate-500 hover:text-slate-700 h-10 px-4">Desserts</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold">Price</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Orders</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menuItems.map((item) => (
                    <TableRow key={item.id} className="group hover:bg-slate-50/50">
                      <TableCell>
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden relative">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal border-slate-200">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{item.price}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`font-medium ${
                          item.status === 'Available' ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'
                        }`}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-500">{item.orders} times</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Mark as Unavailable</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate Item</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete Permanently</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
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

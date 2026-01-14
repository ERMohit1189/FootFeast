import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ChevronLeft, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  IndianRupee,
  Star,
  User,
  History,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link, useParams } from 'wouter';

const customerData = {
  id: '1',
  name: 'Rahul Sharma',
  email: 'rahul.s@example.com',
  phone: '+91 98765 43210',
  joinDate: 'Jan 15, 2024',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop',
  status: 'Active',
  stats: {
    totalOrders: 42,
    totalSpent: '₹15,420',
    avgOrderValue: '₹367',
    loyaltyPoints: 850
  },
  addresses: [
    { type: 'Home', address: 'Apartment 402, Sunshine Towers, MG Road, Mumbai 400001' },
    { type: 'Office', address: 'Tech Park, Sector 5, Bandra East, Mumbai 400051' }
  ],
  favoriteDishes: [
    { name: 'Paneer Tikka', orders: 12, rating: 4.5 },
    { name: 'Butter Chicken', orders: 8, rating: 5.0 },
    { name: 'Veg Biryani', orders: 6, rating: 4.8 }
  ],
  orderHistory: [
    { id: '#ORD-7821', restaurant: 'Tandoori Nights', items: '2x Paneer Tikka, 1x Naan', amount: '₹650', status: 'Delivered', date: '2 days ago' },
    { id: '#ORD-7754', restaurant: 'Burger King', items: '1x Whopper, 1x Fries', amount: '₹420', status: 'Delivered', date: '1 week ago' },
    { id: '#ORD-7621', restaurant: 'Pizza Hut', items: '1x Large Pepperoni', amount: '₹890', status: 'Cancelled', date: '2 weeks ago' }
  ]
};

export default function CustomerProfile() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/restaurant/customers">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Customer Profile</h1>
              <p className="text-slate-500 text-sm">Viewing details for {customerData.name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="hidden sm:flex">Edit Profile</Button>
            <Button className="bg-orange-600 hover:bg-orange-700">Send Message</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <img 
                    src={customerData.avatar} 
                    alt={customerData.name} 
                    className="w-32 h-32 rounded-full border-4 border-white shadow-xl mx-auto object-cover" 
                  />
                  <Badge className="absolute bottom-2 right-2 bg-green-500 border-2 border-white">{customerData.status}</Badge>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{customerData.name}</h2>
                <p className="text-slate-500 text-sm mb-4">Customer since {customerData.joinDate}</p>
                
                <div className="flex justify-center gap-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-slate-900">{customerData.stats.totalOrders}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Orders</p>
                  </div>
                  <div className="w-px h-10 bg-slate-200" />
                  <div className="text-center">
                    <p className="text-xl font-bold text-slate-900">{customerData.stats.loyaltyPoints}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Points</p>
                  </div>
                </div>
              </CardContent>
              <CardContent className="p-6 border-t border-slate-100 bg-slate-50/50">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{customerData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{customerData.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Saved Addresses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {customerData.addresses.map((addr, i) => (
                  <div key={i} className="flex gap-3">
                    <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">{addr.type}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{addr.address}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats & History */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-orange-600 to-orange-400 text-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <IndianRupee className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white border-none">LIFETIME</Badge>
                  </div>
                  <h3 className="text-orange-100 text-sm font-medium">Total Spending</h3>
                  <p className="text-3xl font-bold mt-1">{customerData.stats.totalSpent}</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Star className="w-6 h-6 text-blue-600" />
                    </div>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none">AVERAGE</Badge>
                  </div>
                  <h3 className="text-slate-500 text-sm font-medium">Order Value</h3>
                  <p className="text-3xl font-bold text-slate-900 mt-1">{customerData.stats.avgOrderValue}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-slate-900" />
                  <CardTitle className="text-lg">Recent Order History</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {customerData.orderHistory.map((order, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {order.status === 'Delivered' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-slate-900">{order.id}</p>
                            <span className="text-slate-300">•</span>
                            <p className="text-sm text-slate-600">{order.restaurant}</p>
                          </div>
                          <p className="text-xs text-slate-500">{order.items}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">{order.amount}</p>
                        <p className="text-xs text-slate-500">{order.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-6 text-orange-600 hover:text-orange-700 hover:bg-orange-50">View All Orders</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <CardTitle className="text-lg">Favorite Dishes</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {customerData.favoriteDishes.map((dish, i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                      <p className="font-semibold text-slate-900 mb-1">{dish.name}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500">{dish.orders} times</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs font-medium">{dish.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

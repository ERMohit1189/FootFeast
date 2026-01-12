import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Bike, Package, Wallet, User, Star, ChevronRight, Settings, 
  HelpCircle, FileText, Shield, LogOut, Phone, Mail, MapPin,
  Camera, Award, Clock, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const stats = {
  totalDeliveries: 1247,
  totalEarnings: '₹2,49,000',
  avgRating: 4.92,
  onTimeRate: '98%',
  memberSince: 'March 2024'
};

const menuItems = [
  { icon: User, label: 'Personal Information', href: '#' },
  { icon: FileText, label: 'Documents', href: '#' },
  { icon: MapPin, label: 'Saved Addresses', href: '#' },
  { icon: Shield, label: 'Safety', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
  { icon: HelpCircle, label: 'Help & Support', href: '#' },
];

export default function DeliveryProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-24">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 pt-8 pb-16 px-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-white">Profile</h1>
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-white/20">
                <AvatarFallback className="bg-white text-emerald-600 text-2xl font-bold">RK</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
            <div className="text-white">
              <h2 className="text-xl font-bold">Raj Kumar</h2>
              <p className="text-emerald-100 text-sm mb-2">Partner since {stats.memberSince}</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-white/20 text-white border-0">
                  <Award className="w-3 h-3 mr-1" />
                  Gold Partner
                </Badge>
                <Badge className="bg-white/20 text-white border-0">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {stats.avgRating}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 -mt-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 rounded-2xl border border-slate-700/50 p-4 grid grid-cols-3 gap-4"
        >
          <div className="text-center">
            <Package className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-xl font-bold text-white">{stats.totalDeliveries}</p>
            <p className="text-xs text-slate-400">Deliveries</p>
          </div>
          <div className="text-center border-x border-slate-700">
            <TrendingUp className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-xl font-bold text-white">{stats.totalEarnings}</p>
            <p className="text-xs text-slate-400">Earned</p>
          </div>
          <div className="text-center">
            <Clock className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-xl font-bold text-white">{stats.onTimeRate}</p>
            <p className="text-xs text-slate-400">On Time</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden"
        >
          <div className="p-4 border-b border-slate-700/50">
            <h3 className="font-semibold text-white">Contact Information</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Phone</p>
                <p className="text-white">+91 98765-43210</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Email</p>
                <p className="text-white">raj.kumar@email.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden"
        >
          {menuItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors border-b border-slate-700/50 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-slate-400" />
                </div>
                <span className="text-white">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/">
            <Button 
              variant="outline" 
              className="w-full h-12 rounded-xl border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Log Out
            </Button>
          </Link>
        </motion.div>

        <p className="text-center text-xs text-slate-500">
          FoodDash Partner App v2.1.0
        </p>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl border-t border-slate-700/50 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-around">
          <Link href="/delivery/dashboard"><button className="flex flex-col items-center gap-1 px-4 py-2 text-slate-500"><Bike className="w-5 h-5" /><span className="text-xs">Home</span></button></Link>
          <Link href="/delivery/orders"><button className="flex flex-col items-center gap-1 px-4 py-2 text-slate-500"><Package className="w-5 h-5" /><span className="text-xs">Orders</span></button></Link>
          <Link href="/delivery/earnings"><button className="flex flex-col items-center gap-1 px-4 py-2 text-slate-500"><Wallet className="w-5 h-5" /><span className="text-xs">Earnings</span></button></Link>
          <Link href="/delivery/profile"><button className="flex flex-col items-center gap-1 px-4 py-2 text-emerald-400"><User className="w-5 h-5" /><span className="text-xs">Profile</span></button></Link>
        </div>
      </nav>
    </div>
  );
}

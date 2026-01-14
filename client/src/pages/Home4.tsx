import { motion } from "framer-motion";
import { Search, ShoppingBag, Star, Clock, MapPin, ChevronRight, Heart, Zap, Award, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const CATEGORIES = [
  { name: "Fast Food", icon: "🍔", count: 42, color: "bg-red-50" },
  { name: "Pizza", icon: "🍕", count: 28, color: "bg-orange-50" },
  { name: "Healthy", icon: "🥗", count: 15, color: "bg-green-50" },
  { name: "Dessert", icon: "🍦", count: 22, color: "bg-purple-50" },
  { name: "Indian", icon: "🍛", count: 56, color: "bg-yellow-50" },
  { name: "Drinks", icon: "🥤", count: 18, color: "bg-blue-50" },
];

const RESTAURANTS = [
  {
    id: 1,
    name: "Golden Dragon",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
    rating: 4.8,
    time: "20-30 min",
    category: "Chinese • Seafood",
    tag: "Free Delivery",
    tagColor: "bg-blue-100 text-blue-700"
  },
  {
    id: 2,
    name: "Burger King",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    rating: 4.5,
    time: "15-25 min",
    category: "Burgers • Fast Food",
    tag: "20% OFF",
    tagColor: "bg-orange-100 text-orange-700"
  },
  {
    id: 3,
    name: "The Italian Kitchen",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=400&h=300&fit=crop",
    rating: 4.9,
    time: "35-45 min",
    category: "Pasta • Italian",
    tag: "Bestseller",
    tagColor: "bg-yellow-100 text-yellow-700"
  }
];

const TOP_SELLING = [
  {
    id: 1,
    name: "Classic Paneer Tikka",
    restaurant: "Tandoori Nights",
    price: "₹320",
    rating: 4.9,
    orders: "1.2k+ sold",
    image: "https://images.unsplash.com/photo-1567184109411-b2033d9c79e6?w=300&h=300&fit=crop",
    color: "bg-orange-50"
  },
  {
    id: 2,
    name: "Butter Chicken",
    restaurant: "Golden Dragon",
    price: "₹450",
    rating: 4.8,
    orders: "2.5k+ sold",
    image: "https://images.unsplash.com/photo-1603894584202-9ca82424c9ad?w=300&h=300&fit=crop",
    color: "bg-red-50"
  },
  {
    id: 3,
    name: "Veggie Supreme Pizza",
    restaurant: "Pizza Hut",
    price: "₹599",
    rating: 4.7,
    orders: "3.1k+ sold",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop",
    color: "bg-yellow-50"
  },
  {
    id: 4,
    name: "Double Cheese Burger",
    restaurant: "Burger King",
    price: "₹249",
    rating: 4.6,
    orders: "4.2k+ sold",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop",
    color: "bg-blue-50"
  }
];

export default function Home4() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Grid Pattern Header */}
      <div className="relative overflow-hidden bg-slate-900 pt-16 pb-32">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4 bg-orange-600/20 text-orange-400 border-orange-600/30">
              <Zap className="w-3 h-3 mr-1 fill-orange-400" /> Fast Delivery in your city
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Delicious Food, <span className="text-orange-500 underline decoration-orange-500/30 underline-offset-8">Delivered</span> Right Away.
            </h1>
            <p className="text-slate-400 text-lg mb-8">
              Order from the best local restaurants with the fastest delivery service.
            </p>
            <div className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/10">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
                <Input 
                  className="bg-transparent border-none text-white placeholder:text-slate-500 h-12 pl-10 focus-visible:ring-0" 
                  placeholder="Enter delivery address..." 
                />
              </div>
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 rounded-xl h-12">
                Search Food
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16">
        {/* Category Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={`${cat.color} p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all cursor-pointer group`}
            >
              <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{cat.icon}</span>
              <h3 className="font-bold text-slate-900">{cat.name}</h3>
              <p className="text-xs text-slate-500">{cat.count} places</p>
            </motion.div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Award className="text-orange-500" /> Popular Near You
            </h2>
            <p className="text-slate-500 text-sm">Hand-picked favorites based on your taste</p>
          </div>
          <Button variant="ghost" className="text-orange-600 font-bold group">
            See All <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Top Selling Foods Section */}
        <div className="mb-16 overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600 fill-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 leading-none mb-1">Top Selling Foods</h2>
              <p className="text-slate-500 text-sm font-medium">The dishes everyone is talking about</p>
            </div>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4">
            {TOP_SELLING.map((food, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="flex-shrink-0 w-72 group cursor-pointer"
              >
                <div className={`${food.color} rounded-[2.5rem] p-6 relative overflow-hidden transition-all duration-300 group-hover:shadow-xl`}>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black text-slate-900 border border-white">
                        {food.orders}
                      </div>
                      <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-900 hover:text-red-500 transition-colors shadow-sm">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="aspect-square rounded-full overflow-hidden mb-6 shadow-2xl border-4 border-white/50 group-hover:scale-105 transition-transform duration-500">
                      <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-black text-slate-900 text-lg line-clamp-1 mb-1">{food.name}</h3>
                      <p className="text-slate-500 text-xs mb-3">{food.restaurant}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xl font-black text-slate-900">{food.price}</span>
                        <Button size="sm" className="rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold h-9">
                          Add <Plus className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-colors"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Advertisement Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative h-48 rounded-[2rem] overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 p-8 flex items-center justify-between group cursor-pointer shadow-lg"
          >
            <div className="relative z-10">
              <Badge className="bg-white/20 text-white border-none mb-3">Limited Offer</Badge>
              <h3 className="text-2xl font-black text-white mb-2">First Order: 50% OFF</h3>
              <p className="text-blue-100 text-sm">Use code: <span className="font-mono font-bold text-white bg-blue-500/50 px-2 py-0.5 rounded">NEW50</span></p>
              <Button size="sm" className="mt-4 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl">Order Now</Button>
            </div>
            <div className="absolute right-0 bottom-0 opacity-20 group-hover:opacity-30 transition-opacity">
              <ShoppingBag className="w-40 h-40 translate-x-10 translate-y-10" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative h-48 rounded-[2rem] overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 p-8 flex items-center justify-between group cursor-pointer shadow-lg"
          >
            <div className="relative z-10">
              <Badge className="bg-white/20 text-white border-none mb-3">Partner Program</Badge>
              <h3 className="text-2xl font-black text-white mb-2">Become a Driver</h3>
              <p className="text-purple-100 text-sm">Earn up to ₹30k per month + bonuses</p>
              <Button size="sm" className="mt-4 bg-white text-purple-600 hover:bg-white/90 font-bold rounded-xl">Join Now</Button>
            </div>
            <div className="absolute right-0 bottom-0 opacity-20 group-hover:opacity-30 transition-opacity">
              <Zap className="w-40 h-40 translate-x-10 translate-y-10" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {RESTAURANTS.map((res) => (
            <Link key={res.id} href={`/restaurant/${res.id}`}>
              <motion.div 
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-4 shadow-xl">
                  <img src={res.image} alt={res.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${res.tagColor} border-none font-bold rounded-full px-3 py-1 shadow-sm`}>
                      {res.tag}
                    </Badge>
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="px-2">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-black text-slate-900">{res.name}</h3>
                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-lg text-sm font-bold">
                      <Star className="w-3 h-3 fill-green-700" /> {res.rating}
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm mb-2">{res.category}</p>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-orange-500" /> {res.time}</span>
                    <span className="flex items-center gap-1"><ShoppingBag className="w-3 h-3 text-orange-500" /> No Min. Order</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Promo Section */}
        <Card className="bg-gradient-to-br from-orange-500 to-red-600 border-none rounded-[3rem] overflow-hidden mb-20">
          <CardContent className="p-12 md:p-16 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                Unlock exclusive deals with FootFeast Plus
              </h2>
              <p className="text-orange-50 text-lg mb-8 opacity-90">
                Join our premium membership for zero delivery fees and up to 50% discount on 2000+ restaurants.
              </p>
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-black px-10 rounded-2xl h-14 text-lg">
                Join Plus Today
              </Button>
            </div>
            <div className="flex-1 relative">
              <div className="w-full aspect-square bg-white/10 rounded-[3rem] backdrop-blur-3xl flex items-center justify-center border border-white/20">
                <ShoppingBag className="w-32 h-32 text-white/40" />
                <div className="absolute -top-4 -left-4 bg-yellow-400 text-yellow-900 font-black p-4 rounded-2xl rotate-[-12deg] shadow-lg">
                  50% OFF
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white text-slate-900 font-black p-4 rounded-2xl rotate-[12deg] shadow-lg">
                  Free Delivery
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modern Footer */}
      <footer className="bg-slate-900 text-slate-300 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <span className="font-black text-2xl text-white">FootFeast</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Making delicious food accessible to everyone. The fastest delivery service in your neighborhood.
              </p>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-orange-600 hover:text-white border border-white/10 transition-all">
                  <Zap className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-orange-600 hover:text-white border border-white/10 transition-all">
                  <Star className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-orange-600 hover:text-white border border-white/10 transition-all">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-white font-black mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><Link href="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
                <li><Link href="/restaurant/login" className="hover:text-orange-500 transition-colors">Restaurant Login</Link></li>
                <li><Link href="/admin/login" className="hover:text-orange-500 transition-colors">Admin Panel</Link></li>
                <li><Link href="/delivery/login" className="hover:text-orange-500 transition-colors">Partner with Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black mb-6">Help & Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-orange-500 transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black mb-6">Newsletter</h4>
              <p className="text-slate-400 mb-6 text-sm">Subscribe to get latest updates and offers.</p>
              <div className="flex gap-2">
                <Input className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" placeholder="Email address" />
                <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold">
                  Join
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© 2026 FootFeast. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" /> Bengaluru, India
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

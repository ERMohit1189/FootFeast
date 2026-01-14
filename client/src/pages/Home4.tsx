import { motion } from "framer-motion";
import { Search, ShoppingBag, Star, Clock, MapPin, ChevronRight, Heart, Zap, Award } from "lucide-react";
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
    </div>
  );
}

import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Lock, Eye, EyeOff, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DeliveryLogin() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation('/delivery/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-emerald-800/30 backdrop-blur-xl rounded-3xl border border-emerald-700/50 p-8 shadow-2xl">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6 -ml-2 text-emerald-300 hover:text-white" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30"
            >
              <Bike className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Delivery Partner</h2>
            <p className="text-emerald-300">Sign in to start delivering</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-emerald-200">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="pl-12 h-12 rounded-xl bg-emerald-700/30 border-emerald-600/50 text-white placeholder:text-emerald-400/50 focus:border-emerald-400"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  data-testid="input-phone"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-emerald-200">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-12 pr-12 h-12 rounded-xl bg-emerald-700/30 border-emerald-600/50 text-white placeholder:text-emerald-400/50 focus:border-emerald-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-emerald-900 shadow-lg shadow-emerald-500/30"
                data-testid="button-login"
              >
                Start Delivering
              </Button>
            </motion.div>
          </form>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { icon: '💰', label: 'Earn Daily' },
              { icon: '⏰', label: 'Flexible Hours' },
              { icon: '🏍️', label: 'Be Your Boss' },
            ].map((item, i) => (
              <div key={i} className="text-center p-3 bg-emerald-700/20 rounded-xl">
                <span className="text-2xl mb-1 block">{item.icon}</span>
                <span className="text-xs text-emerald-300">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-emerald-700/20 rounded-xl text-center">
            <p className="text-sm text-emerald-300">
              New partner?{' '}
              <a href="#" className="text-emerald-400 font-semibold hover:underline">
                Apply to join our fleet
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-emerald-400/60 mt-6">
          Restaurant Admin?{' '}
          <Link href="/admin/login">
            <span className="text-emerald-400 hover:underline cursor-pointer">Login here</span>
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

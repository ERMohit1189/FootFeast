import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { LayoutDashboard, Store, Users, ShoppingBag, TrendingUp, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
  { icon: Store, label: 'Restaurants', path: '/admin/restaurants' },
  { icon: Users, label: 'Customers', path: '/admin/customers' },
  { icon: TrendingUp, label: 'Analytics', path: '/admin/analytics' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [location, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-800/50 border-r border-slate-700/50 flex flex-col transition-all duration-300`}>
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">F</span>
            </div>
            {sidebarOpen && <span className="font-bold text-lg">FoodDash Admin</span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item, i) => {
            const active = location?.startsWith(item.path);
            return (
              <motion.button
                key={i}
                whileHover={{ x: 4 }}
                onClick={() => setLocation(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  active ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </motion.button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white" data-testid="button-logout">
              <LogOut className="w-5 h-5" />
              {sidebarOpen && 'Logout'}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="mt-3 text-slate-400 hover:text-white" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Store, Users, ShoppingBag, TrendingUp, Settings, LogOut, 
  Bell, Shield, CreditCard, Globe, Palette, Mail, Smartphone, Save, Bike
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: ShoppingBag, label: 'Orders', href: '/admin/orders' },
  { icon: Store, label: 'Restaurants', href: '/admin/restaurants' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: Bike, label: 'Delivery Partners', href: '/admin/drivers' },
  { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings', active: true },
];

export default function AdminSettings() {
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false, orders: true, marketing: false });

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className="w-64 bg-slate-800/50 border-r border-slate-700/50 flex flex-col">
        <div className="p-4 border-b border-slate-700/50">
          <Link href="/admin/dashboard">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <span className="font-bold text-lg">FoodDash Admin</span>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${item.active ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700/50">
          <Link href="/"><Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white"><LogOut className="w-5 h-5" />Logout</Button></Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-slate-400 text-sm">Manage your admin preferences</p>
          </div>
        </header>

        <div className="p-6">
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-1">
              <TabsTrigger value="general" className="rounded-lg data-[state=active]:bg-violet-500 data-[state=active]:text-white"><Globe className="w-4 h-4 mr-2" />General</TabsTrigger>
              <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-violet-500 data-[state=active]:text-white"><Bell className="w-4 h-4 mr-2" />Notifications</TabsTrigger>
              <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-violet-500 data-[state=active]:text-white"><Shield className="w-4 h-4 mr-2" />Security</TabsTrigger>
              <TabsTrigger value="billing" className="rounded-lg data-[state=active]:bg-violet-500 data-[state=active]:text-white"><CreditCard className="w-4 h-4 mr-2" />Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="font-bold text-lg mb-4">Business Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Business Name</Label>
                      <Input defaultValue="FoodDash India" className="bg-slate-700/50 border-slate-600 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Support Email</Label>
                      <Input defaultValue="support@fooddash.in" className="bg-slate-700/50 border-slate-600 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Phone Number</Label>
                      <Input defaultValue="+91 1800-123-4567" className="bg-slate-700/50 border-slate-600 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Currency</Label>
                      <Input defaultValue="INR (₹)" className="bg-slate-700/50 border-slate-600 text-white" disabled />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="font-bold text-lg mb-4">Delivery Settings</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Base Delivery Fee</Label>
                      <Input defaultValue="₹29" className="bg-slate-700/50 border-slate-600 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Free Delivery Threshold</Label>
                      <Input defaultValue="₹500" className="bg-slate-700/50 border-slate-600 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Max Delivery Radius</Label>
                      <Input defaultValue="10 km" className="bg-slate-700/50 border-slate-600 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Estimated Delivery Time</Label>
                      <Input defaultValue="30-45 mins" className="bg-slate-700/50 border-slate-600 text-white" />
                    </div>
                  </div>
                </div>

                <Button className="bg-violet-500 hover:bg-violet-600"><Save className="w-4 h-4 mr-2" />Save Changes</Button>
              </motion.div>
            </TabsContent>

            <TabsContent value="notifications">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                <h3 className="font-bold text-lg mb-6">Notification Preferences</h3>
                <div className="space-y-6">
                  {[
                    { key: 'email', icon: Mail, label: 'Email Notifications', desc: 'Receive updates via email' },
                    { key: 'push', icon: Bell, label: 'Push Notifications', desc: 'Browser push notifications' },
                    { key: 'sms', icon: Smartphone, label: 'SMS Notifications', desc: 'Text message alerts' },
                    { key: 'orders', icon: ShoppingBag, label: 'New Order Alerts', desc: 'Get notified for every new order' },
                    { key: 'marketing', icon: TrendingUp, label: 'Marketing Updates', desc: 'Tips and promotional content' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-slate-400">{item.desc}</p>
                        </div>
                      </div>
                      <Switch checked={notifications[item.key as keyof typeof notifications]} onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })} />
                    </div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="security">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="font-bold text-lg mb-4">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Current Password</Label>
                      <Input type="password" className="bg-slate-700/50 border-slate-600 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">New Password</Label>
                      <Input type="password" className="bg-slate-700/50 border-slate-600 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Confirm New Password</Label>
                      <Input type="password" className="bg-slate-700/50 border-slate-600 text-white" />
                    </div>
                    <Button className="bg-violet-500 hover:bg-violet-600">Update Password</Button>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="font-bold text-lg mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-300">Add an extra layer of security to your account</p>
                      <p className="text-sm text-slate-400">We'll send a code to your phone when you log in</p>
                    </div>
                    <Button variant="outline" className="border-slate-600 text-slate-300">Enable 2FA</Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="billing">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl border border-violet-500/30 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-violet-300">Current Plan</p>
                      <p className="text-2xl font-bold">Enterprise</p>
                    </div>
                    <Button variant="outline" className="border-violet-400 text-violet-300">Upgrade Plan</Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div><p className="text-2xl font-bold">Unlimited</p><p className="text-sm text-slate-400">Orders</p></div>
                    <div><p className="text-2xl font-bold">Unlimited</p><p className="text-sm text-slate-400">Restaurants</p></div>
                    <div><p className="text-2xl font-bold">24/7</p><p className="text-sm text-slate-400">Support</p></div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="font-bold text-lg mb-4">Payment Method</h3>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">VISA</div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-slate-400">Expires 12/26</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-slate-400">Edit</Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

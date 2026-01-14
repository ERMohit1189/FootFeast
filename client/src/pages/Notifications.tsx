import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Bell, 
  ShoppingBag, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  User, 
  Trash2,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'system' | 'customer';
  time: string;
  isRead: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Order Received',
    message: 'Rahul Sharma placed a new order #ORD-7821 for ₹650',
    type: 'order',
    time: '2 mins ago',
    isRead: false
  },
  {
    id: '2',
    title: 'Order Delivered',
    message: 'Order #ORD-7819 has been successfully delivered to Amit Kumar',
    type: 'order',
    time: '25 mins ago',
    isRead: true
  },
  {
    id: '3',
    title: 'System Update',
    message: 'New analytics dashboard is now available for your restaurant.',
    type: 'system',
    time: '1 hour ago',
    isRead: false
  },
  {
    id: '4',
    title: 'New Customer',
    message: 'Sneha Gupta has registered as a regular customer.',
    type: 'customer',
    time: '3 hours ago',
    isRead: true
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    toast.success('Notification marked as read');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success('Notification deleted');
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success('All notifications cleared');
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order': return <ShoppingBag className="w-5 h-5 text-blue-600" />;
      case 'system': return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'customer': return <User className="w-5 h-5 text-purple-600" />;
    }
  };

  const getBg = (type: Notification['type']) => {
    switch (type) {
      case 'order': return 'bg-blue-50';
      case 'system': return 'bg-orange-50';
      case 'customer': return 'bg-purple-50';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/restaurant/dashboard">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
              <p className="text-slate-500 text-sm">Manage your restaurant alerts and updates</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>Mark all read</Button>
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={clearAll}>Clear all</Button>
          </div>
        </header>

        <Card>
          <CardContent className="p-0">
            {notifications.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">No notifications</h3>
                <p className="text-slate-500 text-sm">You're all caught up!</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                <AnimatePresence initial={false}>
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={`p-6 flex gap-4 transition-colors ${notification.isRead ? 'bg-white' : 'bg-orange-50/30'}`}
                    >
                      <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${getBg(notification.type)}`}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className={`font-semibold truncate ${notification.isRead ? 'text-slate-900' : 'text-orange-900'}`}>
                            {notification.title}
                          </h4>
                          <span className="text-xs text-slate-400 whitespace-nowrap ml-4 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {notification.time}
                          </span>
                        </div>
                        <p className={`text-sm mb-3 ${notification.isRead ? 'text-slate-600' : 'text-slate-700 font-medium'}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2">
                          {!notification.isRead && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 text-xs text-orange-600 hover:text-orange-700 hover:bg-orange-50 p-0 px-2"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 text-xs text-slate-400 hover:text-red-600 hover:bg-red-50 p-0 px-2 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

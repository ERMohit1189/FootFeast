import { motion } from 'framer-motion';
import { Phone, Twitter, Instagram, Linkedin } from 'lucide-react';
<<<<<<< HEAD
import { Link } from 'wouter';
=======
>>>>>>> 0e04964beb3e4bcff8cc0805fe7d4c090c8388de

export function Footer({ theme }: { theme?: 'light'|'dark' }) {
  const container = theme === 'dark' ? 'bg-slate-900 text-white border-t border-slate-800' : 'bg-card border-t border-border/50';

  return (
    <footer className={`${container} mt-auto`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold">
                Food<span className="text-primary">Dash</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The best food delivery app in town. Fresh, fast, and delicious.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Phone, href: 'tel:+15555555555', label: 'phone', color: 'text-emerald-600', hoverBg: 'hover:bg-emerald-600/10' },
                { Icon: Twitter, href: 'https://twitter.com/fooddash', label: 'twitter', color: 'text-sky-500', hoverBg: 'hover:bg-sky-500/10' },
                { Icon: Instagram, href: 'https://instagram.com/fooddash', label: 'instagram', color: 'text-pink-500', hoverBg: 'hover:bg-pink-500/10' },
                { Icon: Linkedin, href: 'https://linkedin.com/company/fooddash', label: 'linkedin', color: 'text-sky-700', hoverBg: 'hover:bg-sky-700/10' },
              ].map(({ Icon, href, label, color, hoverBg }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`social-${label}`}
                  title={label}
                  className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${hoverBg}`}
                >
                  <Icon className={`w-4 h-4 ${color}`} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
<<<<<<< HEAD
              <li><Link href="/admin/login" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Admin Login</Link></li>
              <li><Link href="/delivery/login" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Delivery Login</Link></li>
              <li><Link href="/help" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Help Center</Link></li>
              <li><Link href="/safety" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Safety</Link></li>
=======
              <li><a href="#" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Safety</a></li>
              <li><a href="#" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Privacy Policy</a></li>
>>>>>>> 0e04964beb3e4bcff8cc0805fe7d4c090c8388de
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Partner with us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
<<<<<<< HEAD
              <li><Link href="/add-restaurant" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Add Your Restaurant</Link></li>
              <li><Link href="/restaurant/login" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Restaurant Login</Link></li>
              <li><Link href="/become-rider" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Become a Rider</Link></li>
              <li><Link href="/corporate" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">For Corporates</Link></li>
=======
              <li><a href="#" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Add Your Restaurant</a></li>
              <li><a href="#" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Become a Rider</a></li>
              <li><a href="#" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary">For Corporates</a></li>
>>>>>>> 0e04964beb3e4bcff8cc0805fe7d4c090c8388de
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 FoodDash. All rights reserved. Made with ❤️ for food lovers.</p>
        </div>
      </div>
    </footer>
  );
}

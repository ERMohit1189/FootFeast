import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { restaurants, categories, menuItems, useCart } from '@/lib/store';
import { RestaurantCard } from '@/components/RestaurantCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, ChevronRight, ChevronDown, Sliders, Sun, Moon, LayoutGrid, List, Home as HomeIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import VideoSlider from '@/components/VideoSlider';

export default function Home2() {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [pageTheme, setPageTheme] = useState<'light'|'dark'>('light');
  const [layoutMode, setLayoutMode] = useState<'grid'|'list'>('grid');

  // Hero layout variant (A=centered, B=split, C=compact) - persisted
  const [heroLayout, setHeroLayout] = useState<'A'|'B'|'C'>(() => { try { return (localStorage.getItem('home2-hero-layout') as 'A'|'B'|'C') ?? 'A'; } catch (e) { return 'A'; } });
  useEffect(() => { try { localStorage.setItem('home2-hero-layout', heroLayout); } catch (e) {} }, [heroLayout]);

  // membership settings (parity with Home1)
  const [membershipEnabled, setMembershipEnabled] = useState<boolean>(() => { try { return localStorage.getItem('home2-membership-enabled') === 'true'; } catch (e) { return true; } });
  useEffect(() => { try { localStorage.setItem('home2-membership-enabled', membershipEnabled ? 'true' : 'false'); } catch (e) {} }, [membershipEnabled]);

  const [membershipTier, setMembershipTier] = useState<'basic'|'plus'|'premium'>(() => { try { return (localStorage.getItem('home2-membership-tier') as 'basic'|'plus'|'premium') ?? 'basic'; } catch (e) { return 'basic'; } });
  useEffect(() => { try { localStorage.setItem('home2-membership-tier', membershipTier); } catch (e) {} }, [membershipTier]);

  const [goldShade, setGoldShade] = useState<'amber'|'yellow'|'orange'|'rose'|'lime'|'blue'|'silver'|'pink'|'gold'|'red'>(() => { try { return (localStorage.getItem('home2-gold-shade') as 'amber'|'yellow'|'orange'|'rose'|'lime'|'blue'|'silver'|'pink'|'gold'|'red') ?? 'amber'; } catch (e) { return 'amber'; } });
  useEffect(() => { try { localStorage.setItem('home2-gold-shade', goldShade); } catch (e) {} }, [goldShade]);

  const [membershipBgMode, setMembershipBgMode] = useState<'solid'|'gradient'>(() => { try { return (localStorage.getItem('home2-membership-bg-mode') as 'solid'|'gradient') ?? 'gradient'; } catch (e) { return 'gradient'; } });
  useEffect(() => { try { localStorage.setItem('home2-membership-bg-mode', membershipBgMode); } catch (e) {} }, [membershipBgMode]);

  const [membershipBgSolidColor, setMembershipBgSolidColor] = useState<string>(() => { try { return localStorage.getItem('home2-membership-bg-solid') ?? '#0f172a'; } catch (e) { return '#0f172a'; } });
  useEffect(() => { try { localStorage.setItem('home2-membership-bg-solid', membershipBgSolidColor); } catch (e) {} }, [membershipBgSolidColor]);

  const [membershipBgGradient, setMembershipBgGradient] = useState<{ from: string; to: string }>(() => { try { const raw = localStorage.getItem('home2-membership-bg-gradient'); return raw ? JSON.parse(raw) : { from: '#0f172a', to: '#111827' }; } catch (e) { return { from: '#0f172a', to: '#111827' }; } });
  useEffect(() => { try { localStorage.setItem('home2-membership-bg-gradient', JSON.stringify(membershipBgGradient)); } catch (e) {} }, [membershipBgGradient]);

  const membershipCarouselRef = useRef<HTMLDivElement | null>(null);

  const filtered = restaurants.filter(r => r.name.toLowerCase().includes(query.toLowerCase()) || r.cuisine.toLowerCase().includes(query.toLowerCase()));
  const featured = Object.values(menuItems).flatMap((items) => items).slice(0, 8);
  const popularRestaurants = restaurants.filter(r => r.featured).slice(0, 8);
  const promoAds = (popularRestaurants.length ? popularRestaurants : restaurants).slice(0, 5).map(r => ({ id: r.id, src: r.image, name: r.name, cuisine: r.cuisine, rating: r.rating, deliveryTime: r.deliveryTime, distance: r.distance, offer: r.offer, description: menuItems[r.id]?.[0]?.description ?? `Popular for ${r.cuisine}` }));
  const [promoIndex, setPromoIndex] = useState(0);
  const [promoHover, setPromoHover] = useState(false);

  const videoList = [
    { src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', poster: '/opengraph.jpg', alt: 'Fresh ingredients' },
    { src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/river.mp4', poster: '/opengraph.jpg', alt: 'Cooking in action' }
  ];

  useEffect(() => {
    if (promoHover) return;
    const t = setInterval(() => setPromoIndex(i => (i + 1) % promoAds.length), 5000);
    return () => clearInterval(t);
  }, [promoHover, promoAds.length]);

  const GOLD_MAP: Record<string, any> = {
    amber: {
      heading: 'text-amber-200',
      subtitle: 'text-amber-100',
      buttonBg: 'bg-amber-400',
      buttonText: 'text-slate-900',
      cardBorder: 'border-amber-300/20',
      cardHeading: 'text-amber-200',
      cardText: 'text-amber-100',
      badgeBg: 'bg-amber-300',
      badgeText: 'text-slate-900',
      smallBadgeBg: 'bg-amber-300',
      linkText: 'text-amber-200'
    },
    yellow: {
      heading: 'text-yellow-200',
      subtitle: 'text-yellow-100',
      buttonBg: 'bg-yellow-400',
      buttonText: 'text-slate-900',
      cardBorder: 'border-yellow-300/20',
      cardHeading: 'text-yellow-200',
      cardText: 'text-yellow-100',
      badgeBg: 'bg-yellow-300',
      badgeText: 'text-slate-900',
      smallBadgeBg: 'bg-yellow-300',
      linkText: 'text-yellow-200'
    },
    orange: {
      heading: 'text-orange-200',
      subtitle: 'text-orange-100',
      buttonBg: 'bg-orange-400',
      buttonText: 'text-slate-900',
      cardBorder: 'border-orange-300/20',
      cardHeading: 'text-orange-200',
      cardText: 'text-orange-100',
      badgeBg: 'bg-orange-300',
      badgeText: 'text-slate-900',
      smallBadgeBg: 'bg-orange-300',
      linkText: 'text-orange-200'
    },
    rose: {
      heading: 'text-rose-200',
      subtitle: 'text-rose-100',
      buttonBg: 'bg-rose-400',
      buttonText: 'text-white',
      cardBorder: 'border-rose-300/20',
      cardHeading: 'text-rose-200',
      cardText: 'text-rose-100',
      badgeBg: 'bg-rose-300',
      badgeText: 'text-white',
      smallBadgeBg: 'bg-rose-300',
      linkText: 'text-rose-200'
    },
    lime: {
      heading: 'text-lime-200',
      subtitle: 'text-lime-100',
      buttonBg: 'bg-lime-400',
      buttonText: 'text-slate-900',
      cardBorder: 'border-lime-300/20',
      cardHeading: 'text-lime-200',
      cardText: 'text-lime-100',
      badgeBg: 'bg-lime-300',
      badgeText: 'text-slate-900',
      smallBadgeBg: 'bg-lime-300',
      linkText: 'text-lime-200'
    },
    gold: {
      heading: 'text-amber-200',
      subtitle: 'text-amber-100',
      buttonBg: 'bg-amber-400',
      buttonText: 'text-slate-900',
      cardBorder: 'border-amber-300/20',
      cardHeading: 'text-amber-200',
      cardText: 'text-amber-100',
      badgeBg: 'bg-amber-300',
      badgeText: 'text-slate-900',
      smallBadgeBg: 'bg-amber-300',
      linkText: 'text-amber-200'
    },
    red: {
      heading: 'text-rose-200',
      subtitle: 'text-rose-100',
      buttonBg: 'bg-rose-400',
      buttonText: 'text-white',
      cardBorder: 'border-rose-300/20',
      cardHeading: 'text-rose-200',
      cardText: 'text-rose-100',
      badgeBg: 'bg-rose-300',
      badgeText: 'text-white',
      smallBadgeBg: 'bg-rose-300',
      linkText: 'text-rose-200'
    },
    blue: {
      heading: 'text-sky-200',
      subtitle: 'text-sky-100',
      buttonBg: 'bg-sky-400',
      buttonText: 'text-white',
      cardBorder: 'border-sky-300/20',
      cardHeading: 'text-sky-200',
      cardText: 'text-sky-100',
      badgeBg: 'bg-sky-300',
      badgeText: 'text-white',
      smallBadgeBg: 'bg-sky-300',
      linkText: 'text-sky-200'
    },
    silver: {
      heading: 'text-slate-200',
      subtitle: 'text-slate-100',
      buttonBg: 'bg-slate-400',
      buttonText: 'text-slate-900',
      cardBorder: 'border-slate-300/20',
      cardHeading: 'text-slate-200',
      cardText: 'text-slate-100',
      badgeBg: 'bg-slate-300',
      badgeText: 'text-slate-900',
      smallBadgeBg: 'bg-slate-300',
      linkText: 'text-slate-200'
    },
    pink: {
      heading: 'text-pink-200',
      subtitle: 'text-pink-100',
      buttonBg: 'bg-pink-400',
      buttonText: 'text-white',
      cardBorder: 'border-pink-300/20',
      cardHeading: 'text-pink-200',
      cardText: 'text-pink-100',
      badgeBg: 'bg-pink-300',
      badgeText: 'text-white',
      smallBadgeBg: 'bg-pink-300',
      linkText: 'text-pink-200'
    }
  };
  const GOLD = GOLD_MAP[goldShade] || GOLD_MAP['amber'];
  const STAR_STROKE = 'rgba(255,255,255,0.22)';

  // membership tier details (copied from Home1: tagline, description, price, features, savings)
  const TIER_INFO: Record<'basic'|'plus'|'premium', { title: string; tagline: string; description: string; price: string; features: string[]; savings: string }> = {
    basic: {
      title: 'Basic',
      tagline: 'Free, basic perks',
      description: 'A great way to try membership — earn points and access occasional offers with no monthly fee.',
      price: 'Free',
      features: [
        'Exclusive offers and limited-time promotions.',
        'Earn reward points on orders.',
        'Access member-only promos and trial perks.'
      ],
      savings: '₹0/mo'
    },
    plus: {
      title: 'Plus',
      tagline: 'Priority offers & small discounts',
      description: 'Popular for regular customers: enjoy priority offers, small discounts, and lower delivery fees.',
      price: '₹199/mo',
      features: [
        '10% off selected restaurants and priority offers.',
        'Free delivery on orders over ₹500 + lower delivery fees.',
        'Priority customer support and early access to offers.'
      ],
      savings: '≈ ₹200/mo'
    },
    premium: {
      title: 'Premium',
      tagline: 'Best value & exclusive deals',
      description: 'Designed for frequent users: site-wide discounts, free delivery, and exclusive perks for maximum savings.',
      price: '₹399/mo',
      features: [
        '15% off site-wide and free delivery on all orders.',
        'Exclusive partner discounts, free delivery & highest priority support.',
        'Premium-only experiences and priority access to new features.'
      ],
      savings: '≈ ₹500/mo'
    }
  };

  // membership background style (solid or gradient)
  const membershipBgStyle = membershipBgMode === 'solid'
    ? { backgroundColor: membershipBgSolidColor }
    : { backgroundImage: `linear-gradient(135deg, ${membershipBgGradient.from}, ${membershipBgGradient.to})` };

  // page color themes (affects the overall page background when in light mode)
  const COLOR_THEMES: Record<string, string> = {
    gold: 'bg-gradient-to-br from-amber-50 via-background to-yellow-50',
    red: 'bg-gradient-to-br from-red-50 via-background to-rose-50',
    blue: 'bg-gradient-to-br from-blue-50 via-background to-sky-50',
    silver: 'bg-gradient-to-br from-slate-50 via-background to-slate-200',
    pink: 'bg-gradient-to-br from-pink-50 via-background to-rose-50'
  };
  const THEME_COLORS: Record<string, { sectionBg: string; sectionText: string; cardBg: string; cardText: string; heading: string }> = {
    gold: { sectionBg: 'linear-gradient(135deg, rgba(255,247,237,0.92), rgba(255,244,228,0.92))', sectionText: '#92400e', cardBg: 'rgba(255,255,255,0.95)', cardText: '#111827', heading: '#92400e' },
    red: { sectionBg: 'linear-gradient(135deg, rgba(255,240,242,0.92), rgba(255,234,246,0.92))', sectionText: '#7f1d1d', cardBg: 'rgba(255,255,255,0.95)', cardText: '#111827', heading: '#b91c1c' },
    blue: { sectionBg: 'linear-gradient(135deg, rgba(239,246,255,0.92), rgba(235,249,255,0.92))', sectionText: '#0f172a', cardBg: 'rgba(255,255,255,0.95)', cardText: '#0f172a', heading: '#0369a1' },
    silver: { sectionBg: 'linear-gradient(135deg, rgba(247,250,252,0.96), rgba(241,245,249,0.96))', sectionText: '#111827', cardBg: 'rgba(255,255,255,0.95)', cardText: '#111827', heading: '#0f172a' },
    pink: { sectionBg: 'linear-gradient(135deg, rgba(255,245,250,0.92), rgba(255,238,245,0.92))', sectionText: '#831843', cardBg: 'rgba(255,255,255,0.95)', cardText: '#111827', heading: '#be185d' }
  };
  const [colorTheme, setColorTheme] = useState<'gold'|'red'|'blue'|'silver'|'pink'>(() => { try { return (localStorage.getItem('home2-color-theme') as 'gold'|'red'|'blue'|'silver'|'pink') ?? 'gold'; } catch (e) { return 'gold'; } });
  useEffect(() => { try { localStorage.setItem('home2-color-theme', colorTheme); } catch (e) {} if ((GOLD_MAP as any)[colorTheme]) { setGoldShade(colorTheme as any); } }, [colorTheme]);

  // section tone controls (light | dark) - affects whether sections use light or dark palettes
  const [sectionTone, setSectionTone] = useState<'light'|'dark'>(() => { try { return (localStorage.getItem('home2-section-tone') as 'light'|'dark') ?? 'light'; } catch (e) { return 'light'; } });
  useEffect(() => { try { localStorage.setItem('home2-section-tone', sectionTone); } catch (e) {} }, [sectionTone]);

  const { toast } = useToast();

  // reset theme to defaults (color + section tone + accent)
  const resetTheme = () => {
    const ok = window.confirm('Reset theme to defaults (color: Gold, section tone: Light)?');
    if (!ok) return;
    try {
      // ensure page is in light mode so theme is visible
      setPageTheme('light');
      setColorTheme('gold');
      setSectionTone('light');
      setGoldShade('gold');
      // persist defaults
      localStorage.setItem('home2-color-theme', 'gold');
      localStorage.setItem('home2-section-tone', 'light');
      localStorage.setItem('home2-gold-shade', 'gold');
      toast({ title: 'Theme reset', description: 'Restored color theme to Gold and section tone to Light.' });
    } catch (e) { toast({ title: 'Reset failed', description: 'Could not reset theme.' }); }
  };

  const BG_SOLID_PRESETS = ['#0f172a', '#111827', '#f59e0b', '#fb923c', '#ec4899', '#7c3aed'];
  const BG_GRADIENT_PRESETS = [
    { from: '#0f172a', to: '#111827' },
    { from: '#1f2937', to: '#111827' },
    { from: '#f59e0b', to: '#fb923c' },
    { from: '#fb7185', to: '#fb923c' },
    { from: '#a78bfa', to: '#f472b6' }
  ];

  const scrollLeft = () => {
    const el = membershipCarouselRef.current;
    if (!el) return;
    el.scrollBy({ left: -280, behavior: 'smooth' });
  };
  const scrollRight = () => {
    const el = membershipCarouselRef.current;
    if (!el) return;
    el.scrollBy({ left: 280, behavior: 'smooth' });
  };

  const [showScrollHint, setShowScrollHint] = useState(false);
  useEffect(() => {
    const el = membershipCarouselRef.current;
    if (!el) return;
    const check = () => {
      const hasOverflow = el.scrollWidth > el.clientWidth + 2;
      const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      setShowScrollHint(hasOverflow && !atRight);
    };
    check();
    el.addEventListener('scroll', check);
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [restaurants.length]);

  // simple settings panel state
  const [showOptions, setShowOptions] = useState(false);

  // All Restaurants subtitle (persisted)
  const [allRestaurantsSubtitle, setAllRestaurantsSubtitle] = useState<string>(() => { try { return localStorage.getItem('home2-all-restaurants-subtitle') ?? 'Browse all listings near you'; } catch (e) { return 'Browse all listings near you'; } });
  useEffect(() => { try { localStorage.setItem('home2-all-restaurants-subtitle', allRestaurantsSubtitle); } catch (e) {} }, [allRestaurantsSubtitle]);

  // icon style (emoji|svg|image|lucide)
  const [iconStyle, setIconStyle] = useState<'emoji'|'svg'|'image'|'lucide'>(() => { try { return (localStorage.getItem('home2-icon-style') as 'emoji'|'svg'|'image'|'lucide') ?? 'emoji'; } catch (e) { return 'emoji'; } });
  useEffect(() => { try { localStorage.setItem('home2-icon-style', iconStyle); } catch (e) {} }, [iconStyle]);

  // helper to render category icon based on selected icon style (emoji|svg|image|lucide)
  const renderCategoryIcon = (c: { id: string; name: string; icon: string }) => {
    const CATEGORY_COLOR: Record<string, string> = {
      pizza: 'text-rose-500',
      burger: 'text-amber-600',
      sushi: 'text-emerald-500',
      chinese: 'text-orange-500',
      indian: 'text-red-500',
      mexican: 'text-yellow-500',
      dessert: 'text-pink-500',
      healthy: 'text-green-600'
    };
    const colorClass = CATEGORY_COLOR[c.id] ?? 'text-foreground';

    if (iconStyle === 'image') {
      // prefer a restaurant matching the category; fall back to the first restaurant image or a generic image
      const r = restaurants.find(r => r.cuisine.toLowerCase().includes(c.id)) || restaurants[0];
      const src = r?.image ? r.image.replace('w=400&h=300', 'w=120&h=90') : '/opengraph.jpg';
      return (
        <div className="w-8 h-8 rounded-md overflow-hidden bg-white/5 flex items-center justify-center">
          <img src={src} alt={c.name} className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/opengraph.jpg'; }} />
        </div>
      );
    }

    if (iconStyle === 'lucide') {
      const CANDIDATES: Record<string, string[]> = {
        pizza: ['Pizza','Pie'],
        burger: ['Hamburger','Burger'],
        sushi: ['Sushi','Fish'],
        chinese: ['Rice','Bowl'],
        indian: ['Coffee','Tea'],
        mexican: ['Taco','Corn'],
        dessert: ['IceCream','Cake'],
        healthy: ['Leaf','Seedling']
      };
      const candidates = CANDIDATES[c.id] ?? [c.name];
      for (const name of candidates) {
        const IconComp = (LucideIcons as any)[name];
        if (IconComp) return <IconComp className={`w-5 h-5 ${colorClass}`} />;
      }

      // fall back to emoji if nothing found
      return <span className="text-sm">{c.icon}</span>;
    }

    if (iconStyle === 'svg') {
      // SVG sprite or inline icons could be used; fall back to emoji for now
      return <span className="text-sm">{c.icon}</span>;
    }

    // default: emoji
    return <span className="text-sm">{c.icon}</span>;
  };

  // filters style (persisted)
  const [filterStyle, setFilterStyle] = useState<'solid'|'glass'|'accent'>(() => { try { return (localStorage.getItem('home2-filter-style') as 'solid'|'glass'|'accent') ?? 'glass'; } catch (e) { return 'glass'; } });
  useEffect(() => { try { localStorage.setItem('home2-filter-style', filterStyle); } catch (e) {} }, [filterStyle]);

  // draggable settings menu position (persisted)
  const dragRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const dragOriginRef = useRef({ x: 0, y: 0, left: 0, top: 0 });
  const [menuPos, setMenuPos] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('home2-settings-menu-pos');
      if (saved) { setMenuPos(JSON.parse(saved)); return; }
    } catch (e) {}
    const defaultLeft = Math.max(window.innerWidth - 96, 24);
    const defaultTop = Math.round(window.innerHeight / 2 - 48);
    setMenuPos({ left: defaultLeft, top: defaultTop });
  }, []);

  useEffect(() => { if (!menuPos) return; try { localStorage.setItem('home2-settings-menu-pos', JSON.stringify(menuPos)); } catch (e) {} }, [menuPos]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const deltaX = e.clientX - dragOriginRef.current.x;
      const deltaY = e.clientY - dragOriginRef.current.y;
      setMenuPos({ left: Math.min(Math.max(8, dragOriginRef.current.left + deltaX), window.innerWidth - 160), top: Math.min(Math.max(8, dragOriginRef.current.top + deltaY), window.innerHeight - 96) });
    };
    const onUp = () => { draggingRef.current = false; document.body.style.userSelect = ''; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  // Close floating settings when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutside = (e: PointerEvent) => {
      if (!showOptions) return;
      if (draggingRef.current) return; // don't close while dragging
      const el = dragRef.current;
      if (!el) return;
      if (!(e.target instanceof Node)) return;
      if (!el.contains(e.target as Node)) setShowOptions(false);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowOptions(false);
    };

    document.addEventListener('pointerdown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('pointerdown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [showOptions]);

  const handleDragStart = (e: React.MouseEvent) => {
    draggingRef.current = true;
    dragOriginRef.current = { x: e.clientX, y: e.clientY, left: menuPos?.left ?? 0, top: menuPos?.top ?? 0 };
    document.body.style.userSelect = 'none';
  };

  const [location, setLocation] = useLocation();

  return (
    <div data-theme={pageTheme === 'dark' ? undefined : colorTheme} data-section-tone={pageTheme === 'dark' ? 'dark' : sectionTone} className={`min-h-screen flex flex-col ${pageTheme === 'dark' ? 'bg-slate-900 text-white' : ''}`}>
      <Header />

      <main className="flex-1">
        {/* Video slider inserted on top with headline & CTAs */}
        <VideoSlider
          videos={videoList}
          className="mb-6"
          title="India's #1 food delivery app"
          subtitle="Experience fast & easy online ordering on the FoodDash app"
          ctas={[{ label: 'Get it on Google Play', href: 'https://play.google.com', primary: true }, { label: 'Download on the App Store', href: 'https://www.apple.com/app-store/' } ]}
          scrollTarget="#hero"
        />

        {/* Hero (layout varies: A=centered, B=split, C=compact) */}
        <section id="hero" className="relative py-16" style={pageTheme === 'dark' ? undefined : { background: 'var(--section-bg)', color: 'var(--section-text)' }}>
          <div className="max-w-[78rem] mx-auto px-4">
            {heroLayout === 'A' && (
              <div className={`relative text-center rounded-3xl p-8 backdrop-blur-sm shadow-md`} style={pageTheme === 'dark' ? undefined : { background: 'var(--section-bg)', color: 'var(--section-text)' }}>
                {/* Accent bar */}
                <div className="absolute left-6 top-6 h-12 w-1 rounded-full bg-primary/90" aria-hidden="true" />

                <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold" style={pageTheme === 'dark' ? undefined : { color: 'var(--heading)' }}>Find food you love</motion.h1>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 text-muted-foreground">Search restaurants, dishes or cuisines nearby</motion.p>

                <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ delay: 0.15 }} className="mt-8 flex items-center gap-3 justify-center">
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for pizza, burgers, sushi..." className="w-full max-w-3xl px-6 py-4 rounded-full border border-border/20 shadow-lg focus:ring-2 focus:ring-primary" />
                  <button className="px-6 py-3 rounded-full bg-primary text-white">Search</button>
                </motion.div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {categories.map(c => (
                    <button key={c.id} className="px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary inline-flex items-center gap-2">{renderCategoryIcon(c)} <span className="sr-only">{c.name}</span><span className="hidden sm:inline">{c.name}</span></button>
                  ))}
                </div>
              </div>
            )}

            {heroLayout === 'B' && (
              <div className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-3xl p-6 backdrop-blur-sm shadow-md`} style={pageTheme === 'dark' ? undefined : { background: 'var(--section-bg)', color: 'var(--section-text)' }}>
                {/* Accent bar */}
                <div className="absolute left-6 top-6 h-12 w-1 rounded-full bg-primary/90" aria-hidden="true" />

                <div>
                  <motion.h1 initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-extrabold">Find food you love</motion.h1>
                  <p className="mt-3 text-muted-foreground">Search restaurants, dishes or cuisines nearby</p>

                  <div className="mt-6">
                    <div className="flex items-center gap-3">
                      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search restaurants, cuisines, or dishes..." className="w-full px-4 py-3 rounded-full border border-border/20 shadow-sm focus:ring-2 focus:ring-primary" />
                      <button className="px-4 py-3 rounded-full bg-primary text-white">Search</button>
                    </div>

                    <div className="mt-4 flex gap-3 flex-wrap">
                      {categories.map(c => (
                        <button key={c.id} className="px-3 py-1 rounded-full bg-primary/10 text-primary inline-flex items-center gap-2">{renderCategoryIcon(c)} <span className="sr-only">{c.name}</span><span className="hidden md:inline">{c.name}</span></button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`rounded-2xl p-2 shadow-md`} style={pageTheme === 'dark' ? undefined : { background: 'var(--section-bg)', color: 'var(--section-text)' }}>
                    <div className="grid grid-cols-1 gap-4 items-center">
                      <div className="h-44 rounded-lg overflow-hidden">
                        <motion.img
                          key={promoAds[promoIndex]?.src ?? promoIndex}
                          src={promoAds[promoIndex]?.src ?? '/opengraph.jpg'}
                          alt={promoAds[promoIndex]?.name ?? 'Promotional banner'}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex items-center gap-3 justify-between">
                        <div className="text-sm text-muted-foreground"><span className="font-semibold">{promoAds[promoIndex]?.name}</span> • {promoAds[promoIndex]?.cuisine}</div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setPromoIndex(i => (i - 1 + promoAds.length) % promoAds.length)} aria-label="Previous promo" className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white shadow">
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button onClick={() => setPromoIndex(i => (i + 1) % promoAds.length)} aria-label="Next promo" className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white shadow">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {heroLayout === 'C' && (
              <div className={`relative text-left rounded-3xl p-6 backdrop-blur-sm shadow-md`} style={pageTheme === 'dark' ? undefined : { background: 'var(--section-bg)', color: 'var(--section-text)' }}>
                {/* Accent bar */}
                <div className="absolute left-6 top-6 h-12 w-1 rounded-full bg-primary/90" aria-hidden="true" />

                <motion.h1 initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl font-extrabold">Find food you love</motion.h1>
                <div className="mt-4 flex items-center gap-3">
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search restaurants, dishes or cuisines..." className="w-full max-w-xl px-4 py-3 rounded-full border border-border/20 shadow-sm focus:ring-2 focus:ring-primary" />
                  <button className="px-4 py-3 rounded-full bg-primary text-white">Search</button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Membership carousel (horizontal, shows 4 cards) */}
        {membershipEnabled && (
          <section className="mb-10" style={pageTheme === 'dark' ? undefined : { background: 'var(--section-bg)', color: 'var(--section-text)' }}>
            <div style={membershipBgStyle} className="max-w-[76rem] mx-auto rounded-4xl pt-6 pb-8 px-4 sm:px-6 lg:px-8 shadow-2xl border-2 border-amber-300/10">
              <div className="flex items-center justify-between mb-6">
<div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="rounded-full bg-amber-300/20 p-2 flex items-center justify-center"><svg className="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6"/><path d="M5 7h14"/><path d="M12 9v13"/></svg></div>
                  <div>
                    <h3 className={`text-2xl md:text-3xl font-extrabold ${GOLD.heading}`} style={pageTheme === 'dark' ? undefined : { color: 'var(--heading)' }}>Membership & Featured Restaurants <span className={`ml-3 inline-flex items-center text-xs px-3 py-0.5 rounded-full ${GOLD.badgeBg} ${GOLD.badgeText}`}>{membershipTier}</span></h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={scrollLeft} aria-label="Scroll left" className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white shadow-lg">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={scrollRight} aria-label="Scroll right" className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white shadow-lg">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={`rounded-2xl p-4 ${GOLD.cardBorder}`} style={pageTheme === 'dark' ? undefined : { background: 'var(--card-bg)', color: 'var(--card-text)' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-semibold ${GOLD.cardHeading}`} style={pageTheme === 'dark' ? undefined : { color: 'var(--heading)' }}>{TIER_INFO[membershipTier].title}</h4>
                      <div className={`text-sm ${GOLD.cardText} mt-1`} style={pageTheme === 'dark' ? undefined : { color: 'var(--section-text)' }}>{TIER_INFO[membershipTier].tagline}</div>
                      <p className={`text-xs ${GOLD.cardText} mt-2`} style={pageTheme === 'dark' ? undefined : { color: 'var(--section-text)' }}>{TIER_INFO[membershipTier].description}</p>
                    </div>
                    <div className={`text-sm font-semibold ${GOLD.cardHeading}`} style={pageTheme === 'dark' ? undefined : { color: 'var(--heading)' }}>{TIER_INFO[membershipTier].price}</div>
                  </div>

                  <ul className={`mt-3 text-sm space-y-2 ${GOLD.cardText}`}>
                    {TIER_INFO[membershipTier].features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2"><svg className="w-4 h-4 mt-0.5 text-amber-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418L9 15.18 5.129 11.31A1 1 0 0 0 3.715 12.726l4.586 4.586a1 1 0 0 0 1.414 0l9.57-9.603z"/></svg><span>{f}</span></li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center gap-2">
                    <button onClick={() => setMembershipTier('basic')} className={`px-3 py-1 rounded-md text-sm ${membershipTier === 'basic' ? `${GOLD.badgeBg} ${GOLD.buttonText}` : 'bg-transparent border border-white/10 text-amber-100'}`}>Basic</button>
                    <button onClick={() => setMembershipTier('plus')} className={`px-3 py-1 rounded-md text-sm ${membershipTier === 'plus' ? `${GOLD.badgeBg} ${GOLD.buttonText}` : 'bg-transparent border border-white/10 text-amber-100'}`}>Plus</button>
                    <button onClick={() => setMembershipTier('premium')} className={`px-3 py-1 rounded-md text-sm ${membershipTier === 'premium' ? `${GOLD.badgeBg} ${GOLD.buttonText}` : 'bg-transparent border border-white/10 text-amber-100'}`}>Premium</button>
                  </div>
                </div>

                <div className="lg:col-span-2 relative">
                  <div ref={membershipCarouselRef} className="flex gap-6 overflow-x-auto py-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-amber-400/40">
                {restaurants.map((r, idx) => (
                  <div key={r.id} className="min-w-[260px] md:min-w-[300px] lg:min-w-[340px] snap-center rounded-3xl p-4 border border-amber-300/10 shadow-lg transform transition-all hover:scale-102 hover:shadow-2xl" style={pageTheme === 'dark' ? undefined : { background: 'rgba(255,255,255,0.08)', color: 'var(--section-text)' }}>
                    <div className="relative">
                      <div className="absolute -top-3 left-3 bg-amber-300 text-slate-900 text-xs px-2 py-0.5 rounded-full font-semibold shadow">Featured</div>
                      <div className="h-36 md:h-40 rounded-xl overflow-hidden mb-3">
                        <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-amber-100 text-lg truncate">{r.name}</h4>
                        <div className="text-sm text-amber-200">{r.distance}</div>
                      </div>

                      <div className="text-sm text-amber-100 truncate">{r.cuisine}</div>
                      <div className="mt-1 text-sm text-muted-foreground truncate mb-3">{menuItems[r.id]?.[0]?.description ?? `Popular for ${r.cuisine}`}</div>

                      <div className="flex items-center gap-3 justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center text-sm px-3 py-1 rounded-full ${GOLD.badgeBg} ${GOLD.badgeText}`}><span className="mr-2 font-semibold">{r.rating}</span><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" stroke={STAR_STROKE} strokeWidth={0.6} strokeLinejoin="round" strokeLinecap="round" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
                          <span className={`inline-flex items-center text-sm px-3 py-1 rounded-full bg-white/10 ${GOLD.cardText}`}>{r.deliveryTime}</span>
                        </div>

                        <button className="px-3 py-2 rounded-full bg-primary text-white text-sm shadow">View</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

                  <button onClick={scrollRight} aria-label="Scroll membership list" title="Scroll membership list" className={`absolute right-3 bottom-3 flex items-center gap-1 px-2 py-1 bg-black/20 rounded-full text-xs text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-300 ${showScrollHint ? 'chevron-bounce' : ''}`}>
                    <ChevronDown className="w-3 h-3 text-amber-200" />
                  </button>

                  <div className="mt-2 text-xs text-amber-200">Showing 4 of {restaurants.length} — scroll to see more</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Featured dishes & restaurants */}
        <section className="py-8" style={pageTheme === 'dark' ? undefined : { background: 'var(--section-bg)', color: 'var(--section-text)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold mb-4" style={pageTheme === 'dark' ? undefined : { color: 'var(--heading)' }}>Featured Dishes</h3>
            <div className="flex gap-4 overflow-x-auto py-2 -mx-4 px-4">
              {featured.map(d => (
                <div key={d.id} className={`min-w-[200px] w-56 rounded-2xl shadow p-3 flex-shrink-0`} style={pageTheme === 'dark' ? undefined : { background: 'var(--card-bg)', color: 'var(--card-text)' }}>
                  <div className="h-32 rounded-lg overflow-hidden">
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                  </div>

                  <h4 className="mt-2 font-semibold text-sm" style={pageTheme === 'dark' ? undefined : { color: 'var(--section-text)' }}>{d.name}</h4>
                  <div className="mt-1 text-xs text-muted-foreground" style={pageTheme === 'dark' ? undefined : { color: 'var(--section-text)' }}>{d.category}</div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="font-semibold" style={pageTheme === 'dark' ? undefined : { color: 'var(--section-text)' }}>₹{d.price}</div>
                    <button className="px-3 py-2 bg-primary text-white rounded-md text-xs">Add</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-semibold ${pageTheme === 'dark' ? 'text-white' : ''}`} style={pageTheme === 'dark' ? undefined : { color: 'var(--heading)' }}>Popular Restaurants</h3>
                <Link href="/restaurants"><a className="text-sm text-primary hover:underline">Explore</a></Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {popularRestaurants.map((r, i) => (
                  <RestaurantCard key={r.id} restaurant={r} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <CartSidebar />
      <Footer theme={pageTheme} />

      {/* Floating options (compact) */}
      <div ref={dragRef} style={menuPos ? { position: 'fixed', left: menuPos.left, top: menuPos.top } : undefined} className="z-50">
        <div className="flex flex-col items-end gap-3">
          <button
            onMouseDown={handleDragStart}
            onClick={() => setShowOptions(s => !s)}
            aria-expanded={showOptions}
            aria-label="Toggle settings"
            className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg"
          >
            <Sliders className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {showOptions && (
              <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="w-60 flex flex-col items-start gap-3 max-h-[70vh] overflow-auto bg-white/95 dark:bg-slate-800/95 text-foreground rounded-xl p-3 shadow-2xl border border-border/40 z-[60]"
            style={{ minWidth: 240 }}>
            {/* Group: Page Variant (two-column badges) */}
            <div className="w-full bg-white/5 rounded-md p-2 shadow-sm">
              <div className="text-xs text-muted-foreground mb-2">Page Variant</div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setLocation('/')} aria-pressed={location === '/'} className={`px-3 py-1 rounded-full text-sm inline-flex items-center gap-2 justify-center ${location === '/' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`}><HomeIcon className="w-4 h-4"/> Home</button>
                <button onClick={() => setLocation('/home1')} aria-pressed={location === '/home1'} className={`px-3 py-1 rounded-full text-sm inline-flex items-center gap-2 justify-center ${location === '/home1' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`}><HomeIcon className="w-4 h-4"/> Home1</button>
                <button onClick={() => setLocation('/home2')} aria-pressed={location === '/home2'} className={`px-3 py-1 rounded-full text-sm inline-flex items-center gap-2 justify-center ${location === '/home2' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`}><HomeIcon className="w-4 h-4"/> Home2</button>
                <button onClick={() => setLocation('/home3')} aria-pressed={location === '/home3'} className={`px-3 py-1 rounded-full text-sm inline-flex items-center gap-2 justify-center ${location === '/home3' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`}><HomeIcon className="w-4 h-4"/> Home3</button>
              </div>
            </div>

            {/* Group: Headings */}
            <div className="w-full bg-white/95 dark:bg-slate-800/95 text-foreground rounded-md p-2 shadow-2xl border border-border/40">
              <div className="text-xs text-foreground mb-2">Headings</div>
              <label className="text-xs text-muted-foreground mb-1 block">All Restaurants subtitle</label>
              <input
                value={allRestaurantsSubtitle}
                onChange={(e) => setAllRestaurantsSubtitle(e.target.value)}
                placeholder="Browse all listings near you"
                className="w-full px-2 py-2 rounded-md bg-white/5 dark:bg-slate-700/60 text-sm"
                aria-label="All Restaurants subtitle"
              />
            </div>

            {/* Group: Icon style */}
            <div className="w-full bg-white/95 dark:bg-slate-800/95 text-foreground rounded-md p-2 shadow-2xl border border-border/40">
              <div className="text-xs text-foreground mb-2">Icon style</div>
              <div className="grid grid-cols-4 gap-2 mb-1">
                <button onClick={() => setIconStyle('emoji')} aria-pressed={iconStyle === 'emoji'} className={`px-2 py-1 rounded-full text-sm inline-flex items-center justify-center ${iconStyle === 'emoji' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`} title="Emoji">😊</button>
                <button onClick={() => setIconStyle('svg')} aria-pressed={iconStyle === 'svg'} className={`px-2 py-1 rounded-full text-sm inline-flex items-center justify-center ${iconStyle === 'svg' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`} title="SVG">🔷</button>
                <button onClick={() => setIconStyle('lucide')} aria-pressed={iconStyle === 'lucide'} className={`px-2 py-1 rounded-full text-sm inline-flex items-center justify-center ${iconStyle === 'lucide' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`} title="Lucide">LU</button>
                <button onClick={() => setIconStyle('image')} aria-pressed={iconStyle === 'image'} className={`px-2 py-1 rounded-full text-sm inline-flex items-center justify-center ${iconStyle === 'image' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`} title="Image">🖼️</button>
              </div>
            </div>

            {/* Group: Theme (two-column badges) */}
            <div className="w-full bg-white/95 dark:bg-slate-800/95 text-foreground rounded-md p-2 shadow-2xl border border-border/40">
              <div className="text-xs text-foreground mb-2">Theme</div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setPageTheme('light')} aria-pressed={pageTheme === 'light'} className={`px-3 py-1 rounded-full text-sm inline-flex items-center gap-2 justify-center ${pageTheme === 'light' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`}><Sun className="w-4 h-4"/> Light</button>
                <button onClick={() => setPageTheme('dark')} aria-pressed={pageTheme === 'dark'} className={`px-3 py-1 rounded-full text-sm inline-flex items-center gap-2 justify-center ${pageTheme === 'dark' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`}><Moon className="w-4 h-4"/> Dark</button>
              </div>
            </div>

            <div className="w-full bg-white/95 dark:bg-slate-800/95 text-foreground rounded-md p-2 shadow-2xl border border-border/40 mt-2">
              <div className="text-xs text-foreground mb-2">Color theme</div>
              <div className="grid grid-cols-5 gap-2">
                <button onClick={() => setColorTheme('gold')} aria-pressed={colorTheme === 'gold'} className={`px-2 py-1 rounded-full text-sm inline-flex items-center justify-center ${colorTheme === 'gold' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`} title="Gold"><span className="w-4 h-4 rounded-full bg-amber-400" /></button>
                <button onClick={() => setColorTheme('red')} aria-pressed={colorTheme === 'red'} className={`px-2 py-1 rounded-full text-sm inline-flex items-center justify-center ${colorTheme === 'red' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`} title="Red"><span className="w-4 h-4 rounded-full bg-rose-400" /></button>
                <button onClick={() => setColorTheme('blue')} aria-pressed={colorTheme === 'blue'} className={`px-2 py-1 rounded-full text-sm inline-flex items-center justify-center ${colorTheme === 'blue' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`} title="Blue"><span className="w-4 h-4 rounded-full bg-sky-400" /></button>
                <button onClick={() => setColorTheme('silver')} aria-pressed={colorTheme === 'silver'} className={`px-2 py-1 rounded-full text-sm inline-flex items-center justify-center ${colorTheme === 'silver' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`} title="Silver"><span className="w-4 h-4 rounded-full bg-slate-400" /></button>
                <button onClick={() => setColorTheme('pink')} aria-pressed={colorTheme === 'pink'} className={`px-2 py-1 rounded-full text-sm inline-flex items-center justify-center ${colorTheme === 'pink' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`} title="Pink"><span className="w-4 h-4 rounded-full bg-pink-400" /></button>
              </div>

              <div className="mt-3 text-xs text-foreground mb-2">Section tone</div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setSectionTone('light')} aria-pressed={sectionTone === 'light'} className={`px-3 py-1 rounded-full text-sm inline-flex items-center justify-center ${sectionTone === 'light' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`}>Light</button>
                <button onClick={() => setSectionTone('dark')} aria-pressed={sectionTone === 'dark'} className={`px-3 py-1 rounded-full text-sm inline-flex items-center justify-center ${sectionTone === 'dark' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`}>Dark</button>
              </div>

              <div className="mt-3">
                <button onClick={resetTheme} className="w-full px-3 py-2 rounded-md bg-white/5 dark:bg-slate-700/60 text-sm hover:bg-white/10">Reset theme</button>
              </div>
            </div>

            {/* Group: Layout (two-column badges) */}
            <div className="w-full bg-white/95 dark:bg-slate-800/95 text-foreground rounded-md p-2 shadow-2xl border border-border/40">
              <div className="text-xs text-foreground mb-2">Layout</div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setLayoutMode('grid')} aria-pressed={layoutMode === 'grid'} className={`px-3 py-1 rounded-full text-sm inline-flex items-center gap-2 justify-center ${layoutMode === 'grid' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`}><LayoutGrid className="w-4 h-4"/> Grid</button>
                <button onClick={() => setLayoutMode('list')} aria-pressed={layoutMode === 'list'} className={`px-3 py-1 rounded-full text-sm inline-flex items-center gap-2 justify-center ${layoutMode === 'list' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`}><List className="w-4 h-4"/> List</button>
              </div>
            </div>

            {/* Group: Membership */}
            <div className="w-full bg-white/95 dark:bg-slate-800/95 text-foreground rounded-md p-2 shadow-2xl border border-border/40">
              <div className="text-xs text-foreground mb-2">Membership</div>
              <label className="flex items-center gap-2 text-xs mb-2">
                <input type="checkbox" checked={membershipEnabled} onChange={(e) => setMembershipEnabled(e.target.checked)} className="h-3 w-3" />
                <span className="text-xs">Show membership section</span>
              </label>

              <div className="text-xs text-muted-foreground mb-2">Default tier</div>
              <div className="flex gap-2">
                <button onClick={() => setMembershipTier('basic')} className={`px-2 py-0.5 rounded-sm text-xs ${membershipTier === 'basic' ? 'bg-primary/10 text-primary' : 'bg-white/5 dark:bg-slate-700/60'}`}>Basic</button>
                <button onClick={() => setMembershipTier('plus')} className={`px-2 py-0.5 rounded-sm text-xs ${membershipTier === 'plus' ? 'bg-primary/10 text-primary' : 'bg-white/5 dark:bg-slate-700/60'}`}>Plus</button>
                <button onClick={() => setMembershipTier('premium')} className={`px-2 py-0.5 rounded-sm text-xs ${membershipTier === 'premium' ? 'bg-primary/10 text-primary' : 'bg-white/5 dark:bg-slate-700/60'}`}>Premium</button>
              </div>

              <div className="mt-3 text-xs text-muted-foreground mb-2">Gold shade</div>
              <div className="grid grid-cols-5 gap-2 mb-1">
                <button onClick={() => setGoldShade('amber')} aria-pressed={goldShade === 'amber'} className={`px-1.5 py-0.5 rounded-full inline-flex items-center justify-center ${goldShade === 'amber' ? 'ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60'}`} title="Amber"><span className="w-3.5 h-3.5 rounded-full bg-amber-400"/></button>
                <button onClick={() => setGoldShade('yellow')} aria-pressed={goldShade === 'yellow'} className={`px-1.5 py-0.5 rounded-full inline-flex items-center justify-center ${goldShade === 'yellow' ? 'ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60'}`} title="Yellow"><span className="w-3.5 h-3.5 rounded-full bg-yellow-400"/></button>
                <button onClick={() => setGoldShade('orange')} aria-pressed={goldShade === 'orange'} className={`px-1.5 py-0.5 rounded-full inline-flex items-center justify-center ${goldShade === 'orange' ? 'ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60'}`} title="Orange"><span className="w-3.5 h-3.5 rounded-full bg-orange-400"/></button>
                <button onClick={() => setGoldShade('rose')} aria-pressed={goldShade === 'rose'} className={`px-1.5 py-0.5 rounded-full inline-flex items-center justify-center ${goldShade === 'rose' ? 'ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60'}`} title="Rose"><span className="w-3.5 h-3.5 rounded-full bg-rose-400"/></button>
                <button onClick={() => setGoldShade('lime')} aria-pressed={goldShade === 'lime'} className={`px-1.5 py-0.5 rounded-full inline-flex items-center justify-center ${goldShade === 'lime' ? 'ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60'}`} title="Lime"><span className="w-3.5 h-3.5 rounded-full bg-lime-400"/></button>
              </div>

              <div className="mt-3 text-xs text-muted-foreground mb-2">Membership background</div>
              <div className="flex gap-2 mb-2">
                <button onClick={() => setMembershipBgMode('solid')} aria-pressed={membershipBgMode === 'solid'} className={`px-3 py-1 rounded-full text-sm ${membershipBgMode === 'solid' ? 'bg-primary/10 text-primary ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground'}`}>Solid</button>
                <button onClick={() => setMembershipBgMode('gradient')} aria-pressed={membershipBgMode === 'gradient'} className={`px-3 py-1 rounded-full text-sm ${membershipBgMode === 'gradient' ? 'bg-primary/10 text-primary ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground'}`}>Gradient</button>
              </div>

              {membershipBgMode === 'solid' ? (
                <div className="flex gap-2 mb-2">
                  {BG_SOLID_PRESETS.map(c => (
                    <button key={c} onClick={() => setMembershipBgSolidColor(c)} style={{ background: c }} className={`w-7 h-7 rounded-full border ${membershipBgSolidColor === c ? 'ring-1 ring-primary/30' : ''}`} aria-label={`Set membership bg ${c}`} />
                  ))}
                </div>
              ) : (
                <div className="flex gap-2 mb-2">
                  {BG_GRADIENT_PRESETS.map(g => (
                    <button key={g.from + g.to} onClick={() => setMembershipBgGradient(g)} style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }} className={`w-7 h-7 rounded-full border ${membershipBgGradient.from === g.from && membershipBgGradient.to === g.to ? 'ring-1 ring-primary/30' : ''}`} aria-label={`Set membership gradient ${g.from} to ${g.to}`} title={`Gradient ${g.from} → ${g.to}`}></button>
                  ))}
                </div>
              )}
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </div>
  );
}

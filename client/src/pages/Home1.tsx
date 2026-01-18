import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { restaurants, categories, menuItems, useCart } from '@/lib/store';
import { RestaurantCard } from '@/components/RestaurantCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Sliders, X, Sun, Moon, LayoutGrid, List, ChevronLeft, ChevronRight, ChevronDown, Home as HomeIcon, Star } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export default function Home1() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [filterStyle, setFilterStyle] = useState<'solid'|'glass'|'accent'>('glass');

  // page-level style controls
  const [pageTheme, setPageTheme] = useState<'light'|'dark'>('light');
  const [layoutMode, setLayoutMode] = useState<'grid'|'list'>('grid');
  const [location, setLocation] = useLocation();

  const filterContainerClasses = (filterStyle === 'solid'
    ? (pageTheme === 'dark' ? 'relative bg-slate-800 text-white shadow-xl border border-slate-700/40 rounded-3xl p-6 space-y-4' : 'relative bg-white text-foreground shadow-xl border border-border/40 rounded-3xl p-6 space-y-4')
    : filterStyle === 'glass'
    ? (pageTheme === 'dark' ? 'relative bg-slate-800/40 backdrop-blur-md ring-1 ring-primary/20 shadow-lg rounded-3xl p-4 space-y-4 overflow-hidden' : 'relative bg-white/8 backdrop-blur-md ring-1 ring-primary/20 shadow-lg rounded-3xl p-4 space-y-4 overflow-hidden')
    : (pageTheme === 'dark' ? 'relative bg-slate-800/30 border border-slate-700/20 rounded-3xl p-4 space-y-4 shadow-lg overflow-hidden' : 'relative bg-white/6 border border-border/20 rounded-3xl p-4 space-y-4 shadow-lg overflow-hidden'));

  const showStripe = filterStyle !== 'solid';
  const stripeWidthClass = filterStyle === 'accent' ? 'w-2' : 'w-1';

  const [showOptions, setShowOptions] = useState(false);

  // editable All Restaurants subtitle (persisted)
  const [allRestaurantsSubtitle, setAllRestaurantsSubtitle] = useState<string>(() => {
    try {
      return localStorage.getItem('home1-all-restaurants-subtitle') ?? 'Browse all listings near you';
    } catch (e) {
      return 'Browse all listings near you';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('home1-all-restaurants-subtitle', allRestaurantsSubtitle);
    } catch (e) {}
  }, [allRestaurantsSubtitle]);

  // Icon style for category badges: 'emoji' | 'svg' | 'image' | 'lucide'
  const [iconStyle, setIconStyle] = useState<'emoji'|'svg'|'image'|'lucide'>(() => {
    try { return (localStorage.getItem('home1-icon-style') as 'emoji'|'svg'|'image'|'lucide') ?? 'emoji'; } catch (e) { return 'emoji'; }
  });
  useEffect(() => { try { localStorage.setItem('home1-icon-style', iconStyle); } catch (e) {} }, [iconStyle]);

  // Membership settings (persisted)
  const [membershipEnabled, setMembershipEnabled] = useState<boolean>(() => {
    try { return localStorage.getItem('home1-membership-enabled') === 'true'; } catch (e) { return true; }
  });
  useEffect(() => { try { localStorage.setItem('home1-membership-enabled', membershipEnabled ? 'true' : 'false'); } catch (e) {} }, [membershipEnabled]);

  const [membershipTier, setMembershipTier] = useState<'basic'|'plus'|'premium'>(() => {
    try { return (localStorage.getItem('home1-membership-tier') as 'basic'|'plus'|'premium') ?? 'basic'; } catch (e) { return 'basic'; }
  });
  useEffect(() => { try { localStorage.setItem('home1-membership-tier', membershipTier); } catch (e) {} }, [membershipTier]);

  // Gold shade for membership/all-restaurants section (persisted)
  const [goldShade, setGoldShade] = useState<'amber'|'yellow'|'orange'|'rose'|'lime'>(() => {
    try { return (localStorage.getItem('home1-gold-shade') as 'amber'|'yellow'|'orange'|'rose'|'lime') ?? 'amber'; } catch (e) { return 'amber'; }
  });
  useEffect(() => { try { localStorage.setItem('home1-gold-shade', goldShade); } catch (e) {} }, [goldShade]);

  // Membership background (solid or gradient) - persisted
  const [membershipBgMode, setMembershipBgMode] = useState<'solid'|'gradient'>(() => { try { return (localStorage.getItem('home1-membership-bg-mode') as 'solid'|'gradient') ?? 'gradient'; } catch (e) { return 'gradient'; } });
  useEffect(() => { try { localStorage.setItem('home1-membership-bg-mode', membershipBgMode); } catch (e) {} }, [membershipBgMode]);

  const [membershipBgSolidColor, setMembershipBgSolidColor] = useState<string>(() => { try { return localStorage.getItem('home1-membership-bg-solid') ?? '#0f172a'; } catch (e) { return '#0f172a'; } });
  useEffect(() => { try { localStorage.setItem('home1-membership-bg-solid', membershipBgSolidColor); } catch (e) {} }, [membershipBgSolidColor]);

  const [membershipBgGradient, setMembershipBgGradient] = useState<{ from: string; to: string }>(() => { try { const raw = localStorage.getItem('home1-membership-bg-gradient'); return raw ? JSON.parse(raw) : { from: '#0f172a', to: '#111827' }; } catch (e) { return { from: '#0f172a', to: '#111827' }; } });
  useEffect(() => { try { localStorage.setItem('home1-membership-bg-gradient', JSON.stringify(membershipBgGradient)); } catch (e) {} }, [membershipBgGradient]);

  const BG_SOLID_PRESETS = ['#0f172a', '#111827', '#f59e0b', '#fb923c', '#ec4899', '#7c3aed'];
  const BG_GRADIENT_PRESETS = [
    { from: '#0f172a', to: '#111827' },
    { from: '#1f2937', to: '#111827' },
    { from: '#f59e0b', to: '#fb923c' },
    { from: '#fb7185', to: '#fb923c' },
    { from: '#a78bfa', to: '#f472b6' }
  ];

  const membershipBgStyle = membershipBgMode === 'solid'
    ? { backgroundColor: membershipBgSolidColor }
    : { backgroundImage: `linear-gradient(135deg, ${membershipBgGradient.from}, ${membershipBgGradient.to})` };

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
    }
  };
  const GOLD = GOLD_MAP[goldShade] || GOLD_MAP['amber'];

  const SCROLL_GRADIENT_MAP: Record<string, { start: string; end: string }> = {
    amber: { start: '#facc15', end: '#f59e0b' },
    yellow: { start: '#fef08a', end: '#f59e0b' },
    orange: { start: '#ffedd5', end: '#fb923c' },
    rose: { start: '#ffd7e0', end: '#fb7185' },
    lime: { start: '#d9f99d', end: '#84cc16' }
  };
  const scrollColors = SCROLL_GRADIENT_MAP[goldShade] || SCROLL_GRADIENT_MAP['amber'];
  const STAR_STROKE = (GOLD.badgeText && GOLD.badgeText.includes('text-white')) ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.22)';

  // helper to render category icon based on selected style
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
      // try to find a restaurant matching the category
      const r = restaurants.find(r => r.cuisine.toLowerCase().includes(c.id));
      const src = r?.image?.replace('w=400&h=300', 'w=120&h=90');
      return (
        <div className="w-8 h-8 rounded-md overflow-hidden bg-white/5 flex items-center justify-center">
          {src ? (
            <img src={src} alt={c.name} className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/opengraph.jpg'; }} />
          ) : (
            <span className="text-sm">{c.icon}</span>
          )}
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

      // If no Lucide icon found, provide category-specific inline SVGs for better visuals
      if (c.id === 'chinese') {
        const size = 18;
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={`${colorClass}`}>
            <path d="M3 8h18v2H3z" />
            <path d="M5 10v6" />
            <path d="M9 10v6" />
            <path d="M15 10v6" />
            <path d="M19 10v6" />
          </svg>
        );
      }

      if (c.id === 'mexican') {
        const size = 18;
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={`${colorClass}`}>
            <path d="M3 12c2-4 6-6 9-6s7 2 9 6v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z" />
            <path d="M8 9c1-1 3-1 4 0" />
          </svg>
        );
      }
    }

    if (iconStyle === 'svg') {
      // simple inline SVGs per category id
      const size = 18;
      const svgProps = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as any;
      const id = c.id;
      if (id === 'pizza') return <svg {...svgProps} className={`${colorClass}`}><path d="M12 2 L20 12 A10 10 0 0 1 4 12 Z"/></svg>;
      if (id === 'burger') return <svg {...svgProps} className={`${colorClass}`}><rect x="3" y="7" width="18" height="2" rx="1"/><rect x="3" y="13" width="18" height="2" rx="1"/></svg>;
      if (id === 'sushi') return <svg {...svgProps} className={`${colorClass}`}><circle cx="9" cy="12" r="3"/><path d="M2 12c2-4 6-8 10-8s8 4 10 8"/></svg>;
      if (id === 'chinese') return <svg {...svgProps} className={`${colorClass}`}><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M8 10h8"/></svg>;
      if (id === 'indian') return <svg {...svgProps} className={`${colorClass}`}><path d="M12 2v20"/><path d="M4 8h16"/></svg>;
      if (id === 'mexican') return <svg {...svgProps} className={`${colorClass}`}><path d="M3 7h18v10H3z"/></svg>;
      if (id === 'dessert') return <svg {...svgProps} className={`${colorClass}`}><path d="M12 2l2 6h6l-4.8 3.2L18 18l-6-4-6 4 1.8-6.8L3 8h6z"/></svg>;
      if (id === 'healthy') return <svg {...svgProps} className={`${colorClass}`}><path d="M3 12c2-4 6-8 9-8s4.5 2 6 4 2 4 2 4"/></svg>;
      return <svg {...svgProps} className={`${colorClass}`}><circle cx="12" cy="12" r="9"/></svg>;
    }

    // emoji fallback
    return <span className="text-sm">{c.icon}</span>;
  };

  // carousel state (right-side hero) - use images from the restaurants grid (first 5)
  const carouselItems = restaurants.slice(0, 5).map(r => ({
    src: r.image.replace('w=400&h=300', 'w=900&h=600'),
    alt: r.name
  }));

  // fallback data SVG for broken/blocked images
  const fallbackImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="Arial, Helvetica, sans-serif" font-size="28">Image unavailable</text></svg>';

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselHover, setCarouselHover] = useState(false);

  const prevCarousel = () => setCarouselIndex(i => (i - 1 + carouselItems.length) % carouselItems.length);
  const nextCarousel = () => setCarouselIndex(i => (i + 1) % carouselItems.length);

  useEffect(() => {
    if (carouselHover) return;
    const t = setInterval(() => setCarouselIndex(i => (i + 1) % carouselItems.length), 4000);
    return () => clearInterval(t);
  }, [carouselHover, carouselItems.length]);

  // membership list scroller hint
  const membershipScrollRef = useRef<HTMLDivElement | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    const el = membershipScrollRef.current;
    if (!el) return;
    const check = () => {
      const hasOverflow = el.scrollHeight > el.clientHeight + 2;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
      setShowScrollHint(hasOverflow && !atBottom);
    };
    check();
    el.addEventListener('scroll', check);
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [restaurants.length, pageTheme]);
  // scroll chevron click — scroll by one item height or to top if at bottom
  const scrollChevron = () => {
    const el = membershipScrollRef.current;
    if (!el) return;
    const maxScrollTop = el.scrollHeight - el.clientHeight;
    const atBottom = el.scrollTop >= maxScrollTop - 4;
    if (atBottom) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const firstChild = el.firstElementChild as HTMLElement | null;
      const itemHeight = firstChild?.offsetHeight ?? 68;
      el.scrollBy({ top: itemHeight + 8, behavior: 'smooth' });
    }
  };

  // initial subtle nudge to hint scrollability (once per session)
  useEffect(() => {
    const el = membershipScrollRef.current;
    if (!el) return;
    try {
      const nudged = sessionStorage.getItem('home1-membership-scrolled');
      const hasOverflow = el.scrollHeight > el.clientHeight + 2;
      if (hasOverflow && !nudged) {
        const t = setTimeout(() => {
          el.scrollBy({ top: 12, behavior: 'smooth' });
          setTimeout(() => el.scrollTo({ top: 0, behavior: 'smooth' }), 600);
          sessionStorage.setItem('home1-membership-scrolled', 'true');
        }, 900);
        return () => clearTimeout(t);
      }
    } catch (e) {}
  }, [restaurants.length, showScrollHint]);

  // keep scrollbar thumb colors in sync with selected gold shade
  useEffect(() => {
    const el = membershipScrollRef.current;
    if (!el) return;
    try {
      el.style.setProperty('--scroll-thumb-start', scrollColors.start);
      el.style.setProperty('--scroll-thumb-end', scrollColors.end);
    } catch (e) {}
  }, [scrollColors.start, scrollColors.end, goldShade]);

  // draggable settings menu position
  const dragRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const dragOriginRef = useRef({x: 0, y: 0, left: 0, top: 0});
  const [menuPos, setMenuPos] = useState<{ left: number; top: number } | null>(null);

  // load saved position
  useEffect(() => {
    try {
      const saved = localStorage.getItem('home1-settings-menu-pos');
      if (saved) {
        const parsed = JSON.parse(saved);
        setMenuPos(parsed);
        return;
      }
    } catch (e) {
      // ignore
    }
    // default position: right-side centered
    const defaultLeft = Math.max(window.innerWidth - 96, 24);
    const defaultTop = Math.round(window.innerHeight / 2 - 48);
    setMenuPos({ left: defaultLeft, top: defaultTop });
  }, []);

  useEffect(() => {
    if (!menuPos) return;
    try {
      localStorage.setItem('home1-settings-menu-pos', JSON.stringify(menuPos));
    } catch (e) {}
  }, [menuPos]);

  // keep panel inside viewport when opened or when resized
  useLayoutEffect(() => {
    if (!dragRef.current) return;
    const adjust = () => {
      const el = dragRef.current!;
      const rect = el.getBoundingClientRect();
      const width = rect.width || 240;
      const height = rect.height || 240;
      const left = menuPos ? menuPos.left : Math.max(window.innerWidth - width - 24, 24);
      const top = menuPos ? menuPos.top : Math.round(window.innerHeight / 2 - height / 2);
      const clampedLeft = Math.min(Math.max(8, left), window.innerWidth - width - 8);
      const clampedTop = Math.min(Math.max(8, top), window.innerHeight - height - 8);
      setMenuPos({ left: clampedLeft, top: clampedTop });
    };

    // adjust on open and on resize
    adjust();
    window.addEventListener('resize', adjust);
    return () => window.removeEventListener('resize', adjust);
  }, [showOptions]);

  // click outside to close
  useEffect(() => {
    if (!showOptions) return;
    const onDocClick = (e: MouseEvent) => {
      if (!dragRef.current) return;
      if (!dragRef.current.contains(e.target as Node)) setShowOptions(false);
    };
    const onPointerUpGlobal = () => { draggingRef.current = false; };
    document.addEventListener('pointerup', onPointerUpGlobal);
    document.addEventListener('mousedown', onDocClick);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('pointerup', onPointerUpGlobal);
    };
  }, [showOptions]);

  const onHandlePointerDown = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    draggingRef.current = true;
    const rect = dragRef.current.getBoundingClientRect();
    dragOriginRef.current = { x: e.clientX, y: e.clientY, left: rect.left, top: rect.top };
    try { (e.target as Element).setPointerCapture(e.pointerId); } catch (err) {}
  };

  const onHandlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || !dragRef.current) return;
    const dx = e.clientX - dragOriginRef.current.x;
    const dy = e.clientY - dragOriginRef.current.y;
    const width = dragRef.current.offsetWidth || 240;
    const height = dragRef.current.offsetHeight || 240;
    const left = Math.min(Math.max(8, dragOriginRef.current.left + dx), window.innerWidth - width - 8);
    const top = Math.min(Math.max(8, dragOriginRef.current.top + dy), window.innerHeight - height - 8);
    setMenuPos({ left, top });
  };

  const onHandlePointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    try { (e.target as Element).releasePointerCapture(e.pointerId); } catch (err) {}
  };

  const filtered = restaurants.filter(r => {
    const matchesCategory = activeCategory === 'all' || r.cuisine.toLowerCase().includes(activeCategory);
    const matchesQuery = r.name.toLowerCase().includes(query.toLowerCase()) || r.cuisine.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Dishes & restaurants data for new sections
  const { addToCart } = useCart();
  const allDishes = Object.entries(menuItems).flatMap(([rid, items]) => items.map(item => ({ ...item, restaurantId: rid, restaurantName: restaurants.find(r => r.id === rid)?.name ?? '' })));
  const featuredDishes = allDishes.slice(0, 8);
  const popularRestaurants = restaurants.filter(r => r.featured).slice(0, 8);
  const promoRestaurant = popularRestaurants[0] ?? restaurants[0];

  // rotating promo ads (use featured restaurants or fallback to all)
  const promoAds = (popularRestaurants.length ? popularRestaurants : restaurants).slice(0, 5).map(r => ({
    id: r.id,
    src: r.image.replace('w=400&h=300', 'w=900&h=600'),
    name: r.name,
    cuisine: r.cuisine,
    rating: r.rating,
    deliveryTime: r.deliveryTime,
    distance: r.distance,
    offer: r.offer,
    description: menuItems[r.id]?.[0]?.description ?? `Popular for ${r.cuisine}`
  }));
  const [promoIndex, setPromoIndex] = useState(0);
  const [promoHover, setPromoHover] = useState(false);
  const prevPromo = () => setPromoIndex(i => (i - 1 + promoAds.length) % promoAds.length);
  const nextPromo = () => setPromoIndex(i => (i + 1) % promoAds.length);

  useEffect(() => {
    if (promoHover) return;
    if (!promoAds.length) return;
    const t = setInterval(() => setPromoIndex(i => (i + 1) % promoAds.length), 5000);
    return () => clearInterval(t);
  }, [promoHover, promoAds.length]);

  return (
    <div className={`min-h-screen flex flex-col ${pageTheme === 'dark' ? 'bg-slate-900 text-white' : 'bg-gradient-to-br from-orange-50 via-background to-yellow-50'}`}>
      <Header theme={pageTheme} />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left: Filters (highlighted card) */}
            <aside className="hidden lg:block col-span-1 sticky top-24 self-start">
              <div className={`${filterContainerClasses}`}>
                {/* Left accent stripe (conditional) */}
                {showStripe && (
                  <div className={`absolute left-0 top-4 bottom-4 ${stripeWidthClass} rounded-l-2xl bg-gradient-to-b from-primary to-orange-400`} />
                )}

                <div className="flex items-center justify-between relative z-10">
                  <h3 className="text-lg font-semibold flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary text-white">F</span>
                    Filters
                  </h3>

                  <div className="flex items-center gap-4">
                  <button
                    onClick={() => { setActiveCategory('all'); setFilterStyle('glass'); }}
                    className="text-sm text-muted-foreground hover:text-primary transition"
                    aria-label="Clear filters"
                  >
                    Clear
                  </button>
                </div>
                </div>

                <div className="relative z-10 grid grid-cols-3 gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCategory(c.id)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                        activeCategory === c.id
                          ? 'bg-primary text-white shadow-md scale-105'
                          : 'bg-white/5 hover:bg-white/10 text-muted-foreground'
                      }`}
                    >
                      {renderCategoryIcon(c)}
                      <span className="text-[10px] mt-1 font-medium truncate w-full text-center">{c.name}</span>
                    </button>
                  ))}
                </div>

                <div className="relative z-10">
                  <p className="text-sm text-muted-foreground mb-2">Price</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-2 rounded-md border border-border/20 bg-white/3 hover:bg-primary/10 transition">₹</button>
                    <button className="px-3 py-2 rounded-md border border-border/20 bg-white/3 hover:bg-primary/10 transition">₹₹</button>
                    <button className="px-3 py-2 rounded-md border border-border/20 bg-white/3 hover:bg-primary/10 transition">₹₹₹</button>
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="text-sm text-muted-foreground mb-2">Ratings</p>
                  <div className="flex flex-col gap-2">
                    <button className="px-3 py-2 rounded-md border border-border/20 bg-white/3 hover:bg-primary/10 transition">4.5+</button>
                    <button className="px-3 py-2 rounded-md border border-border/20 bg-white/3 hover:bg-primary/10 transition">4.0+</button>
                    <button className="px-3 py-2 rounded-md border border-border/20 bg-white/3 hover:bg-primary/10 transition">All</button>
                  </div>
                </div>

                <div className="relative z-10">
                  <Link href="/home1">
                    <a className="block text-sm text-primary hover:underline">Reset filters</a>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Right: Content */}
            <section className="col-span-4">
              {/* Hero Variant */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`rounded-3xl mb-8 overflow-hidden ${pageTheme === 'dark' ? 'bg-slate-800 text-white shadow-lg' : 'bg-white/95 text-foreground shadow-md'}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                  {/* Left: content */}
                  <div className="p-6 flex flex-col justify-center">
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${pageTheme === 'dark' ? 'text-white' : 'text-foreground'} drop-shadow-sm`}>
                      <span className="md:whitespace-nowrap">Discover top picks</span>
                      <span className="block">around you</span>
                    </h2>
                    <p className={`${pageTheme === 'dark' ? 'text-slate-300' : 'text-muted-foreground'} mt-3 max-w-xl`}>A curated selection of restaurants based on popularity and your taste.</p>

                    <div className="mt-6 flex items-center gap-3">
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search restaurants, cuisines, dishes..."
                        className={`w-full lg:w-96 px-4 py-3 rounded-full border border-border/30 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary ring-offset-0 transition ${pageTheme === 'dark' ? 'bg-slate-700/60 text-white' : 'bg-white text-foreground'}`}
                      />
                      <button className="px-4 py-3 rounded-full bg-primary text-white">Search</button>
                    </div>
                  </div>

                  {/* Right: image carousel on large screens with controls */}
                  <div className="hidden lg:flex items-center justify-end h-full">
                    <div className="relative h-full w-full max-w-[420px] overflow-hidden rounded-xl">
                      <div
                        onMouseEnter={() => setCarouselHover(true)}
                        onMouseLeave={() => setCarouselHover(false)}
                        className="h-full w-full"
                      >
                        <AnimatePresence initial={false} mode="wait">
                          <motion.img
                            key={carouselItems[carouselIndex]?.src ?? carouselIndex}
                            src={carouselItems[carouselIndex]?.src ?? fallbackImage}
                            alt={carouselItems[carouselIndex]?.alt ?? `Food ${carouselIndex + 1}`}
                            loading="lazy"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbackImage; }}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-cover"
                          />
                        </AnimatePresence>
                      </div>

                      {/* Controls */}
                      <button onClick={prevCarousel} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60">
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <button onClick={nextCarousel} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60">
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Indicators */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                        {carouselItems.map((_, idx) => (
                          <button key={idx} onClick={() => setCarouselIndex(idx)} aria-label={`Go to slide ${idx + 1}`} className={`w-2 h-2 rounded-full ${idx === carouselIndex ? 'bg-white' : 'bg-white/40'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Advertisement Carousel (multiple restaurant promos) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`rounded-2xl mb-8 p-2 ${pageTheme === 'dark' ? 'bg-slate-800 text-white shadow-lg' : 'bg-white/95 text-foreground shadow-md'}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3 h-44">
                      <div className="flex-1 h-full flex flex-col justify-center overflow-hidden">
                        <div className="mb-1">
                          <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">Sponsored</span>
                        </div>

                        <h4 className="text-lg md:text-xl font-semibold line-clamp-2 flex items-center gap-3">
                          <span className="truncate">{promoAds[promoIndex]?.name ?? 'Featured'}</span>

                          <span className="ml-2 inline-flex items-center gap-2 text-xs">
                            <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"><span className="mr-1">{promoAds[promoIndex]?.rating}</span><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" stroke={STAR_STROKE} strokeWidth={0.6} strokeLinejoin="round" strokeLinecap="round" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
                            <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-white/10 dark:bg-slate-700/60 text-foreground border border-border/10 shadow-sm">{promoAds[promoIndex]?.deliveryTime}</span>
                            <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-white/10 dark:bg-slate-700/60 text-foreground border border-border/10 shadow-sm">{promoAds[promoIndex]?.distance}</span>
                          </span>
                        </h4>

                        {/* Primary cuisine / category and offer */}
                        <div className="mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            {promoAds[promoIndex]?.offer && (
                              <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">{promoAds[promoIndex]?.offer}</span>
                            )}

                            {(() => {
                              const arr = (promoAds[promoIndex]?.cuisine ?? '').split(',').map(s => s.trim()).filter(Boolean);
                              const primary = arr[0];
                              return primary ? (
                                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-white/10 dark:bg-slate-700/60 text-foreground border border-border/10 shadow-sm">
                                  {primary}
                                </span>
                              ) : null;
                            })()}
                          </div>
                        </div>

                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{promoAds[promoIndex]?.description}</p>

                        <div className="mt-3 flex items-center gap-3">
                          {promoAds[promoIndex] ? (
                            <Link href={`/restaurant/${promoAds[promoIndex].id}`}><a className="px-3 py-1.5 text-sm rounded-md bg-primary text-white shadow">Order Now</a></Link>
                          ) : (
                            <button className="px-3 py-1.5 text-sm rounded-md bg-primary text-white shadow">Order Now</button>
                          )}

                          {promoAds[promoIndex] && (
                            <Link href={`/restaurant/${promoAds[promoIndex].id}`}><a className="px-2.5 py-1 text-sm rounded-md border border-border/20">View menu</a></Link>
                          )}

                          <Link href="/promotions"><a className="text-sm px-2 py-1 text-muted-foreground hover:underline">More offers</a></Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <div className="relative h-44 rounded-lg overflow-hidden">
                      <div
                        onMouseEnter={() => setPromoHover(true)}
                        onMouseLeave={() => setPromoHover(false)}
                        className="h-full w-full"
                      >
                        <AnimatePresence initial={false} mode="wait">
                          <motion.img
                            key={promoAds[promoIndex]?.src ?? promoIndex}
                            src={promoAds[promoIndex]?.src ?? '/opengraph.jpg'}
                            alt={promoAds[promoIndex]?.name ?? 'Promotional banner'}
                            loading="lazy"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbackImage; }}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-cover"
                          />
                        </AnimatePresence>
                      </div>

                      {/* Controls */}
                      <button onClick={prevPromo} aria-label="Previous promo" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60">
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <button onClick={nextPromo} aria-label="Next promo" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60">
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Indicators */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
                        {promoAds.map((_, idx) => (
                          <button key={idx} onClick={() => setPromoIndex(idx)} aria-label={`Go to promo ${idx + 1}`} className={`w-2 h-2 rounded-full ${idx === promoIndex ? 'bg-white' : 'bg-white/40'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>



              {/* Featured Dishes */}
              <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-semibold ${pageTheme === 'dark' ? 'text-white' : 'text-foreground'}`}>Featured Dishes</h3>
                  <Link href="/menu"><a className="text-sm text-primary hover:underline">View all</a></Link>
                </div>

                <div className="flex gap-4 overflow-x-auto py-2 -mx-4 px-4">
                  {featuredDishes.map(d => (
                    <div key={d.id} className={`min-w-[200px] w-56 ${pageTheme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-foreground'} rounded-2xl shadow p-3 flex-shrink-0`}>
                      <div className="h-32 rounded-lg overflow-hidden">
                        <img src={d.image.replace('w=300&h=200', 'w=900&h=600')} alt={d.name} loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbackImage; }} className="w-full h-full object-cover" />
                      </div>

                      <h4 className="mt-2 font-semibold text-sm">{d.name}</h4>
                      <div className="mt-1 text-xs text-muted-foreground">{d.category}</div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="font-semibold">₹{d.price}</div>
                        <button onClick={() => addToCart({ id: d.id, name: d.name, price: d.price, image: d.image, restaurantId: d.restaurantId, restaurantName: d.restaurantName })} className="px-3 py-2 bg-primary text-white rounded-md text-xs">Add</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Popular Restaurants */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-xl font-semibold ${pageTheme === 'dark' ? 'text-white' : 'text-foreground'}`}>Popular Restaurants</h3>
                    <Link href="/restaurants"><a className="text-sm text-primary hover:underline">Explore</a></Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {popularRestaurants.map((r, i) => (
                      <RestaurantCard key={r.id} restaurant={r} index={i} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Content: grid or list based on layoutMode */}
              {layoutMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                  {filtered.map((r, i) => (
                    <RestaurantCard key={r.id} restaurant={r} index={i} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {filtered.map((r) => (
                    <div key={r.id} className={`rounded-2xl p-4 shadow ${pageTheme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-foreground'}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-28 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold">{r.name}</h4>
                            <div className="text-sm text-muted-foreground">{r.distance}</div>
                          </div>

                          <p className="text-sm text-muted-foreground mt-1">{r.cuisine}</p>

                          <div className="mt-3 flex items-center gap-3">
                            <div className="text-sm bg-primary/10 text-primary px-2 py-1 rounded"><span className="mr-1">{r.rating}</span><svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="currentColor" stroke={STAR_STROKE} strokeWidth={0.6} strokeLinejoin="round" strokeLinecap="round" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></div>
                            <div className="text-sm text-muted-foreground">{r.deliveryTime} • {r.deliveryFee}</div>
                          </div>

                          <div className="mt-3 flex items-center gap-2">
                            <Link href={`/restaurant/${r.id}`}>
                              <a className="text-sm font-medium text-primary hover:underline">View menu →</a>
                            </Link>
                            <button className="ml-auto px-3 py-2 rounded-md bg-primary text-white">Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
                        {/* Membership + All Restaurants (dark metallic gold theme) */}
              <section style={membershipBgStyle} className="mt-8 mb-6 rounded-3xl pt-4 pb-6 px-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`text-xl font-semibold ${GOLD.heading}`}>Membership & All Restaurants <span className={`ml-3 inline-flex items-center text-xs px-2 py-0.5 rounded-full ${GOLD.badgeBg} ${GOLD.badgeText}`}>{membershipTier === 'basic' ? 'Basic' : membershipTier === 'plus' ? 'Plus' : 'Premium'}</span></h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link href="/membership"><a className={`${GOLD.buttonBg} ${GOLD.buttonText} px-3 py-1 rounded-md font-semibold shadow`}>Become a member</a></Link>
                    <Link href="/restaurants"><a className={`text-sm ${GOLD.linkText} hover:underline`}>See all</a></Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className={`rounded-2xl p-4 bg-slate-800/60 ${GOLD.cardBorder}`}> 
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`font-semibold ${GOLD.cardHeading}`}>{membershipTier === 'basic' ? 'Basic' : membershipTier === 'plus' ? 'Plus' : 'Premium'}</h4>
                        <div className={`text-sm ${GOLD.cardText} mt-1`}>{membershipTier === 'basic' ? 'Free, basic perks' : membershipTier === 'plus' ? 'Priority offers & small discounts' : 'Best value & exclusive deals'}</div>
                        <p className={`text-xs ${GOLD.cardText} mt-2`}>{membershipTier === 'basic' ? 'A great way to try membership — earn points and access occasional offers with no monthly fee.' : membershipTier === 'plus' ? 'Popular for regular customers: enjoy priority offers, small discounts, and lower delivery fees.' : 'Designed for frequent users: site-wide discounts, free delivery, and exclusive perks for maximum savings.'}</p>
                      </div>
                      <div className={`text-sm font-semibold ${GOLD.cardHeading}`}>{membershipTier === 'basic' ? 'Free' : membershipTier === 'plus' ? '₹199/mo' : '₹399/mo'}</div>
                    </div>

                    <ul className={`mt-3 text-sm space-y-2 ${GOLD.cardText}`}>
                      {membershipTier === 'basic' && <>
                        <li className="flex items-start gap-2"><svg className="w-4 h-4 mt-0.5 text-amber-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418L9 15.18 5.129 11.31A1 1 0 0 0 3.715 12.726l4.586 4.586a1 1 0 0 0 1.414 0l9.57-9.603z"/></svg><span>Exclusive offers and limited-time promotions.</span></li>
                        <li className="flex items-start gap-2"><svg className="w-4 h-4 mt-0.5 text-amber-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418L9 15.18 5.129 11.31A1 1 0 0 0 3.715 12.726l4.586 4.586a1 1 0 0 0 1.414 0l9.57-9.603z"/></svg><span>Earn reward points on orders.</span></li>
                        <li className="flex items-start gap-2"><svg className="w-4 h-4 mt-0.5 text-amber-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418L9 15.18 5.129 11.31A1 1 0 0 0 3.715 12.726l4.586 4.586a1 1 0 0 0 1.414 0l9.57-9.603z"/></svg><span>Access member-only promos and trial perks.</span></li>
                      </>}

                      {membershipTier === 'plus' && <>
                        <li className="flex items-start gap-2"><svg className="w-4 h-4 mt-0.5 text-amber-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418L9 15.18 5.129 11.31A1 1 0 0 0 3.715 12.726l4.586 4.586a1 1 0 0 0 1.414 0l9.57-9.603z"/></svg><span>10% off selected restaurants and priority offers.</span></li>
                        <li className="flex items-start gap-2"><svg className="w-4 h-4 mt-0.5 text-amber-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418L9 15.18 5.129 11.31A1 1 0 0 0 3.715 12.726l4.586 4.586a1 1 0 0 0 1.414 0l9.57-9.603z"/></svg><span>Free delivery on orders over ₹500 + lower delivery fees.</span></li>
                        <li className="flex items-start gap-2"><svg className="w-4 h-4 mt-0.5 text-amber-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418L9 15.18 5.129 11.31A1 1 0 0 0 3.715 12.726l4.586 4.586a1 1 0 0 0 1.414 0l9.57-9.603z"/></svg><span>Priority customer support and early access to offers.</span></li>
                      </>}

                      {membershipTier === 'premium' && <>
                        <li className="flex items-start gap-2"><svg className="w-4 h-4 mt-0.5 text-amber-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418L9 15.18 5.129 11.31A1 1 0 0 0 3.715 12.726l4.586 4.586a1 1 0 0 0 1.414 0l9.57-9.603z"/></svg><span>15% off site-wide and free delivery on all orders.</span></li>
                        <li className="flex items-start gap-2"><svg className="w-4 h-4 mt-0.5 text-amber-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418L9 15.18 5.129 11.31A1 1 0 0 0 3.715 12.726l4.586 4.586a1 1 0 0 0 1.414 0l9.57-9.603z"/></svg><span>Exclusive partner discounts, free delivery & highest priority support.</span></li>
                        <li className="flex items-start gap-2"><svg className="w-4 h-4 mt-0.5 text-amber-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418L9 15.18 5.129 11.31A1 1 0 0 0 3.715 12.726l4.586 4.586a1 1 0 0 0 1.414 0l9.57-9.603z"/></svg><span>Premium-only experiences and priority access to new features.</span></li>
                      </>}
                    </ul>

                    <p className={`mt-3 text-xs ${GOLD.cardText}`}>Estimated savings: {membershipTier === 'basic' ? '₹0/mo' : membershipTier === 'plus' ? '≈ ₹200/mo' : '≈ ₹500/mo'} (based on average usage)</p>

                    <div className="mt-4 flex items-center gap-2">
                      <button onClick={() => setMembershipTier('basic')} className={`px-3 py-1 rounded-md text-sm ${membershipTier === 'basic' ? `${GOLD.badgeBg} ${GOLD.buttonText}` : `${GOLD.cardBorder} ${GOLD.cardHeading}`}`}>Basic</button>
                      <button onClick={() => setMembershipTier('plus')} className={`px-3 py-1 rounded-md text-sm ${membershipTier === 'plus' ? `${GOLD.badgeBg} ${GOLD.buttonText}` : `${GOLD.cardBorder} ${GOLD.cardHeading}`}`}>Plus</button>
                      <button onClick={() => setMembershipTier('premium')} className={`px-3 py-1 rounded-md text-sm ${membershipTier === 'premium' ? `${GOLD.badgeBg} ${GOLD.buttonText}` : `${GOLD.cardBorder} ${GOLD.cardHeading}`}`}>Premium</button>
                    </div>

                  </div>

                  <div className="lg:col-span-2 relative">
                    <div ref={membershipScrollRef} className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-2 modern-scrollbar" role="region" aria-label="membership restaurants list">
                      {restaurants.map((r, i) => (
                        <div key={r.id} className="rounded-2xl p-3 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-amber-300/10 w-full">
                          <div className="flex items-center gap-3 w-full">
                            <div className="w-20 h-14 rounded-md overflow-hidden flex-shrink-0">
                              <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-amber-100 truncate">{r.name}</h4>
                                <div className="text-sm text-amber-200">{r.distance}</div>
                              </div>

                              <div className="mt-1 text-sm text-amber-100 truncate">{r.cuisine}</div>

                              <div className="mt-2 flex items-center gap-2">
                                <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${GOLD.badgeBg} ${GOLD.badgeText}`}><span className="mr-1">{r.rating}</span><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" stroke={STAR_STROKE} strokeWidth={0.6} strokeLinejoin="round" strokeLinecap="round" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
                                <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full bg-white/10 ${GOLD.cardText}`}>{r.deliveryTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {restaurants.length > 4 && (
                      <>
                        <button onClick={scrollChevron} aria-label="Scroll membership list" title="Scroll membership list" className={`absolute right-3 bottom-3 flex items-center gap-1 px-2 py-1 bg-black/20 rounded-full text-xs text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-300 ${showScrollHint ? 'chevron-bounce' : ''}`}>
                          <ChevronDown className="w-3 h-3 text-amber-200" />
                        </button>

                        <div className="mt-2 text-xs text-amber-200">Showing 4 of {restaurants.length} — scroll to see more</div>
                      </>
                    )}
                  </div>
                </div>

              </section>
        </div>
      </main>

      <CartSidebar />
      <Footer theme={pageTheme} />

      {/* Floating style toggle */}
      <div ref={dragRef} style={menuPos ? { position: 'fixed', left: menuPos.left, top: menuPos.top } : undefined} className="z-50">
        <div className="flex flex-col items-end gap-3">
          <button
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
                style={{ minWidth: 240 }}
              >
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

                {/* Group: Theme (two-column badges) */}
                <div className="w-full bg-white/95 dark:bg-slate-800/95 text-foreground rounded-md p-2 shadow-2xl border border-border/40">
                  <div className="text-xs text-foreground mb-2">Theme</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setPageTheme('light')} aria-pressed={pageTheme === 'light'} className={`px-3 py-1 rounded-full text-sm inline-flex items-center gap-2 justify-center ${pageTheme === 'light' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`}><Sun className="w-4 h-4"/> Light</button>
                    <button onClick={() => setPageTheme('dark')} aria-pressed={pageTheme === 'dark'} className={`px-3 py-1 rounded-full text-sm inline-flex items-center gap-2 justify-center ${pageTheme === 'dark' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`}><Moon className="w-4 h-4"/> Dark</button>
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
                        <button key={g.from + g.to} onClick={() => setMembershipBgGradient(g)} style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }} className={`w-16 h-7 rounded-full border ${membershipBgGradient.from === g.from && membershipBgGradient.to === g.to ? 'ring-1 ring-primary/30' : ''}`} aria-label="Set membership gradient" />
                      ))}
                    </div>
                  )}

                </div>

                {/* Group: Filters (two-column badges) */}
                <div className="w-full bg-white/95 dark:bg-slate-800/95 text-foreground rounded-md p-2 shadow-2xl border border-border/40">
                  <div className="text-xs text-foreground mb-2">Filters</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setFilterStyle('solid')} aria-pressed={filterStyle === 'solid'} className={`px-3 py-1 rounded-full text-sm inline-flex items-center justify-center ${filterStyle === 'solid' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`}>Solid</button>
                    <button onClick={() => setFilterStyle('glass')} aria-pressed={filterStyle === 'glass'} className={`px-3 py-1 rounded-full text-sm inline-flex items-center justify-center ${filterStyle === 'glass' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`}>Glass</button>
                    <button onClick={() => setFilterStyle('accent')} aria-pressed={filterStyle === 'accent'} className={`px-3 py-1 rounded-full text-sm inline-flex items-center justify-center ${filterStyle === 'accent' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`}>Accent</button>
                    <button onClick={() => { setActiveCategory('all'); setFilterStyle('glass'); }} className="px-3 py-1 rounded-full text-sm inline-flex items-center justify-center text-primary ring-1 ring-primary/20 hover:bg-primary/5">Reset</button>
                  </div>

                  {/* Icon Style */}
                  <div className="mt-3 text-xs text-foreground mb-2">Icon style</div>
                  <div className="grid grid-cols-3 gap-2 mb-1">
                    <button onClick={() => setIconStyle('emoji')} aria-pressed={iconStyle === 'emoji'} className={`px-2 py-1 rounded-full text-sm inline-flex items-center justify-center ${iconStyle === 'emoji' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`} title="Emoji">😊</button>
                    <button onClick={() => setIconStyle('svg')} aria-pressed={iconStyle === 'svg'} className={`px-2 py-1 rounded-full text-sm inline-flex items-center justify-center ${iconStyle === 'svg' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`} title="SVG">🔷</button>
                    <button onClick={() => setIconStyle('lucide')} aria-pressed={iconStyle === 'lucide'} className={`px-2 py-1 rounded-full text-sm inline-flex items-center justify-center ${iconStyle === 'lucide' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`} title="Lucide">LU</button>
                    <button onClick={() => setIconStyle('image')} aria-pressed={iconStyle === 'image'} className={`px-2 py-1 rounded-full text-sm inline-flex items-center justify-center ${iconStyle === 'image' ? 'bg-primary/10 text-primary font-semibold ring-1 ring-primary/30' : 'bg-white/5 dark:bg-slate-700/60 text-foreground hover:bg-white/10'}`} title="Image">🖼️</button>
                  </div>

                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

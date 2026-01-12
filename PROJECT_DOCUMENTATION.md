# FoodDash - Food Express Project Documentation

## 📋 Project Overview

**Project Name:** Food Express / FoodDash  
**Type:** Full-Stack Food Delivery Application  
**Frontend Framework:** React + TypeScript  
**Build Tool:** Vite  
**Styling:** Tailwind CSS v4.1.14 + Shadcn/UI Components  
**State Management:** React Query (TanStack Query)  
**Routing:** Wouter (lightweight routing)  
**UI Library:** Lucide Icons, Framer Motion (animations)  
**Version:** 1.0.0

---

## 🎨 Design System & Color Palette

### Primary Colors
- **Primary:** `from-primary` (16° 90% 55%) - Orange/Red tone
- **Secondary:** `from-secondary` (45° 100% 55%) - Yellow tone
- **Accent:** `from-accent` (160° 60% 45%) - Teal/Green tone

### Theme-Specific Colors

#### Admin Dashboard Theme (Dark Mode)
- **Background:** Slate-900 (`#0f172a`)
- **Sidebar:** Slate-800/50 with border-slate-700/50
- **Primary Accent:** Violet-500 to Purple-600 gradient
- **Text:** White on dark backgrounds
- **Cards:** Slate-800/50 with rounded-2xl

#### Delivery Partner Theme (Dark Green)
- **Background:** Emerald-900 via Emerald-800 to Teal-900 gradient
- **Primary Accent:** Emerald-400 to Teal-500 gradient
- **Text:** White/Emerald tones
- **Icons:** Emerald-500 (Bike icon)

#### User/Public Theme (Light)
- **Background:** Gradient from Orange-50 via Background to Yellow-50
- **Primary Accent:** Orange/Red gradients
- **Cards:** White background (0° 0% 100%)
- **Text:** Dark foreground (20° 20% 15%)

### Status Colors (Semantic)
- **Success/Delivered:** Emerald-500 (`text-emerald-400` / `text-emerald-500`)
- **In Progress/Transit:** Blue-500 (`text-blue-500` / `text-blue-400`)
- **Warning/Preparing:** Amber-500 (`text-amber-500` / `text-amber-400`)
- **Pending/Inactive:** Slate-500 (`text-slate-400`)
- **Error/Cancelled:** Red-500 (`text-red-500`)
- **VIP:** Amber-500 (`text-amber-400`)

### Chart Colors
- **Chart-1:** Violet (16° 90% 55%)
- **Chart-2:** Yellow (45° 100% 55%)
- **Chart-3:** Teal (160° 60% 45%)
- **Chart-4:** Blue (200° 70% 50%)
- **Chart-5:** Purple (280° 60% 55%)

### Typography
- **Font Sans:** 'Plus Jakarta Sans', sans-serif
- **Font Display:** 'Poppins', sans-serif
- **Font Mono:** Menlo, monospace
- **Default Radius:** 1rem (16px)

### Utilities
- **Gradient Backgrounds:** `bg-gradient-to-br`, `bg-gradient-to-t`
- **Backdrop Blur:** `backdrop-blur-xl`, `backdrop-blur-sm`
- **Shadows:** Custom shadow scale (shadow-2xs to shadow-2xl)
- **Utilities:** `.text-gradient`, `.glass`, `.glass-dark`

---

## 🗺️ Page Routes & Structure

### Public Pages

#### 1. **Home** (`/`)
- **File:** `client/src/pages/Home.tsx`
- **Components:** Header, Hero, Categories, RestaurantGrid, CartSidebar, Footer
- **Style:** Light theme with orange/yellow gradients
- **Color:** White background with orange primary accents
- **Purpose:** Landing page showcasing restaurants and categories

##### Layout Structure
```
┌─────────────────────────────────────┐
│         Header (Sticky)              │
├─────────────────────────────────────┤
│         Hero Section                 │
├─────────────────────────────────────┤
│      Categories Carousel             │
├─────────────────────────────────────┤
│   Featured Restaurants Grid (4)      │
├─────────────────────────────────────┤
│    All Restaurants Near You Grid     │
├─────────────────────────────────────┤
│         Footer                       │
└─────────────────────────────────────┘
  + Cart Sidebar (Fixed Right)
```

#### Alternative Home Variants
- **Home1** (`/home1`): Filter-first layout with a left filter sidebar (categories, price, ratings), a prominent search-enabled hero, and a denser restaurant grid (5 columns on 2xl). Accent: teal/green-like `accent` palette. Animations: subtle hero entrance, card lift on hover, filter highlight transitions.

- **Home2** (`/home2`): Minimal and focused — large centered search hero, pill-style category chips, and a horizontal featured restaurants carousel above a compact grid. Accent: clean white/orange gradient. Animations: hero entrance fade/scale, carousel horizontal overscroll with smooth scroll behavior.

- **Home3** (`/home3`): List-first design — full-width banner, stacked restaurant list cards with larger imagery, and a right-hand map preview sidebar (desktop). Great for discovery and map-centric browsing. Animations: list staggered entrance, map placeholder with subtle hover states.

##### Header Component Details
**Visual Design:**
- Sticky position with glass effect: `glass border-b border-border/50`
- Logo with gradient: `from-primary to-orange-400`
- Height: 16px (mobile) / 20px (desktop)
- Search input with left icon (Search icon)

**Events & Interactions:**
1. **Logo Click** → Navigate to Home (`/`)
   - Animation: `whileHover={{ scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}`
   
2. **Location Button Hover** → Scale effect
   - Shows current location "123 Main Street"
   - Displays dropdown indicator
   
3. **Search Input**
   - Placeholder: "Search for restaurants, cuisines, or dishes..."
   - onChange: Updates `searchQuery` state
   - Background changes on focus: `focus:bg-white transition-colors`
   
4. **Cart Icon**
   - Shows cart count badge (dynamic)
   - Badge animation: `initial={{ scale: 0 }}`, `animate={{ scale: 1 }}`
   - Click → Navigate to `/cart`
   - Hover effect: `scale: 1.05`, `scale: 0.95` on tap
   
5. **Login Button**
   - Click → Navigate to `/login`
   - Mobile hidden (hidden md:block)
   - Hover/tap animations active

6. **Mobile Menu Button**
   - Hamburger icon toggle
   - AnimatePresence controls mobile menu visibility
   - X icon shows when menu open

##### Hero Section Details
**Visual Design:**
- Background gradient: `from-orange-50 via-background to-yellow-50`
- Absolute positioned blur circles for decorative effect
- Responsive grid layout (1 col mobile, 2 cols desktop)

**Animations:**
- Text content: `initial={{ opacity: 0, x: -30 }}`, `animate={{ opacity: 1, x: 0 }}`, `duration: 0.6`
- CTA buttons: Staggered with `transition={{ delay: i * 0.1 }}`
- Decorative circles: Floating background elements

**Events:**
- CTA Buttons (Sign Up, Browse Restaurants):
  - Hover: Button elevation effect
  - Click: Navigate to sign up or home scroll
  - Text color animation on hover

##### Restaurant Cards
**Visual Design:**
- Rounded-2xl cards with border and subtle shadow
- Image container with aspect ratio 4:3
- Gradient overlay on image (bottom dark, top transparent)
- Badge for offers (top-left, rounded-r-full)
- Featured badge (top-right)
- Rating and delivery time badges (bottom)

**Animations:**
- Entrance: `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, staggered `delay: index * 0.05`
- Hover: `whileHover={{ y: -8 }}` (lift up effect)
- Image zoom on hover: `group-hover:scale-110`, `transition-transform duration-500`
- Offer badge slide in: `initial={{ x: -100 }}`, `animate={{ x: 0 }}`
- Shadow enhancement: `hover:shadow-xl transition-all duration-300`

**Events:**
1. **Card Click** → Navigate to `/restaurant/{id}`
2. **Offer Badge** → Displays discount (e.g., "20% OFF")
3. **Rating Display** → Shows star icon with rating number
4. **Delivery Time** → Shows clock icon with time
5. **Distance & Delivery Fee** → Updates based on restaurant data
6. **Name Hover** → Color change to primary: `group-hover:text-primary`

##### Categories Component
**Visual Design:**
- Horizontal scrollable carousel
- Category cards with icons
- Centered title section

**Animations:**
- Cards fade in staggered
- Scroll smoothly on mobile
- Icon animations on category hover

**Events:**
- Category click filters restaurants
- Carousel scroll (horizontal)

##### Cart Sidebar
**Visual Design:**
- Fixed position (right side mobile, can be docked)
- Shows cart items summary
- Checkout button at bottom

**Animations:**
- Slide in from right on mobile when opened
- Item count badge pops in with animation

**Events:**
- View Cart button → Navigate to `/cart`
- Checkout button → Navigate to payment
- Item removal → Update store state
- Quantity change → Update cart total

##### Footer
**Visual Design:**
- Dark background with links
- Company info, policies, and social links
- Mobile responsive layout

**Events:**
- Link clicks → Navigate to respective pages
- Social icon clicks → Open external links

#### 2. **Login** (`/login`)
- **File:** `client/src/pages/Login.tsx`
- **Style:** Split-screen layout with image on left
- **Colors:** 
  - Left side: `from-primary/90 to-orange-600/90` gradient
  - Right side: Light background `from-orange-50 via-background to-yellow-50`
- **Features:** Email/password login, back button, sign-in form

##### Layout Structure
```
┌─────────────────┬─────────────────┐
│                 │                 │
│   Food Image    │  Login Form     │
│   (Hidden on    │  (Left-aligned) │
│    Mobile)      │                 │
│                 │                 │
└─────────────────┴─────────────────┘
```

##### Page Design Details
**Left Panel (Desktop Only):**
- Background: Image with gradient overlay `mix-blend-overlay`
- Absolute positioned content (centered)
- Logo: "F" in white, 80px size
- Heading: "Welcome Back!" with animation
- Description text with opacity

**Right Panel (Form Area):**
- Max width: 448px
- Padding: responsive (6px mobile, 48px desktop)
- Form container with white background

**Visual Elements:**
- Back button with ArrowLeft icon
- Logo (F) with gradient (hidden on desktop)
- Heading: "Sign In"
- Subheading: descriptive text

##### Animations
1. **Page Load:**
   - Left panel: `opacity: 0 → 1`, `y: 20 → 0` (staggered 0.2s delay)
   - Right panel (form): `opacity: 0 → 1`, `x: 20 → 0`
   - Duration: 0.6s

2. **Form Elements:**
   - Entrance: Fade in sequentially
   - Label animations
   - Input focus effects

3. **Button Interactions:**
   - Hover: Slight scale increase
   - Tap: Scale down for click feedback
   - Loading state: Spinner appears on submit

##### Events & Interactions
1. **Back Button Click**
   - Animation: `whileHover{{ scale: 1.02 }}`, `whileTap{{ scale: 0.98 }}`
   - Action: Navigate to `/`
   - Icon + Text layout

2. **Email Input**
   - Type: email
   - Placeholder: "you@example.com"
   - Icon: Mail (left-aligned inside input)
   - State: `[email, setEmail]`
   - onChange: Update email state
   - Focus: Border color changes to primary

3. **Password Input**
   - Type: password (toggle-able)
   - Placeholder: "••••••••"
   - Icon: Lock (left), Eye/EyeOff toggle (right)
   - State: `[password, setPassword]`, `[showPassword, setShowPassword]`
   - onChange: Update password state
   - Toggle Button Click: `setShowPassword(!showPassword)`
   - Shows Eye icon when hidden, EyeOff when visible
   - Focus: Border color changes

4. **Remember Me Checkbox**
   - Text label
   - State control
   - Hover effect

5. **Sign In Button**
   - Type: submit
   - Text: "Sign In"
   - Width: full (100%)
   - Animation: 
     - Hover: `scale: 1.02`
     - Tap: `scale: 0.98`
   - Background: Orange primary gradient
   - On Submit:
     - e.preventDefault()
     - Form validation (implied)
     - Alert: "Login functionality would connect to backend"

6. **Sign Up Link**
   - Text: "Don't have an account? Sign up"
   - Click: Navigate to `/signup`
   - Color: Primary accent

##### Form Styling
- Space between inputs: `space-y-5`
- Label styling: Dark text
- Input styling:
  - Height: 48px (h-12)
  - Rounded: 8px (rounded-lg)
  - Border: `border-border/50`
  - Background: White
  - Focus state: `focus:ring-2 focus:ring-primary`
- Button: Full width, orange gradient, shadow

#### 3. **Signup** (`/signup`)
- **File:** `client/src/pages/Signup.tsx`
- **Style:** Similar to Login page
- **Colors:** Light theme with primary orange/red accents
- **Features:** Registration form for new users

##### Layout & Design
- Same split-screen layout as Login
- Form with additional fields:
  - Full Name
  - Email
  - Phone
  - Password
  - Confirm Password
  - Terms & Conditions Checkbox

##### Animations & Events
- Same entrance animations as Login page
- Form field animations: Staggered entrance
- All input interactions same as Login
- Sign Up button with same hover/tap effects
- Already have account link → Navigate to `/login`

---

#### 4. **Forgot Password** (`/forgot-password`)
- **File:** `client/src/pages/ForgotPassword.tsx`
- **Style:** Light theme
- **Colors:** Orange primary theme
- **Features:** Password recovery flow

##### Layout
- Single column form
- Email/Phone input
- Verification code input (optional)
- Reset password inputs
- Recovery instructions

##### Events
- Email input + submit → Send recovery link
- Verification code input → Validate code
- New password inputs → Reset password
- Back to Login link → Navigate to `/login`

---

#### 5. **Restaurant Detail** (`/restaurant/:id`)
- **File:** `client/src/pages/Restaurant.tsx`
- **Style:** Light theme
- **Colors:** White cards with orange accents
- **Features:** Menu items, categories, restaurant info

##### Layout Structure
```
┌──────────────────────────────┐
│    Restaurant Header         │
│    (Image + Info)            │
├──────────────────────────────┤
│    Sticky Category Filter    │
├──────────────────────────────┤
│    Menu Items Grid/List      │
│    (with Cart buttons)       │
├──────────────────────────────┤
│    Reviews/Ratings (maybe)   │
└──────────────────────────────┘
  + Cart Sidebar (Fixed)
```

##### Animations
- Image parallax on scroll (if implemented)
- Menu items fade-in staggered
- Add to cart button press effect
- Quantity selector animation

##### Events
- Category filter click → Filter menu items
- Add to Cart button → Update cart state + toast notification
- Quantity change (±) → Update item quantity
- Item click → Show item details modal (optional)
- Back arrow → Navigate back to home

---

#### 6. **Cart** (`/cart`)
- **File:** `client/src/pages/Cart.tsx`
- **Style:** Light theme
- **Colors:** White background with orange CTAs
- **Features:** Order review and checkout

##### Layout Structure
```
┌────────────────────┬─────────────────┐
│   Cart Items       │  Order Summary  │
│   (Editable)       │  (Fixed Right)  │
│                    │                 │
│   - Remove         │  - Subtotal     │
│   - Qty Change     │  - Delivery Fee │
│   - Edit Item      │  - Tax          │
│                    │  - Total        │
│                    │  - Checkout Btn │
└────────────────────┴─────────────────┘
```

##### Events
- Quantity +/- buttons → Update cart item quantity
- Remove item button → Delete from cart + animation
- Edit item button → Open item detail modal
- Apply Coupon → Apply discount code
- Checkout button → Navigate to payment/checkout page
- Continue Shopping → Navigate to home
- Swipe/Drag to remove (mobile) → Delete item with animation

##### Animations
- Item entrance: Fade + slide-in
- Item exit (removal): Fade + slide-out + height collapse
- Quantity change: Subtle scale effect on number
- Checkout button: Pulsing effect when ready

---

#### 7. **Not Found** (`*`)
- **File:** `client/src/pages/not-found.tsx`
- **Style:** Error page
- **Features:** 404 error handling

##### Layout
- Centered content
- Large "404" heading
- Error message
- "Go Home" and "Contact Support" buttons

##### Events
- Go Home button → Navigate to `/`
- Contact Support link → Opens support modal/page
- Navigation to home with smooth transition

---

### Admin Portal

#### 1. **Admin Login** (`/admin/login`)
- **File:** `client/src/pages/AdminLogin.tsx`
- **Style:** Dark theme
- **Colors:**
  - Background: `from-slate-900 via-slate-800 to-slate-900` gradient
  - Logo Icon: `from-violet-500 to-purple-600` gradient
  - Input: `bg-slate-700/50 border-slate-600`
  - Button: `from-violet-500 to-purple-600` gradient
- **Features:**
  - Email and password inputs
  - Password visibility toggle
  - Navigation to delivery login
  - Back to home button

#### 2. **Admin Dashboard** (`/admin/dashboard`)
- **File:** `client/src/pages/AdminDashboard.tsx`
- **Style:** Dark theme with sidebar
- **Colors:**
  - Background: Slate-900
  - Sidebar: Slate-800/50
  - Active Nav: `bg-violet-500/20 text-violet-400`
  - Cards: Slate-800/50
  - Stat Icons: Multi-color gradients
- **Features:**
  - Revenue, Orders, Restaurants, Delivery Partners stats
  - Recent orders table
  - Top restaurants sidebar
  - Status badges with semantic colors
  - Responsive sidebar toggle
- **Layout:**
  - Left: Collapsible sidebar (64px/20px width)
  - Main: Header with search and profile
  - Content: Stats grid, orders table, restaurants widget

#### 3. **Admin Orders** (`/admin/orders`)
- **File:** `client/src/pages/AdminOrders.tsx`
- **Style:** Dark theme with tabs
- **Colors:** Slate-800/50 cards, status-based badges
- **Features:**
  - Tabs: All Orders, Pending, Preparing, In Transit, Delivered
  - Searchable orders table
  - Filter options
  - Order details with customer, restaurant, items, amount, driver, status

#### 4. **Admin Restaurants** (`/admin/restaurants`)
- **File:** `client/src/pages/AdminRestaurants.tsx`
- **Style:** Dark theme
- **Colors:** Slate theme with violet accents
- **Features:** Restaurant management, add new restaurant button

#### 5. **Admin Customers** (`/admin/customers`)
- **File:** `client/src/pages/AdminCustomers.tsx`
- **Style:** Dark theme
- **Colors:**
  - VIP Status: `bg-amber-500/10 text-amber-400`
  - Active: `bg-emerald-500/10 text-emerald-400`
  - Inactive: `bg-slate-500/10 text-slate-400`
- **Features:** Customer list, status filtering, search

#### 6. **Admin Delivery Partners** (`/admin/drivers`)
- **File:** `client/src/pages/AdminDrivers.tsx`
- **Style:** Dark theme
- **Colors:** Slate-800/50 with emerald for active/available status
- **Features:** Driver management, status tracking

#### 7. **Admin Analytics** (`/admin/analytics`)
- **File:** `client/src/pages/AdminAnalytics.tsx`
- **Style:** Dark theme with charts
- **Colors:**
  - Background: Slate-900
  - Cards: Slate-800/50
  - Chart Bars: Violet gradients
  - Revenue chart: `from-violet-600 to-violet-400`
  - Growth text: Emerald-400
  - Previous bars: Slate-600
- **Features:**
  - Revenue trend chart
  - Top restaurants revenue
  - Order distribution (Completed, In Progress, Cancelled)
  - Peak hours heatmap
  - KPI cards with trend indicators

#### 8. **Admin Settings** (`/admin/settings`)
- **File:** `client/src/pages/AdminSettings.tsx`
- **Style:** Dark theme with tabs
- **Colors:** Slate-800/50 cards, violet gradients for sections
- **Tabs:**
  - General (Business Information)
  - Security (Password, 2FA)
  - Notifications (Email, SMS, Push)
  - Billing (Enterprise plan details)
- **Features:** Settings management, notification preferences

---

### Delivery Partner Portal

#### 1. **Delivery Login** (`/delivery/login`)
- **File:** `client/src/pages/DeliveryLogin.tsx`
- **Style:** Dark theme (green theme)
- **Colors:**
  - Background: `from-emerald-900 via-emerald-800 to-teal-900` gradient
  - Logo Icon: `from-emerald-400 to-teal-500` gradient
  - Input: `bg-emerald-700/30 border-emerald-600/50`
  - Button: `from-emerald-400 to-teal-500` gradient
  - Text: Emerald-300/200
- **Features:**
  - Phone and password inputs
  - Benefits cards (Earn Daily, Flexible Hours, Support)
  - Navigation to admin login

#### 2. **Delivery Dashboard** (`/delivery/dashboard`)
- **File:** `client/src/pages/DeliveryDashboard.tsx`
- **Style:** Dark theme with green accents
- **Colors:**
  - Background: Slate-900
  - Sidebar: Slate-800/50
  - Active Route: Emerald-500
  - Status Badges: Emerald for active/available
  - Profile Avatar Border: `border-emerald-500`
- **Features:**
  - Driver profile with rating and avatar
  - Today's stats: Earnings, Trips, Hours, Rating
  - Recent deliveries list
  - Earnings display with balance card

#### 3. **Delivery Orders** (`/delivery/orders`)
- **File:** `client/src/pages/DeliveryOrders.tsx`
- **Style:** Dark theme
- **Colors:** Slate theme with emerald accents
- **Features:** Active delivery orders, order details, navigation instructions

#### 4. **Delivery Earnings** (`/delivery/earnings`)
- **File:** `client/src/pages/DeliveryEarnings.tsx`
- **Style:** Dark theme with earnings focus
- **Colors:**
  - Balance Card: `from-emerald-500 to-teal-600` gradient
  - Text: White on emerald background
- **Features:** 
  - Available balance display
  - Withdraw and history buttons
  - Earnings breakdown and chart

#### 5. **Delivery Profile** (`/delivery/profile`)
- **File:** `client/src/pages/DeliveryProfile.tsx`
- **Style:** Dark theme
- **Colors:** Slate-800/50 cards
- **Features:** Profile management, documents, bank details

---

## 📁 Component Hierarchy

### Layout Components
- **AdminLayout** (`components/AdminLayout.tsx`) - Shared admin sidebar layout
- **Header** (`components/Header.tsx`) - Top navigation
- **Footer** (`components/Footer.tsx`) - Footer section
- **CartSidebar** (`components/CartSidebar.tsx`) - Shopping cart sidebar

### Feature Components
- **Hero** (`components/Hero.tsx`) - Landing page hero
- **Categories** (`components/Categories.tsx`) - Restaurant categories
- **RestaurantGrid** (`components/RestaurantGrid.tsx`) - Restaurant listings
- **RestaurantCard** (`components/RestaurantCard.tsx`) - Individual restaurant card
- **MenuItemCard** (`components/MenuItemCard.tsx`) - Menu item display

### UI Components (Shadcn)
Located in `components/ui/`:
- Button, Input, Label, Badge
- Card, Tabs, Table
- Dialog, Drawer, Popover
- Select, Checkbox, Radio Group
- Toast, Toaster (notifications)
- Avatar, Badge
- Accordion, Collapsible
- Breadcrumb, Pagination
- Skeleton, Spinner
- Separator, Sheet, Sidebar

---

## 🎯 Styling Patterns

### Button Variants
- **Default:** Primary orange/red gradient
- **Outline:** Transparent with border
- **Secondary:** Yellow/secondary color
- **Destructive:** Red/error color
- **Ghost:** Text-only, subtle background on hover

### Card Styling
```
bg-[background-color]/50 rounded-2xl border border-[border-color]/50 p-5-6 shadow-lg
```

### Input Styling
```
bg-[color]/50 border-[border-color] rounded-xl text-white placeholder:text-[color]/50
```

### Gradient Patterns
- **Backgrounds:** `from-[primary] via-[secondary] to-[tertiary]`
- **Text Gradient:** Uses `.text-gradient` utility
- **Icon Gradient:** Backgrounds for stat icons

### Dark Theme Elements
- **Sidebar:** Slate-800/50 with 50% opacity for glass effect
- **Cards:** Slate-800/50 for content areas
- **Borders:** Slate-700/50 for subtle dividers
- **Text:** White (#ffffff) on dark backgrounds
- **Muted Text:** Slate-400 or Slate-500

### Light Theme Elements
- **Background:** Gradient from orange to yellow
- **Cards:** White with subtle shadows
- **Borders:** Slate-200 or custom border colors
- **Text:** Dark foreground (20° 20% 15%)
- **Accents:** Orange/red primary colors

---

## 🔗 Navigation Links

### Public Routes
```
/ → Home
/login → User Login
/signup → User Sign Up
/forgot-password → Password Recovery
/restaurant/:id → Restaurant Detail
/cart → Shopping Cart
/admin/login → Admin Login Portal
/delivery/login → Delivery Partner Login
```

### Admin Routes
```
/admin/login → Admin Portal Entry
/admin/dashboard → Dashboard Overview
/admin/orders → Orders Management
/admin/restaurants → Restaurants Management
/admin/customers → Customers Management
/admin/drivers → Delivery Partners Management
/admin/analytics → Business Analytics
/admin/settings → Admin Settings
```

### Delivery Routes
```
/delivery/login → Delivery Partner Login
/delivery/dashboard → Delivery Dashboard
/delivery/orders → Active Orders
/delivery/earnings → Earnings & Balance
/delivery/profile → Profile Management
```

---

## 🎬 Animation Library

**Framer Motion** is used throughout for:
- Page transitions: `initial`, `animate`, `transition`
- Hover effects: `whileHover={{ scale, x }}`, `whileTap`
- Staggered animations: `transition={{ delay: i * 0.1 }}`
- Motion components: `<motion.div>`, `<motion.button>`

Example patterns:
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.2, duration: 0.6 }}
```

---

## 📊 Key Features by Page

### Home Page
- Featured and all restaurants display
- Category filtering
- Add to cart functionality
- Cart sidebar preview
- Header navigation

### Admin Dashboard
- KPI cards with trend indicators
- Recent orders table
- Top restaurants widget
- Responsive sidebar
- Search functionality

### Admin Orders
- Tabbed order filtering (All, Pending, Preparing, In Transit, Delivered)
- Status-based color coding
- Customer and driver info
- Search and filter options

### Admin Portal Detailed Pages

[Detailed Admin Portal content with all 8 pages' layouts, events, and animations...]

---

### Delivery Partner Portal

#### 1. **Delivery Login** (`/delivery/login`)
- **File:** `client/src/pages/DeliveryLogin.tsx`
- **Style:** Dark theme (green theme)
- **Colors:**
  - Background: `from-emerald-900 via-emerald-800 to-teal-900` gradient
  - Logo Icon: `from-emerald-400 to-teal-500` gradient
  - Input: `bg-emerald-700/30 border-emerald-600/50`
  - Button: `from-emerald-400 to-teal-500` gradient
  - Text: Emerald-300/200
- **Features:**
  - Phone and password inputs
  - Benefits cards (Earn Daily, Flexible Hours, Support)
  - Navigation to admin login

##### Layout Structure
```
┌─────────────────────────────────┐
│     Centered Form Card          │
│  ┌───────────────────────────┐  │
│  │   Logo (Bike icon)        │  │
│  │   Delivery Partner        │  │
│  │   Subtitle                │  │
│  │                           │  │
│  │   Phone Input             │  │
│  │   Password Input          │  │
│  │                           │  │
│  │   Start Delivering Button │  │
│  │                           │  │
│  │   Benefits Cards (Grid)   │  │
│  │   💰 Earn Daily          │  │
│  │   ⏰ Flexible Hours       │  │
│  │   🤝 24/7 Support        │  │
│  └───────────────────────────┘  │
│                                 │
│   Admin Login Link              │
└─────────────────────────────────┘
```

##### Animations
1. **Page Entry:**
   - Form card: `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`
   - Duration: 0.6s

2. **Logo Icon:**
   - Scale animation: `initial={{ scale: 0.8 }}`, `animate={{ scale: 1 }}`
   - Glow shadow: `shadow-lg shadow-emerald-500/30`

3. **Button:**
   - Hover: `scale: 1.02`
   - Tap: `scale: 0.98`

##### Events & Interactions
1. **Back Button** → Navigate to `/`
2. **Phone Input**
   - Placeholder: "+1 (555) 000-0000"
   - Icon: Phone
   - onChange: Update phone state
   - Focus: Border becomes emerald-400
3. **Password Input**
   - Toggle visibility: Eye icon
   - onChange: Update password state
4. **Start Delivering Button**
   - onClick: Validate + Navigate to `/delivery/dashboard`
   - Colors: Emerald-400 to Teal-500 gradient
   - Text color on button: Emerald-900 (dark on light)
5. **Benefits Cards**
   - 3 cards in grid below form
   - Emoji + label per card
   - Static info display
6. **Admin Portal Link**
   - Text: "Restaurant Admin? Login here"
   - Click → Navigate to `/admin/login`

---

#### 2. **Delivery Dashboard** (`/delivery/dashboard`)
- **File:** `client/src/pages/DeliveryDashboard.tsx`
- **Style:** Dark theme with green accents
- **Colors:**
  - Background: Slate-900
  - Sidebar: Slate-800/50
  - Active Route: Emerald-500
  - Status Badges: Emerald for active/available
  - Profile Avatar Border: `border-emerald-500`
- **Features:**
  - Driver profile with rating and avatar
  - Today's stats: Earnings, Trips, Hours, Rating
  - Recent deliveries list
  - Earnings display with balance card

##### Layout Structure
```
┌──────────────────────────────────┐
│   Sticky Header                  │
│   (Profile + Notifications)      │
├──────────────────────────────────┤
│                                  │
│   Profile Card (Earnings, etc.)  │
│                                  │
│   Today's Stats (4 cards)        │
│   ┌─────┐ ┌─────┐               │
│   │Earn │ │Trips│               │
│   └─────┘ └─────┘               │
│   ┌─────┐ ┌─────┐               │
│   │Hours│ │Rate │               │
│   └─────┘ └─────┘               │
│                                  │
│   Recent Deliveries List        │
│                                  │
│   Map Integration (implied)      │
│                                  │
└──────────────────────────────────┘
```

##### Header Component
**Visual:**
- Profile section (left): Avatar with border-emerald-500, name "Raj Kumar", rating with stars
- Sticky top: Backdrop blur
- Right section: Bell icon (notification with emerald dot)

**Events:**
- Profile click → View/edit profile
- Bell icon → Show notifications

##### Profile Section
**Visual:**
- Avatar: Border 2px emerald-500, "RK" initials
- Name: "Raj Kumar" (white)
- Rating: Star icon (yellow-400) + "4.92"
- Status: "Active" or "Offline" badge

##### Today's Stats Grid
**Layout:** 4 columns (responsive 2 cols mobile)
**Stat Cards:**

1. **Earnings (Today)**
   - Icon: DollarSign (emerald-400)
   - Value: Large number (e.g., "₹1,245")
   - Label: "Earnings"
   - Animated: Color coded

2. **Trips (Today)**
   - Icon: Package (blue-400)
   - Value: Large number (e.g., "12")
   - Label: "Trips"

3. **Hours (Worked)**
   - Icon: Clock (amber-400)
   - Value: Large number (e.g., "8.5")
   - Label: "Hours"

4. **Rating (Current)**
   - Icon: Star (yellow-400)
   - Value: Rating number (e.g., "4.92")
   - Label: "Rating"

**Card Styling:**
- Dark background: `bg-slate-800/50 rounded-2xl p-3`
- Text center aligned
- Border: `border-slate-700/50`

**Animations:**
- Load: `initial={{ opacity: 0, scale: 0.9 }}`, `animate={{ opacity: 1, scale: 1 }}`
- Staggered: `transition={{ delay: i * 0.1 }}`

##### Recent Deliveries List
**Layout:** Cards stacked vertically, scrollable

**Delivery Item Card:**
```
┌──────────────────────────────────┐
│ Status Badge  │  Time (8 mins ago)
│                                  │
│ Restaurant → Customer Address    │
│ Amount: ₹349                    │
│                                  │
│ [View Details]  [Track]          │
└──────────────────────────────────┘
```

**Data per delivery:**
- Status: Badge with color (Delivered, Pending, In Transit)
- Time: Relative time
- From (Restaurant): Restaurant name
- To (Customer): Delivery address (truncated)
- Amount: Order value
- Action buttons

**Status Colors:**
- Delivered: Green/emerald
- In Transit: Blue
- Pending: Yellow/amber

**Events:**
- View Details button → Show delivery details modal
- Track button → Show live tracking map
- Swipe (mobile) → Actions reveal (edit/cancel)

---

#### 3. **Delivery Orders** (`/delivery/orders`)
- **File:** `client/src/pages/DeliveryOrders.tsx`
- **Style:** Dark theme
- **Colors:** Slate theme with emerald accents
- **Features:** Active delivery orders, order details, navigation instructions

##### Layout
- Similar sidebar to dashboard
- Active orders list/map view toggle
- Order cards with:
  - Pickup location + address
  - Delivery location + address
  - Customer info + phone
  - Navigation button (Google Maps/Apple Maps)
  - Pickup/Delivery instructions
  - Order value
  - Accept/Reject buttons (if not accepted)

##### Events
- Map view toggle → Switch between list and map
- Order card click → Expand full details
- Navigation button → Open maps app with directions
- Accept button → Confirm order + Update status
- Reject button → Decline order
- Call customer → Open phone dialer
- Pickup time → Timer to pickup deadline

---

#### 4. **Delivery Earnings** (`/delivery/earnings`)
- **File:** `client/src/pages/DeliveryEarnings.tsx`
- **Style:** Dark theme with earnings focus
- **Colors:**
  - Balance Card: `from-emerald-500 to-teal-600` gradient
  - Text: White on emerald background
- **Features:** 
  - Available balance display
  - Withdraw and history buttons
  - Earnings breakdown and chart

##### Layout Structure
```
┌──────────────────────────────────┐
│  Balance Card (Gradient)         │
│  ┌────────────────────────────┐  │
│  │ Available Balance          │  │
│  │ ₹10,670                    │  │
│  │                            │  │
│  │ [Withdraw] [History]       │  │
│  └────────────────────────────┘  │
├──────────────────────────────────┤
│  Earnings Breakdown              │
│  - Today: ₹1,245                │
│  - This Week: ₹8,960            │
│  - This Month: ₹35,420          │
├──────────────────────────────────┤
│  Earnings Chart                  │
│  (Line/Bar chart - 7 days)       │
├──────────────────────────────────┤
│  Payment Methods                 │
│  - Bank Account                 │
│  - Wallet                       │
└──────────────────────────────────┘
```

##### Balance Card
**Visual:**
- Background: `from-emerald-500 to-teal-600` gradient
- Rounded: `rounded-3xl`
- Padding: `p-6`
- Shadow: `shadow-lg shadow-emerald-500/20`

**Content:**
- Label: "Available Balance" (emerald-100, text-sm)
- Amount: "₹10,670" (text-4xl font-bold white)
- Margin bottom: `mb-4`

**Action Buttons:**
- Layout: Flex with gap-3
- **Withdraw Button:**
  - Icon: CreditCard
  - Text: "Withdraw"
  - Background: `bg-white/20 hover:bg-white/30`
  - Backdrop: `backdrop-blur-sm`
  - Rounded: `rounded-xl`
  - Height: `h-11`
  - Flex: flex-1

- **History Button:**
  - Icon: Clock
  - Text: "History"
  - Same styling as Withdraw

**Animations:**
- Card entrance: `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`
- Button hover: Slight transparency increase

##### Earnings Breakdown
**Layout:** 3 cards side-by-side (or stacked mobile)

**Breakdown Items:**
1. **Today's Earnings**
   - Value: ₹1,245
   - Trend: +5% vs yesterday (if tracking)
   
2. **Weekly Earnings**
   - Value: ₹8,960
   - Breakdown by day (implied)
   
3. **Monthly Earnings**
   - Value: ₹35,420
   - Progress toward goal (optional)

**Card Styling:**
- Dark background: `bg-slate-800/50`
- Border: `border-slate-700/50`
- Padding: `p-4` or `p-6`
- Rounded: `rounded-2xl`

##### Earnings Chart
**Chart Type:** Line or bar chart
**Time Period:** Last 7 days
**X-axis:** Days (Mon-Sun or dates)
**Y-axis:** Earnings amount

**Visual:**
- Line connects daily earnings points
- Color: Emerald-500
- Fill under line: Emerald-500 with opacity
- Point markers: Circles or dots

**Animations:**
- Line draws on load: Path animation
- Points appear with stagger

**Events:**
- Hover point → Show exact amount tooltip
- Click point → Show day breakdown

##### Payment Methods
**Methods:**
1. **Bank Account**
   - Bank name display
   - Account last 4 digits
   - Edit/Remove buttons
   
2. **Wallet**
   - Balance display
   - Add money button

**Events:**
- Add payment method → Form modal opens
- Edit → Update method
- Remove → Confirmation then delete
- Set as default → Update preferred method

---

#### 5. **Delivery Profile** (`/delivery/profile`)
- **File:** `client/src/pages/DeliveryProfile.tsx`
- **Style:** Dark theme
- **Colors:** Slate-800/50 cards
- **Features:** Profile management, documents, bank details

##### Layout
- Profile photo + name + status
- Basic info section
  - Full name
  - Phone
  - Email
  - Vehicle type
  - Vehicle number
  - License number
  - Insurance expiry
  
- Documents section
  - ID proof upload
  - License upload
  - Insurance document upload
  - Clearance certificate upload
  - Status indicators (Verified, Pending, Expired)
  
- Bank Details
  - Account holder name
  - Account number
  - IFSC code
  - Bank name
  - Account type (Savings/Current)
  - Edit button

##### Events
- Photo click → Upload new photo
- Edit name/info → Form modal
- Upload document → File input + validation + upload
- Document status → Show tooltip with verification info
- Edit bank details → Form opens
- Save changes → API call + toast notification

---

## 🎬 Detailed Animation Patterns

### Page Entrance Animations
```tsx
// Standard page load
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}

// List items (staggered)
transition={{ delay: index * 0.1 }}

// Faster entrance (modals)
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}
```

### Hover Interactions
```tsx
// Card lift effect
whileHover={{ y: -8 }}
transition={{ duration: 0.2 }}

// Button scale
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}

// Icon animations
whileHover={{ rotate: 10 }}
whileTap={{ scale: 0.95 }}
```

### Exit Animations
```tsx
// Item removal (slide out)
initial={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: 100 }}
transition={{ duration: 0.3 }}

// Page transition (fade out)
exit={{ opacity: 0 }}
transition={{ duration: 0.2 }}
```

### State Change Animations
```tsx
// Badge appears
initial={{ scale: 0 }}
animate={{ scale: 1 }}

// Input focus
transition={{ duration: 0.2 }}
focus:scale-105 (CSS approach)
```

---

## 🎯 Common UI Patterns

### Status Indicators
- **Badges:** Colored background + text (semantic colors)
- **Dots:** Small circles (online/offline status)
- **Icons:** Check/X/pending icons
- **Text:** Label + subtext

### Form Validation
- **Real-time:** onChange triggers validation
- **On Submit:** preventDefault + validate all fields
- **Error Display:** Below input with message + red color
- **Success:** Green checkmark or toast

### Loading States
- **Spinners:** Center page or inline
- **Skeleton:** Placeholder cards
- **Disabled buttons:** Opacity + pointer-events-none
- **Toast notifications:** Success/error/info messages

### Empty States
- **Icon:** Large illustrative icon
- **Message:** "No data found" text
- **CTA:** "Create new" or "Go back" button

---

## 🛠️ Development Commands

```bash
npm run dev:client      # Start dev server on port 5000
npm run dev             # Start full dev environment
npm run build           # Build for production
npm run start           # Start production server
npm run check           # TypeScript type checking
npm run db:push         # Push database schema
```

---

## 📦 Key Dependencies

- **React 19.2** - UI framework
- **Vite 7.1.9** - Build tool
- **Tailwind CSS 4.1.14** - Utility-first CSS
- **TypeScript 5.6.3** - Type safety
- **React Query 5.60.5** - Data fetching & caching
- **Framer Motion 4.x** - Animations
- **Lucide Icons** - Icon library
- **Radix UI** - Headless UI components
- **Wouter** - Lightweight routing

---

## 📝 Notes

- All admin pages use dark theme (Slate-900 background)
- Delivery partner pages use dark emerald/teal theme
- Public pages use light theme with orange/yellow gradients
- Status badges follow semantic color conventions (green=success, blue=info, amber=warning, red=error)
- Sidebar navigation is consistent across admin and delivery portals
- Responsive design uses Tailwind breakpoints (md:, lg:, xl:)
- All animations use Framer Motion for smooth, performance-optimized effects
- Forms include real-time validation with visual feedback
- Toast notifications provide user feedback for actions




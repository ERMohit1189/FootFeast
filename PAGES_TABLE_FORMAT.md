# FoodDash - Pages Reference (Tabular Format)

## 📑 Quick Navigation

1. [Public Pages](#public-pages)
2. [Admin Portal Pages](#admin-portal-pages)
3. [Delivery Portal Pages](#delivery-portal-pages)
4. [Animations Reference](#animations-reference)
5. [Events & Interactions](#events--interactions)

---

## Public Pages

### 1. Home Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/` |
| **File** | `client/src/pages/Home.tsx` |
| **Theme** | Light |
| **Background Gradient** | `from-orange-50 via-background to-yellow-50` |
| **Primary Color** | Orange/Red (`#ff6b35` approx) |
| **Text Color** | Dark foreground |

#### Header Component

| Element | Details |
|---------|---------|
| **Position** | Sticky top (z-50) |
| **Background** | Glass effect with backdrop blur |
| **Height** | 16px mobile, 20px desktop |
| **Logo** | F icon in gradient box `from-primary to-orange-400` |
| **Logo Size** | 40px × 40px (w-10 h-10) |
| **Search** | Rounded full, max-width 448px, placeholder "Search..." |
| **Cart Icon** | Shows count badge (dynamic) |
| **Login Button** | Outline variant, rounded-full |

#### Header Events

| Event | Action | Animation |
|-------|--------|-----------|
| **Logo Click** | Navigate to `/` | `scale: 1.02 → 0.98` |
| **Search Focus** | Show search results | Background: `muted → white` |
| **Cart Icon Click** | Navigate to `/cart` | `scale: 1.05 → 0.95` |
| **Cart Count Update** | Badge appears | `initial scale: 0 → animate: 1` |
| **Location Button Hover** | Highlight location | `scale: 1.02` |
| **Login Button Click** | Navigate to `/login` | Button press effect |
| **Mobile Menu Toggle** | Open/close menu | Hamburger to X icon animation |

#### Hero Section

| Property | Value |
|----------|-------|
| **Background** | Gradient `from-orange-50 via-background to-yellow-50` |
| **Layout** | 1 col mobile, 2 cols desktop |
| **Title Animation** | `opacity: 0 → 1`, `x: -30 → 0`, `duration: 0.6s` |
| **CTA Buttons** | Staggered entrance `delay: i * 0.1s` |
| **Decorative Elements** | Floating blur circles (absolute positioned) |

#### Hero Events

| Button | Action | Transition |
|--------|--------|-----------|
| **Sign Up CTA** | Navigate to `/signup` | Button scale hover effect |
| **Browse Restaurants** | Scroll to restaurants section | Smooth scroll |
| **Button Hover** | Scale up + shadow | `duration: 0.2s` |

#### Restaurant Card Component

| Property | Details |
|----------|---------|
| **Card Dimensions** | Rounded-2xl, aspect ratio 4:3 (image) |
| **Background** | White card with subtle shadow |
| **Image Overlay** | Gradient dark (bottom) transparent (top) |
| **Badge (Offer)** | Top-left, `bg-primary`, rounded-r-full |
| **Badge (Featured)** | Top-right, secondary color |
| **Rating Badge** | Bottom-left, white background with star |
| **Delivery Time Badge** | Bottom-right, white background with clock |

#### Restaurant Card Animations

| Animation | Initial | Final | Duration |
|-----------|---------|-------|----------|
| **Card Entrance** | `opacity: 0, y: 20` | `opacity: 1, y: 0` | `0.4s` |
| **Stagger Delay** | - | - | `index * 0.05s` |
| **Card Hover** | `y: 0` | `y: -8` | `0.2s` |
| **Image Zoom** | `scale: 1` | `scale: 1.1` | `0.5s` |
| **Offer Badge** | `x: -100` | `x: 0` | `0.3s` |
| **Shadow** | subtle | `shadow-xl` | `0.3s` |

#### Restaurant Card Events

| Event | Trigger | Action |
|-------|---------|--------|
| **Card Click** | Click card | Navigate to `/restaurant/{id}` |
| **Hover** | Mouse over | Lift up + image zoom + shadow increase |
| **Name Hover** | Mouse over name | Text color → primary |
| **Offer Badge** | Load | Slide in from left |
| **Rating Display** | Load | Show star + rating number |
| **Delivery Time** | Load | Show clock + time |

#### Categories Component

| Feature | Details |
|---------|---------|
| **Layout** | Horizontal scrollable carousel |
| **Item Count** | Multiple category cards |
| **Icon Size** | 40×40 pixels |
| **Card Animation** | Fade in staggered |
| **Scroll Behavior** | Smooth horizontal scroll |

#### Categories Events

| Event | Result |
|-------|--------|
| **Category Click** | Filter restaurants by category |
| **Carousel Scroll** | Navigate through categories |
| **Hover Effect** | Scale + shadow |

#### Cart Sidebar

| Property | Value |
|----------|-------|
| **Position** | Fixed right (mobile overlay, dock on desktop) |
| **Width** | Full on mobile, ~350px on desktop |
| **Background** | White or glass effect |
| **Z-index** | 40 |
| **Animation** | Slide in from right |

#### Cart Sidebar Events

| Event | Action |
|-------|--------|
| **Add to Cart** | Item appears with animation + count updates |
| **View Cart** | Navigate to `/cart` |
| **Checkout** | Navigate to payment page |
| **Remove Item** | Item slides out + height collapse |
| **Quantity Change** | Update total + animate number |

#### Footer

| Section | Content |
|---------|---------|
| **Company Info** | Name, tagline, description |
| **Quick Links** | Home, About, Blog, Careers |
| **Policy Links** | Privacy, Terms, Safety |
| **Social Links** | Facebook, Twitter, Instagram, LinkedIn |
| **Payment Methods** | Credit cards, UPI, Wallet icons |

---

### 2. Login Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/login` |
| **File** | `client/src/pages/Login.tsx` |
| **Layout** | Split-screen (image left, form right) |
| **Image Side** | Desktop only (`hidden lg:flex`) |
| **Image Gradient** | `from-primary/90 to-orange-600/90` |
| **Form Side** | `from-orange-50 via-background to-yellow-50` |

#### Login Form Layout

| Section | Component |
|---------|-----------|
| **Back Button** | ArrowLeft icon + text, hover animation |
| **Logo** | F icon (hidden on desktop) |
| **Heading** | "Sign In" (text-3xl font-bold) |
| **Subheading** | Descriptive text (muted color) |
| **Email Input** | Mail icon, type: email |
| **Password Input** | Lock icon + Eye toggle |
| **Remember Me** | Checkbox |
| **Submit Button** | Full width, primary gradient |
| **Sign Up Link** | Navigation to `/signup` |

#### Login Form Fields

| Field | Type | Placeholder | Icon | Validation |
|-------|------|-------------|------|-----------|
| **Email** | email | you@example.com | Mail | Required, valid email |
| **Password** | password | •••••••• | Lock + Eye | Min 6 chars |

#### Login Button & Events

| Element | Event | Behavior |
|---------|-------|----------|
| **Back Button** | Click | Navigate `/` with animation |
| **Email Input** | Focus | Border color → primary |
| **Email Input** | Change | Update state |
| **Password Toggle** | Click | Switch Eye ↔ EyeOff |
| **Password Toggle** | Click | Input type: password ↔ text |
| **Sign In Button** | Hover | `scale: 1.02` |
| **Sign In Button** | Tap | `scale: 0.98` |
| **Sign In Button** | Submit | Prevent default + validate + navigate |

#### Login Form Animations

| Element | Initial | Animate | Duration |
|---------|---------|---------|----------|
| **Page** | - | - | - |
| **Left Panel** | `opacity: 0` | `opacity: 1` | `0.6s` |
| **Right Panel (Form)** | `opacity: 0, x: 20` | `opacity: 1, x: 0` | `0.6s` |
| **Form Title** | `opacity: 0, y: 20` | `opacity: 1, y: 0` | `0.4s` |

---

### 3. Signup Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/signup` |
| **File** | `client/src/pages/Signup.tsx` |
| **Layout** | Same as Login (split-screen) |
| **Additional Fields** | Full Name, Phone, Confirm Password |
| **Terms Checkbox** | Required to proceed |

#### Signup Form Fields

| Field | Type | Placeholder | Validation |
|-------|------|-------------|-----------|
| **Full Name** | text | John Doe | Required, min 2 chars |
| **Email** | email | you@example.com | Required, valid email |
| **Phone** | tel | +1 (555) 000-0000 | Required, valid phone |
| **Password** | password | •••••••• | Min 8 chars, 1 uppercase, 1 number |
| **Confirm Password** | password | •••••••• | Must match password |
| **Terms** | checkbox | I agree to terms | Must be checked |

#### Signup Events

| Event | Result |
|-------|--------|
| **Submit Form** | Validate all fields + Create account |
| **Email Exists** | Show error: "Email already registered" |
| **Password Mismatch** | Show error: "Passwords don't match" |
| **Sign In Link** | Navigate to `/login` |

---

### 4. Forgot Password Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/forgot-password` |
| **File** | `client/src/pages/ForgotPassword.tsx` |
| **Layout** | Single column form |
| **Theme** | Light with orange accents |
| **Steps** | 1. Enter email 2. Verify code 3. Reset password |

#### Forgot Password Flow

| Step | Fields | Button | Result |
|------|--------|--------|--------|
| **Step 1** | Email input | Send Reset Link | Email verification sent |
| **Step 2** | 6-digit code input | Verify Code | Code validated |
| **Step 3** | New Password + Confirm | Reset Password | Password updated + redirect to login |

#### Forgot Password Events

| Event | Action |
|-------|--------|
| **Send Link** | Email sent confirmation |
| **Resend Link** | Countdown timer (60s) |
| **Verify Code** | Check code + enable step 3 |
| **Code Expired** | Show error + offer resend |
| **Reset Success** | Toast notification + navigate to login |

---

### 5. Restaurant Detail Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/restaurant/:id` |
| **File** | `client/src/pages/Restaurant.tsx` |
| **Theme** | Light |
| **Dynamic Content** | Restaurant data loaded from params |

#### Restaurant Detail Layout

| Section | Content |
|---------|---------|
| **Header** | Restaurant image, name, rating, delivery info |
| **Info Bar** | Distance, delivery fee, delivery time, call button |
| **Category Tabs** | Sticky, horizontal scrollable |
| **Menu Grid** | Menu items with images, names, prices |
| **Item Card** | Image, name, description, price, add button |
| **Cart Sidebar** | Fixed right, shows cart items |

#### Restaurant Info Events

| Button | Action |
|--------|--------|
| **Back Arrow** | Navigate back / to home |
| **Call Button** | Open phone dialer (tel: link) |
| **Share Button** | Share restaurant link |
| **Category Tab** | Filter menu items by category |

#### Menu Item Card Events

| Event | Result |
|-------|--------|
| **Add to Cart** | Show quantity selector + add to cart |
| **Item Click** | Show modal with full details |
| **Quantity +** | Increase quantity + update price |
| **Quantity -** | Decrease quantity (min 1) |
| **Remove** | Remove from cart |

#### Menu Item Animation

| Animation | Initial | Final | Duration |
|-----------|---------|-------|----------|
| **Item Load** | `opacity: 0, y: 20` | `opacity: 1, y: 0` | `0.4s` |
| **Quantity Change** | `scale: 1` | `scale: 1.05` | `0.2s` |
| **Add to Cart** | Pulse effect | - | `0.3s` |

---

### 6. Cart Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/cart` |
| **File** | `client/src/pages/Cart.tsx` |
| **Layout** | 2 columns (items left, summary right) |
| **Theme** | Light |
| **Mobile Layout** | Stacked (items top, summary bottom) |

#### Cart Layout

| Section | Content |
|---------|---------|
| **Cart Items** | List of selected items with details |
| **Item Row** | Image, name, qty controls, price, remove |
| **Order Summary** | Subtotal, delivery, tax, total, checkout |
| **Empty State** | Icon + message + continue shopping button |

#### Cart Item Controls

| Control | Action | Animation |
|---------|--------|-----------|
| **Quantity +** | Increase qty by 1 | `scale: 1.05` |
| **Quantity -** | Decrease qty (min 1) | `scale: 0.95` |
| **Remove Button** | Delete item | Slide out + collapse |
| **Edit Item** | Open item modal | Modal enter animation |

#### Cart Events

| Event | Result |
|-------|--------|
| **Remove Item** | Item exits with animation + total updates |
| **Qty Change** | Subtotal recalculates + updates |
| **Apply Coupon** | Validate code + apply discount |
| **Coupon Valid** | Show discount amount + update total |
| **Coupon Invalid** | Show error: "Invalid coupon" |
| **Checkout** | Navigate to payment page |
| **Continue Shopping** | Navigate to home / restaurant |

#### Cart Animations

| Animation | Trigger | Duration |
|-----------|---------|----------|
| **Item Enter** | Add to cart | `0.3s` fade + slide-in |
| **Item Exit** | Remove from cart | `0.3s` fade + slide-out |
| **Total Update** | Amount change | Number animate `duration: 0.5s` |
| **Qty Change** | +/- click | Icon bounce `duration: 0.2s` |

---

## Admin Portal Pages

### 1. Admin Login Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/admin/login` |
| **File** | `client/src/pages/AdminLogin.tsx` |
| **Theme** | Dark |
| **Background Gradient** | `from-slate-900 via-slate-800 to-slate-900` |
| **Primary Accent** | Violet-500 to Purple-600 |
| **Card Background** | `bg-slate-800/50 backdrop-blur-xl` |

#### Admin Login Form

| Field | Type | Placeholder | Icon |
|-------|------|-------------|------|
| **Email** | email | admin@fooddash.com | Mail |
| **Password** | password | •••••••• | Lock + Eye |

#### Admin Login Events

| Event | Action | Animation |
|-------|--------|-----------|
| **Back Button** | Navigate to `/` | Slide animation |
| **Email Focus** | Border → violet-500 | Smooth transition |
| **Password Toggle** | Eye ↔ EyeOff | Icon swap |
| **Sign In Submit** | Navigate `/admin/dashboard` | Button press effect |
| **Delivery Link** | Navigate `/delivery/login` | Text link hover |

#### Admin Login Styling

| Element | Class/Style |
|---------|------------|
| **Card** | `rounded-3xl p-8 shadow-2xl` |
| **Button** | `from-violet-500 to-purple-600 rounded-xl h-12` |
| **Input** | `bg-slate-700/50 border-slate-600 rounded-xl` |
| **Security Notice** | `bg-slate-700/30 rounded-xl p-4` |

---

### 2. Admin Dashboard

| Attribute | Details |
|-----------|---------|
| **Route** | `/admin/dashboard` |
| **File** | `client/src/pages/AdminDashboard.tsx` |
| **Layout** | Sidebar + main content |
| **Sidebar Width** | 256px (open), 80px (collapsed) |
| **Theme** | Dark slate-900 |

#### Sidebar Navigation

| Nav Item | Icon | Route | Active Color |
|----------|------|-------|-------------|
| **Dashboard** | LayoutDashboard | `/admin/dashboard` | `bg-violet-500/20 text-violet-400` |
| **Orders** | ShoppingBag | `/admin/orders` | Same |
| **Restaurants** | Store | `/admin/restaurants` | Same |
| **Customers** | Users | `/admin/customers` | Same |
| **Delivery Partners** | Bike | `/admin/drivers` | Same |
| **Analytics** | TrendingUp | `/admin/analytics` | Same |
| **Settings** | Settings | `/admin/settings` | Same |
| **Logout** | LogOut | `/` | - |

#### Admin Header

| Component | Details |
|-----------|---------|
| **Sticky** | `bg-slate-900/80 backdrop-blur-xl` |
| **Search** | Width 320px, placeholder "Search orders, restaurants..." |
| **Notifications** | Bell icon with red dot |
| **Profile** | Avatar "AD", name "Admin User", role "Super Admin" |

#### Stat Cards Layout

| Card # | Stat | Icon | Gradient Color | Trend |
|--------|------|------|----------------|-------|
| **1** | Total Revenue | DollarSign | `from-emerald-500 to-green-600` | +12.5% ↑ |
| **2** | Active Orders | ShoppingBag | `from-blue-500 to-cyan-600` | +8.2% ↑ |
| **3** | Total Restaurants | Store | `from-violet-500 to-purple-600` | +3.1% ↑ |
| **4** | Delivery Partners | Bike | `from-orange-500 to-amber-600` | -2.4% ↓ |

#### Stat Card Properties

| Property | Value |
|----------|-------|
| **Layout** | Grid: 1 col mobile, 2 cols md, 4 cols xl |
| **Gap** | `gap-4` |
| **Card Bg** | `bg-slate-800/50 rounded-2xl p-5` |
| **Border** | `border border-slate-700/50` |
| **Icon Size** | 40×40 (w-12 h-12) |

#### Stat Card Animations

| Element | Initial | Final | Delay |
|---------|---------|-------|-------|
| **Card** | `opacity: 0, y: 20` | `opacity: 1, y: 0` | `i * 0.1s` |
| **Icon Box** | - | - | - |
| **Trend Arrow** | - | - | Fade in same time |

#### Dashboard Events

| Element | Event | Action |
|---------|-------|--------|
| **Sidebar Toggle** | Click icon | Expand/collapse width animation |
| **Nav Item Click** | Click | Navigate to route + active style |
| **Search Input** | Type | Real-time search/filter |
| **Search Clear** | Click X | Clear search |
| **Bell Icon** | Click | Open notifications dropdown |
| **Profile Avatar** | Click | Open profile menu |
| **Logout** | Click | Confirmation modal → logout |

#### Recent Orders Table

| Column | Type | Details |
|--------|------|---------|
| **Order ID** | Text | `text-violet-400 font-medium` |
| **Customer** | Text | Name + phone below |
| **Restaurant** | Text | `text-slate-300` |
| **Amount** | Text | `font-semibold` |
| **Status** | Badge | Colored by status |
| **Time** | Text | Relative time (e.g., "10 mins ago") |
| **Actions** | Icon | More options (dots) |

#### Order Status Badge Colors

| Status | Background | Text | Border |
|--------|-----------|------|--------|
| **Delivered** | `bg-emerald-500/10` | `text-emerald-500` | `border-emerald-500/20` |
| **In Transit** | `bg-blue-500/10` | `text-blue-500` | `border-blue-500/20` |
| **Preparing** | `bg-amber-500/10` | `text-amber-500` | `border-amber-500/20` |
| **Pending** | `bg-slate-500/10` | `text-slate-400` | `border-slate-500/20` |

#### Table Row Animation

| Animation | Trigger | Duration |
|-----------|---------|----------|
| **Row Enter** | Load | `opacity: 0 → 1` |
| **Stagger** | - | `delay: i * 0.05s` |
| **Row Hover** | Mouse over | `bg-slate-700/20` |

#### Top Restaurants Widget

| Property | Details |
|----------|---------|
| **Position** | Right side, 1/3 width |
| **Height** | ~400px |
| **Scroll** | Internal scroll if many restaurants |
| **Item Animation** | Stagger `delay: i * 0.1s` |

#### Top Restaurant Item Layout

| Component | Details |
|-----------|---------|
| **Rank** | Circle badge with number |
| **Image** | 48×48 pixels, rounded |
| **Name** | Font bold |
| **Orders** | Count + "orders" label |
| **Revenue** | Right-aligned, emerald-400 |
| **Growth** | Right-aligned, emerald-400, +X% format |

---

### 3. Admin Orders Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/admin/orders` |
| **File** | `client/src/pages/AdminOrders.tsx` |
| **Layout** | Header + tabs + table |
| **Theme** | Dark |

#### Orders Header

| Component | Details |
|-----------|---------|
| **Title** | "Orders" |
| **Subtitle** | "Manage all orders" |
| **Search Input** | Width 256px, placeholder "Search orders..." |
| **Filter Button** | Icon + "Filter" text |

#### Order Tabs

| Tab | Active Style | Filters |
|-----|--------------|---------|
| **All Orders** | `bg-violet-500 text-white` | Shows all orders |
| **Pending** | Same | Status = Pending |
| **Preparing** | Same | Status = Preparing |
| **In Transit** | Same | Status = In Transit |
| **Delivered** | Same | Status = Delivered |

#### Orders Table Columns

| Column | Details |
|--------|---------|
| **Order ID** | `text-violet-400 font-medium` |
| **Customer** | Full name + phone number below |
| **Restaurant** | `text-slate-300` |
| **Items** | Comma-separated, truncated |
| **Amount** | Currency (₹ symbol) |
| **Driver** | Driver name or "Unassigned" |
| **Status** | Colored badge |
| **Time** | Relative time |
| **Actions** | Eye icon to view |

#### Orders Table Events

| Event | Trigger | Result |
|-------|---------|--------|
| **Search** | Type in search box | Real-time filter by order ID/customer |
| **Filter** | Click filter button | Open filter panel |
| **Tab Switch** | Click tab | Table updates with filtered data |
| **Row Click** | Click row | Open order detail modal |
| **Eye Icon** | Click | View order details |
| **Row Hover** | Mouse over | Background highlight |

---

### 4. Admin Restaurants Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/admin/restaurants` |
| **File** | `client/src/pages/AdminRestaurants.tsx` |
| **Theme** | Dark |
| **Features** | Restaurant CRUD operations |

#### Restaurants List/Table

| Column | Content |
|--------|---------|
| **Logo** | Restaurant image (small) |
| **Name** | Restaurant name |
| **Cuisine** | Cuisine type(s) |
| **Rating** | Star + number |
| **Orders** | Total orders count |
| **Status** | Active/Inactive badge |
| **Actions** | Edit, Delete, View buttons |

#### Restaurant Actions

| Action | Button | Result |
|--------|--------|--------|
| **Add** | "Add Restaurant" button | Open form modal |
| **Edit** | Edit icon | Open edit form modal |
| **Delete** | Delete icon | Confirmation → delete |
| **View** | View icon | Show restaurant detail page |
| **Suspend** | Suspend button | Toggle active/inactive |

---

### 5. Admin Customers Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/admin/customers` |
| **File** | `client/src/pages/AdminCustomers.tsx` |
| **Theme** | Dark |

#### Customer Status Colors

| Status | Background | Text |
|--------|-----------|------|
| **VIP** | `bg-amber-500/10` | `text-amber-400` |
| **Active** | `bg-emerald-500/10` | `text-emerald-400` |
| **Inactive** | `bg-slate-500/10` | `text-slate-400` |

#### Customers Table

| Column | Details |
|--------|---------|
| **Avatar** | Customer profile image |
| **Name** | Full name |
| **Email** | Email address |
| **Phone** | Phone number |
| **Total Orders** | Number of orders |
| **Spent** | Total amount spent (₹) |
| **Status** | VIP/Active/Inactive badge |
| **Joined** | Join date |
| **Actions** | View/Edit/Message buttons |

---

### 6. Admin Delivery Partners (Drivers) Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/admin/drivers` |
| **File** | `client/src/pages/AdminDrivers.tsx` |
| **Theme** | Dark |

#### Driver Status Badge Colors

| Status | Background | Text |
|--------|-----------|------|
| **Available** | `bg-emerald-500/10` | `text-emerald-400` |
| **Busy** | `bg-amber-500/10` | `text-amber-400` |
| **Offline** | `bg-slate-500/10` | `text-slate-400` |

#### Drivers Table

| Column | Content |
|--------|---------|
| **Avatar** | Driver profile image |
| **Name** | Full name |
| **Phone** | Contact number |
| **Vehicle** | Type (Car, Bike, etc.) |
| **Status** | Available/Busy/Offline badge |
| **Rating** | Star + number |
| **Deliveries** | Total deliveries count |
| **Earnings Today** | ₹ amount |
| **Actions** | Suspend, Message, View |

#### Driver Events

| Event | Action |
|-------|--------|
| **Status Click** | Filter by status |
| **Search** | Search by driver name |
| **Suspend** | Confirmation modal → suspend |
| **Message** | Open chat window |
| **View** | Show driver detail page |

---

### 7. Admin Analytics Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/admin/analytics` |
| **File** | `client/src/pages/AdminAnalytics.tsx` |
| **Theme** | Dark with charts |
| **Chart Library** | Framer Motion + custom SVG |

#### Analytics Header

| Component | Details |
|-----------|---------|
| **Title** | "Analytics" |
| **Subtitle** | "Business performance insights" |
| **Date Range** | Dropdown "Last 7 Months" |

#### KPI Cards (4)

| Card # | Metric | Icon | Value Format | Trend |
|--------|--------|------|--------------|-------|
| **1** | Total Revenue | DollarSign | ₹2.68 Cr | +18.5% ↑ |
| **2** | Total Orders | ShoppingBag | 40,000+ | +12.3% ↑ |
| **3** | Active Users | Users | 12,847 | +8.7% ↑ |
| **4** | Avg Order Value | TrendingUp | ₹642 | -2.1% ↓ |

#### KPI Card Styling

| Property | Value |
|----------|-------|
| **Background** | `bg-slate-800/50` |
| **Border** | `border-slate-700/50` |
| **Rounded** | `rounded-2xl` |
| **Padding** | `p-5` |
| **Icon Color** | Gradient boxes |

#### Revenue Trend Chart

| Property | Details |
|----------|---------|
| **Type** | Bar chart |
| **Width** | 2/3 of grid |
| **Height** | 256px (h-64) |
| **Months** | Jan to Jul |
| **Bar Color (Previous)** | `bg-slate-600` |
| **Bar Color (Current)** | `from-violet-600 to-violet-400` |
| **Animation Duration** | 0.5s per bar, staggered 0.1s |

#### Bar Animation

| Property | Initial | Final |
|----------|---------|-------|
| **Height** | 0 | Calculated % of max |
| **Duration** | - | 0.5s |
| **Delay** | - | `i * 0.1s` |

#### Top Restaurants Chart

| Property | Details |
|----------|---------|
| **Type** | Ranked list (1-5) |
| **Width** | 1/3 of grid |
| **Per Item** | Rank, name, orders, revenue, growth% |
| **Animation** | Stagger entrance `i * 0.1s` |

#### Order Distribution Chart

| Property | Details |
|----------|---------|
| **Type** | Progress bars |
| **Width** | 1/2 width |
| **Items** | Completed, In Progress, Cancelled |
| **Colors** | Emerald-500, Blue-500, Red-500 |
| **Percentages** | 78%, 15%, 7% |
| **Animation** | Bars fill 0.5s, staggered 0.1s |

#### Peak Hours Heatmap

| Property | Details |
|----------|---------|
| **Type** | Color grid blocks |
| **Width** | 1/2 width |
| **Hours** | 12PM, 1PM, 2PM, 7PM, 8PM, 9PM |
| **Intensities** | 60%, 45%, 35%, 85%, 100%, 75% |
| **Color Formula** | `rgba(139, 92, 246, opacity)` |
| **Layout** | `grid-cols-6 gap-2` |

#### Peak Hour Block Properties

| Element | Styling |
|---------|---------|
| **Height** | Proportional to intensity |
| **Background** | Violet with opacity |
| **Border Radius** | `rounded-lg` |
| **Text** | Percentage + time label |

---

### 8. Admin Settings Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/admin/settings` |
| **File** | `client/src/pages/AdminSettings.tsx` |
| **Layout** | Tabs + content |
| **Theme** | Dark |

#### Settings Tabs

| Tab | Icon | Content |
|-----|------|---------|
| **General** | LayoutDashboard | Business info, address |
| **Security** | Lock | Password, 2FA, sessions |
| **Notifications** | Bell | Email, SMS, push toggles |
| **Billing** | CreditCard | Plan, invoice, payment |

#### General Tab Fields

| Field | Type | Default Value |
|-------|------|----------------|
| **Business Name** | Input | "FoodDash India" |
| **Support Email** | Input | "support@fooddash.in" |
| **Phone Number** | Input | Business phone |
| **City/Region** | Input | - |
| **Address** | Textarea | Full business address |

#### Security Tab Sections

| Section | Content |
|---------|---------|
| **Password** | Current, new, confirm inputs |
| **2FA** | Toggle switch, recovery codes |
| **Active Sessions** | List of devices, logout option |

#### Notifications Tab Toggles

| Toggle | Options |
|--------|---------|
| **Email** | General, orders, system alerts |
| **SMS** | Enabled/disabled |
| **Push** | Enabled/disabled |
| **Reports** | Weekly, monthly options |

#### Notification Toggle Styling

| State | Style |
|-------|-------|
| **On** | `bg-violet-500 toggle:bg-violet-600` |
| **Off** | `bg-slate-400` |
| **Transition** | 0.3s smooth |

#### Billing Tab Content

| Component | Details |
|-----------|---------|
| **Current Plan** | "Enterprise" (bold, large) |
| **Plan Card** | `from-violet-500/20 to-purple-600/20` gradient |
| **Upgrade Button** | Right side of card |
| **Features Grid** | 3 columns, feature icons + names |
| **Invoice Table** | Date, description, amount, status, download link |

#### Billing Invoice Table

| Column | Details |
|--------|---------|
| **Date** | Invoice date |
| **Description** | Invoice description |
| **Amount** | ₹ amount |
| **Status** | Paid/Pending badge |
| **Action** | Download PDF link |

---

## Delivery Partner Portal Pages

### 1. Delivery Login Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/delivery/login` |
| **File:** | `client/src/pages/DeliveryLogin.tsx` |
| **Theme** | Dark emerald/teal |
| **Background Gradient** | `from-emerald-900 via-emerald-800 to-teal-900` |
| **Primary Accent** | Emerald-400 to Teal-500 |
| **Card Background** | `bg-emerald-800/30 backdrop-blur-xl` |

#### Delivery Login Form

| Field | Type | Placeholder | Icon |
|-------|------|-------------|------|
| **Phone** | tel | +1 (555) 000-0000 | Phone |
| **Password** | password | •••••••• | Lock + Eye |

#### Delivery Login Events

| Event | Action | Animation |
|-------|--------|-----------|
| **Back** | Navigate `/` | Slide animation |
| **Phone Focus** | Border → emerald-400 | Smooth transition |
| **Password Toggle** | Eye ↔ EyeOff | Icon swap |
| **Start Delivering** | Navigate `/delivery/dashboard` | Button press |
| **Admin Link** | Navigate `/admin/login` | Text link |

#### Benefits Cards

| Card # | Emoji | Benefit | Details |
|--------|-------|---------|---------|
| **1** | 💰 | Earn Daily | Flexible earning |
| **2** | ⏰ | Flexible Hours | Work your schedule |
| **3** | 🤝 | 24/7 Support | Always there for you |

---

### 2. Delivery Dashboard

| Attribute | Details |
|-----------|---------|
| **Route** | `/delivery/dashboard` |
| **File** | `client/src/pages/DeliveryDashboard.tsx` |
| **Layout** | Header + profile + stats + deliveries |
| **Theme** | Dark with emerald accents |

#### Profile Section

| Component | Styling |
|-----------|---------|
| **Avatar** | Border 2px emerald-500, 40×40 |
| **Name** | "Raj Kumar" white text |
| **Rating** | Star yellow-400 + "4.92" |
| **Status Badge** | "Active" or "Offline" |

#### Today's Stats Cards

| Stat | Icon | Color | Value Format |
|------|------|-------|--------------|
| **Earnings** | DollarSign | `text-emerald-400` | ₹1,245 |
| **Trips** | Package | `text-blue-400` | 12 |
| **Hours** | Clock | `text-amber-400` | 8.5 |
| **Rating** | Star | `text-yellow-400` | 4.92 |

#### Stat Card Styling

| Property | Value |
|----------|-------|
| **Background** | `bg-slate-800/50 rounded-2xl p-3` |
| **Text Align** | center |
| **Border** | `border-slate-700/50` |
| **Animation** | `opacity: 0 → 1, scale: 0.9 → 1` |

#### Recent Deliveries List

| Component | Details |
|-----------|---------|
| **Status Badge** | Delivered/In Transit/Pending color |
| **Time** | "8 mins ago" relative |
| **From** | Restaurant name |
| **To** | Delivery address |
| **Amount** | ₹349 |
| **Actions** | View Details, Track buttons |

#### Delivery Item Events

| Event | Action |
|-------|--------|
| **View Details** | Show full order info modal |
| **Track** | Open live map view |
| **Swipe (Mobile)** | Reveal more actions |

---

### 3. Delivery Orders Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/delivery/orders` |
| **File** | `client/src/pages/DeliveryOrders.tsx` |
| **Theme** | Dark |
| **View Options** | List view / Map view |

#### Active Orders List

| Column | Details |
|--------|---------|
| **Status** | Badge with color |
| **Time** | Pickup deadline |
| **From** | Pickup location + address |
| **To** | Delivery location + address |
| **Customer** | Name + phone (click to call) |
| **Instructions** | Pickup/delivery notes |
| **Amount** | Order value |
| **Actions** | Accept/Reject (if not accepted) |

#### Order Status Colors

| Status | Badge Color |
|--------|------------|
| **Available** | Green (`emerald-500`) |
| **Accepted** | Blue (`blue-500`) |
| **Picked Up** | Yellow (`amber-500`) |
| **Delivered** | Green (`emerald-500`) |

#### Order Events

| Event | Result |
|-------|--------|
| **Map View Toggle** | Switch list ↔ map |
| **Navigation Button** | Open Google Maps with directions |
| **Call Customer** | Open phone dialer |
| **Accept Order** | Confirm + status → In Transit |
| **Reject Order** | Cancel + remove from list |
| **Deliver Order** | Mark complete + navigate next |

---

### 4. Delivery Earnings Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/delivery/earnings` |
| **File** | `client/src/pages/DeliveryEarnings.tsx` |
| **Theme** | Dark |
| **Chart Type** | Line chart (7 days) |

#### Balance Card

| Property | Details |
|----------|---------|
| **Background** | `from-emerald-500 to-teal-600` gradient |
| **Rounded** | `rounded-3xl` |
| **Padding** | `p-6` |
| **Shadow** | `shadow-lg shadow-emerald-500/20` |
| **Label** | "Available Balance" (emerald-100) |
| **Amount** | "₹10,670" (text-4xl bold) |

#### Balance Card Buttons

| Button | Icon | Text |
|--------|------|------|
| **Withdraw** | CreditCard | "Withdraw" |
| **History** | Clock | "History" |

#### Earnings Breakdown

| Card | Value | Details |
|------|-------|---------|
| **Today** | ₹1,245 | Daily earnings |
| **This Week** | ₹8,960 | 7-day total |
| **This Month** | ₹35,420 | 30-day total |

#### Earnings Chart

| Property | Details |
|----------|---------|
| **Type** | Line chart |
| **Period** | Last 7 days |
| **X-axis** | Mon-Sun |
| **Y-axis** | Amount (₹) |
| **Line Color** | Emerald-500 |
| **Point Markers** | Circle dots |

#### Chart Interactions

| Event | Action |
|-------|--------|
| **Hover Point** | Show tooltip (exact amount) |
| **Click Point** | Show day breakdown |

#### Payment Methods

| Method | Actions |
|--------|---------|
| **Bank Account** | Edit, Remove, Set Default |
| **Wallet** | Add Money, View Balance |

#### Payment Method Form

| Field | Type |
|-------|------|
| **Bank Name** | Dropdown |
| **Account Holder** | Input |
| **Account Number** | Input |
| **IFSC Code** | Input |
| **Account Type** | Radio (Savings/Current) |

---

### 5. Delivery Profile Page

| Attribute | Details |
|-----------|---------|
| **Route** | `/delivery/profile` |
| **File** | `client/src/pages/DeliveryProfile.tsx` |
| **Theme** | Dark |
| **Sections** | Profile, Documents, Bank Details |

#### Profile Section

| Field | Type | Value |
|-------|------|-------|
| **Photo** | Upload | Profile image |
| **Name** | Input | "Raj Kumar" |
| **Phone** | Input | Contact number |
| **Email** | Input | Email address |

#### Documents Section

| Document | Status | Actions |
|----------|--------|---------|
| **ID Proof** | Verified ✓ | Upload, View, Delete |
| **License** | Verified ✓ | Upload, View, Delete |
| **Insurance** | Expired ✗ | Upload (required), View |
| **Clearance** | Pending ⏳ | Upload, View, Delete |

#### Document Status Indicators

| Status | Color | Icon |
|--------|-------|------|
| **Verified** | Green (`emerald-500`) | ✓ |
| **Pending** | Yellow (`amber-500`) | ⏳ |
| **Expired** | Red (`red-500`) | ✗ |

#### Bank Details Section

| Field | Type | Placeholder |
|-------|------|-------------|
| **Account Holder** | Input | Full name |
| **Account Number** | Input | 12 digits |
| **IFSC Code** | Input | 11 characters |
| **Bank Name** | Input/Dropdown | Bank name |
| **Account Type** | Radio | Savings/Current |

#### Profile Events

| Event | Action |
|-------|--------|
| **Photo Click** | Upload new photo |
| **Edit Name/Info** | Open edit form |
| **Upload Document** | File input → validate → upload |
| **Document Status** | Hover → show tooltip |
| **Edit Bank** | Form modal opens |
| **Save Changes** | API call + toast notification |

---

## Animations Reference

### Page Entrance Animations

| Animation Type | Initial | Final | Duration | Delay |
|----------------|---------|-------|----------|-------|
| **Fade + Slide Y** | `opacity: 0, y: 20` | `opacity: 1, y: 0` | 0.4s-0.6s | - |
| **Fade + Slide X** | `opacity: 0, x: 20` | `opacity: 1, x: 0` | 0.6s | - |
| **Scale** | `opacity: 0, scale: 0.8` | `opacity: 1, scale: 1` | 0.3s | - |
| **Staggered** | - | - | - | `i * 0.05s` to `0.1s` |

### Interaction Animations

| Interaction | Initial | Final | Duration |
|-------------|---------|-------|----------|
| **Hover Lift** | `y: 0` | `y: -8` | 0.2s |
| **Hover Scale** | `scale: 1` | `scale: 1.02` | 0.2s |
| **Tap/Press** | `scale: 1` | `scale: 0.98` | 0.1s |
| **Image Zoom** | `scale: 1` | `scale: 1.1` | 0.5s |

### Exit Animations

| Animation | Initial | Final | Duration |
|-----------|---------|-------|----------|
| **Fade Out** | `opacity: 1` | `opacity: 0` | 0.2s-0.3s |
| **Slide Out** | `x: 0` | `x: 100` | 0.3s |
| **Height Collapse** | `height: auto` | `height: 0` | 0.3s |

### State Change Animations

| Change | Initial | Final | Duration |
|--------|---------|-------|----------|
| **Badge Appear** | `scale: 0` | `scale: 1` | 0.3s |
| **Number Update** | `scale: 1` | `scale: 1.1 → 1` | 0.4s |
| **Loading Spinner** | - | Rotating | Continuous |

---

## Events & Interactions

### Form Interactions

| Event Type | Trigger | Behavior |
|------------|---------|----------|
| **Focus** | Click input | Border color change + animation |
| **Input** | Type character | Real-time validation/filter |
| **Blur** | Click outside | Validation check |
| **Submit** | Click button/Enter | preventDefault + validate all |
| **Error** | Invalid data | Red text below + shake animation |

### Button Interactions

| State | Styling | Animation |
|-------|---------|-----------|
| **Idle** | Normal colors | - |
| **Hover** | Lighter shade | `scale: 1.02` |
| **Active/Tap** | Darker shade | `scale: 0.98` |
| **Disabled** | Opacity 50% | No interactions |
| **Loading** | Spinner inside | Spinner rotate |

### List/Table Interactions

| Interaction | Effect | Duration |
|-------------|--------|----------|
| **Row Hover** | Background highlight | 0.2s transition |
| **Row Click** | Open detail / navigate | Page transition |
| **Item Remove** | Slide out + collapse | 0.3s |
| **Item Add** | Fade in + slide up | 0.3s |

### Modal/Overlay Interactions

| Event | Animation |
|-------|-----------|
| **Open** | `opacity: 0 → 1`, `scale: 0.9 → 1`, `duration: 0.3s` |
| **Close** | `opacity: 1 → 0`, `scale: 1 → 0.9`, `duration: 0.2s` |
| **Backdrop** | Fade in/out same as modal |

---

## Color Codes Reference

### Admin Theme Colors

| Color | Hex/CSS | Usage |
|-------|---------|-------|
| **Primary (Violet)** | `from-violet-500 to-purple-600` | Buttons, active nav, accents |
| **Background** | `slate-900` | Page background |
| **Sidebar BG** | `slate-800/50` | Sidebar, cards |
| **Border** | `slate-700/50` | Dividers, borders |
| **Text** | `white` | Main text on dark |
| **Muted Text** | `slate-400` | Secondary text |

### Delivery Theme Colors

| Color | Hex/CSS | Usage |
|-------|---------|-------|
| **Primary (Emerald)** | `from-emerald-400 to-teal-500` | Buttons, accents |
| **Background** | `emerald-900` | Page background |
| **Status (Active)** | `emerald-500` | Active indicators |
| **Text** | `white` | Main text |

### Status Colors

| Status | Badge Class |
|--------|------------|
| **Success/Delivered** | `bg-emerald-500/10 text-emerald-500` |
| **Info/In Transit** | `bg-blue-500/10 text-blue-500` |
| **Warning/Pending** | `bg-amber-500/10 text-amber-500` |
| **Error/Cancelled** | `bg-red-500/10 text-red-500` |
| **Secondary/Inactive** | `bg-slate-500/10 text-slate-400` |


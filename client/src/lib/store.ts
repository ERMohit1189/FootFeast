import { useState, useCallback } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId: string;
  restaurantName: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  distance: string;
  featured?: boolean;
  offer?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isBestseller?: boolean;
}

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Burger Joint',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    cuisine: 'American, Burgers, Fast Food',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 'Free',
    distance: '1.2 km',
    featured: true,
    offer: '50% OFF up to ₹100'
  },
  {
    id: '2',
    name: 'Pizza Paradise',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    cuisine: 'Italian, Pizza, Pasta',
    rating: 4.3,
    deliveryTime: '30-40 min',
    deliveryFee: '₹49',
    distance: '2.5 km',
    featured: true,
    offer: 'Buy 1 Get 1 Free'
  },
  {
    id: '3',
    name: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop',
    cuisine: 'Japanese, Sushi, Asian',
    rating: 4.7,
    deliveryTime: '35-45 min',
    deliveryFee: '₹59',
    distance: '3.1 km',
    featured: true
  },
  {
    id: '4',
    name: 'Taco Fiesta',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop',
    cuisine: 'Mexican, Tacos, Burritos',
    rating: 4.2,
    deliveryTime: '20-30 min',
    deliveryFee: 'Free',
    distance: '0.8 km',
    offer: '20% OFF'
  },
  {
    id: '5',
    name: 'Dragon Palace',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop',
    cuisine: 'Chinese, Asian, Noodles',
    rating: 4.4,
    deliveryTime: '25-35 min',
    deliveryFee: '₹29',
    distance: '1.8 km'
  },
  {
    id: '6',
    name: 'Curry House',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    cuisine: 'Indian, Curry, Biryani',
    rating: 4.6,
    deliveryTime: '30-40 min',
    deliveryFee: '₹39',
    distance: '2.2 km',
    offer: 'Free Naan with orders ₹500+'
  },
  {
    id: '7',
    name: 'Mediterranean Grill',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    cuisine: 'Mediterranean, Kebabs, Healthy',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 'Free',
    distance: '1.5 km'
  },
  {
    id: '8',
    name: 'Sweet Treats Bakery',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop',
    cuisine: 'Desserts, Bakery, Cakes',
    rating: 4.8,
    deliveryTime: '15-25 min',
    deliveryFee: '₹29',
    distance: '0.5 km',
    featured: true
  }
];

export const menuItems: Record<string, MenuItem[]> = {
  '1': [
    { id: '1-1', name: 'Classic Cheeseburger', description: 'Juicy beef patty with melted cheddar, lettuce, tomato, and our secret sauce', price: 299, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop', category: 'Burgers', isVeg: false, isBestseller: true },
    { id: '1-2', name: 'Double Bacon Burger', description: 'Two beef patties with crispy bacon, cheese, and caramelized onions', price: 399, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300&h=200&fit=crop', category: 'Burgers', isVeg: false, isBestseller: true },
    { id: '1-3', name: 'Veggie Delight', description: 'Plant-based patty with avocado, sprouts, and vegan mayo', price: 249, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300&h=200&fit=crop', category: 'Burgers', isVeg: true },
    { id: '1-4', name: 'Crispy Chicken Burger', description: 'Crispy fried chicken breast with coleslaw and pickles', price: 329, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300&h=200&fit=crop', category: 'Burgers', isVeg: false },
    { id: '1-5', name: 'Loaded Fries', description: 'Crispy fries topped with cheese, bacon bits, and sour cream', price: 179, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=200&fit=crop', category: 'Sides', isVeg: false },
    { id: '1-6', name: 'Onion Rings', description: 'Golden crispy onion rings with ranch dipping sauce', price: 149, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=300&h=200&fit=crop', category: 'Sides', isVeg: true },
    { id: '1-7', name: 'Chocolate Milkshake', description: 'Rich and creamy chocolate milkshake topped with whipped cream', price: 159, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=200&fit=crop', category: 'Drinks', isVeg: true },
    { id: '1-8', name: 'Strawberry Shake', description: 'Fresh strawberry milkshake with real fruit', price: 159, image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=300&h=200&fit=crop', category: 'Drinks', isVeg: true }
  ],
  '2': [
    { id: '2-1', name: 'Margherita Pizza', description: 'Fresh tomato sauce, mozzarella, and basil on a crispy crust', price: 349, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop', category: 'Pizza', isVeg: true, isBestseller: true },
    { id: '2-2', name: 'Pepperoni Supreme', description: 'Loaded with pepperoni, extra cheese, and oregano', price: 449, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop', category: 'Pizza', isVeg: false, isBestseller: true },
    { id: '2-3', name: 'BBQ Chicken Pizza', description: 'BBQ sauce, grilled chicken, red onions, and cilantro', price: 479, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop', category: 'Pizza', isVeg: false },
    { id: '2-4', name: 'Veggie Garden', description: 'Bell peppers, mushrooms, olives, tomatoes, and onions', price: 379, image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=300&h=200&fit=crop', category: 'Pizza', isVeg: true },
    { id: '2-5', name: 'Garlic Breadsticks', description: 'Warm breadsticks with garlic butter and parmesan', price: 149, image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=300&h=200&fit=crop', category: 'Sides', isVeg: true },
    { id: '2-6', name: 'Caesar Salad', description: 'Crisp romaine, parmesan, croutons, and Caesar dressing', price: 199, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300&h=200&fit=crop', category: 'Sides', isVeg: true }
  ],
  '3': [
    { id: '3-1', name: 'Salmon Nigiri (4 pcs)', description: 'Fresh Atlantic salmon on seasoned rice', price: 399, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=200&fit=crop', category: 'Nigiri', isVeg: false, isBestseller: true },
    { id: '3-2', name: 'Dragon Roll', description: 'Shrimp tempura, eel, avocado, and tobiko', price: 549, image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300&h=200&fit=crop', category: 'Rolls', isVeg: false, isBestseller: true },
    { id: '3-3', name: 'California Roll', description: 'Crab, avocado, and cucumber with sesame seeds', price: 349, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop', category: 'Rolls', isVeg: false },
    { id: '3-4', name: 'Veggie Roll', description: 'Avocado, cucumber, carrot, and asparagus', price: 249, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=300&h=200&fit=crop', category: 'Rolls', isVeg: true },
    { id: '3-5', name: 'Miso Soup', description: 'Traditional Japanese soup with tofu and seaweed', price: 129, image: 'https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=300&h=200&fit=crop', category: 'Soup', isVeg: true },
    { id: '3-6', name: 'Edamame', description: 'Steamed soybeans with sea salt', price: 149, image: 'https://images.unsplash.com/photo-1564894809611-1742fc40ed80?w=300&h=200&fit=crop', category: 'Appetizers', isVeg: true }
  ]
};

Object.keys(restaurants.reduce((acc, r) => ({ ...acc, [r.id]: true }), {})).forEach(id => {
  if (!menuItems[id]) {
    menuItems[id] = [
      { id: `${id}-1`, name: 'Signature Dish', description: 'Our chef\'s special creation with premium ingredients', price: 399, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop', category: 'Mains', isVeg: false, isBestseller: true },
      { id: `${id}-2`, name: 'House Special', description: 'A crowd favorite made with love', price: 329, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop', category: 'Mains', isVeg: false },
      { id: `${id}-3`, name: 'Vegetarian Delight', description: 'Fresh vegetables prepared to perfection', price: 279, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=200&fit=crop', category: 'Mains', isVeg: true },
      { id: `${id}-4`, name: 'Classic Appetizer', description: 'Perfect way to start your meal', price: 179, image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=300&h=200&fit=crop', category: 'Appetizers', isVeg: true },
      { id: `${id}-5`, name: 'Refreshing Beverage', description: 'Cool and refreshing drink', price: 99, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop', category: 'Drinks', isVeg: true }
    ];
  }
});

export const categories = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'burger', name: 'Burgers', icon: '🍔' },
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
  { id: 'chinese', name: 'Chinese', icon: '🥡' },
  { id: 'indian', name: 'Indian', icon: '🍛' },
  { id: 'mexican', name: 'Mexican', icon: '🌮' },
  { id: 'dessert', name: 'Desserts', icon: '🍰' },
  { id: 'healthy', name: 'Healthy', icon: '🥗' }
];

let globalCart: CartItem[] = [];
let listeners: (() => void)[] = [];

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(globalCart);

  const updateCart = useCallback((newCart: CartItem[]) => {
    globalCart = newCart;
    setCart(newCart);
    listeners.forEach(l => l());
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    const existing = globalCart.find(i => i.id === item.id);
    let newCart: CartItem[];
    if (existing) {
      newCart = globalCart.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      newCart = [...globalCart, { ...item, quantity: 1 }];
    }
    updateCart(newCart);
  }, [updateCart]);

  const removeFromCart = useCallback((itemId: string) => {
    const existing = globalCart.find(i => i.id === itemId);
    let newCart: CartItem[];
    if (existing && existing.quantity > 1) {
      newCart = globalCart.map(i =>
        i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
      );
    } else {
      newCart = globalCart.filter(i => i.id !== itemId);
    }
    updateCart(newCart);
  }, [updateCart]);

  const clearCart = useCallback(() => {
    updateCart([]);
  }, [updateCart]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return { cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount };
}

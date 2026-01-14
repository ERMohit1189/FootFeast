import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Home1 from "@/pages/Home1";
import Home2 from "@/pages/Home2";
import Home3 from "@/pages/Home3";
import Restaurant from "@/pages/Restaurant";
import RestaurantLogin from "@/pages/RestaurantLogin";
import RestaurantDashboard from "@/pages/RestaurantDashboard";
import RestaurantOrders from "@/pages/RestaurantOrders";
import RestaurantMenu from "@/pages/RestaurantMenu";
import AddMenuItem from "@/pages/AddMenuItem";
import RestaurantAnalyticsDetailed from "@/pages/RestaurantAnalyticsDetailed";
import RestaurantCustomers from "@/pages/RestaurantCustomers";
import CustomerProfile from "@/pages/CustomerProfile";
import Cart from "@/pages/Cart";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminOrders from "@/pages/AdminOrders";
import AdminRestaurants from "@/pages/AdminRestaurants";
import AdminCustomers from "@/pages/AdminCustomers";
import AdminDrivers from "@/pages/AdminDrivers";
import AdminAnalytics from "@/pages/AdminAnalytics";
import AdminSettings from "@/pages/AdminSettings";
import DeliveryLogin from "@/pages/DeliveryLogin";
import DeliveryDashboard from "@/pages/DeliveryDashboard";
import DeliveryOrders from "@/pages/DeliveryOrders";
import DeliveryEarnings from "@/pages/DeliveryEarnings";
import DeliveryProfile from "@/pages/DeliveryProfile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home1" component={Home1} />
      <Route path="/home2" component={Home2} />
      <Route path="/home3" component={Home3} />
      <Route path="/restaurant/login" component={RestaurantLogin} />
      <Route path="/restaurant/dashboard" component={RestaurantDashboard} />
      <Route path="/restaurant/orders" component={RestaurantOrders} />
      <Route path="/restaurant/menu" component={RestaurantMenu} />
      <Route path="/restaurant/menu/add" component={AddMenuItem} />
      <Route path="/restaurant/analytics" component={RestaurantAnalyticsDetailed} />
      <Route path="/restaurant/customers" component={RestaurantCustomers} />
      <Route path="/restaurant/customer/:id" component={CustomerProfile} />
      <Route path="/restaurant/:id" component={Restaurant} />
      <Route path="/cart" component={Cart} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/orders" component={AdminOrders} />
      <Route path="/admin/restaurants" component={AdminRestaurants} />
      <Route path="/admin/customers" component={AdminCustomers} />
      <Route path="/admin/drivers" component={AdminDrivers} />
      <Route path="/admin/analytics" component={AdminAnalytics} />
      <Route path="/admin/settings" component={AdminSettings} />
      <Route path="/delivery/login" component={DeliveryLogin} />
      <Route path="/delivery/dashboard" component={DeliveryDashboard} />
      <Route path="/delivery/orders" component={DeliveryOrders} />
      <Route path="/delivery/earnings" component={DeliveryEarnings} />
      <Route path="/delivery/profile" component={DeliveryProfile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

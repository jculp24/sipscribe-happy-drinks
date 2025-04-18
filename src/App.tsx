
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { CartProvider } from "@/contexts/CartContext";
import Index from "@/pages/Index";
import Home from "@/pages/Home";
import VendorDetail from "@/pages/VendorDetail";
import Profile from "@/pages/Profile";
import Subscription from "@/pages/Subscription";
import Notifications from "@/pages/Notifications";
import Cart from "@/pages/Cart";
import History from "@/pages/History";
import NotFound from "@/pages/NotFound";
import VendorSignup from "@/pages/VendorSignup";
import VendorDashboard from "@/pages/VendorDashboard";
import VendorSettings from "@/pages/VendorSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/vendor/:id" element={<VendorDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/history" element={<History />} />
              <Route path="/vendor-signup" element={<VendorSignup />} />
              <Route path="/vendor-dashboard/:id" element={<VendorDashboard />} />
              <Route path="/vendor-settings/:id" element={<VendorSettings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

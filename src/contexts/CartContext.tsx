
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  vendorName: string;
  vendorId: string;
  credits: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  date: string;
  totalCredits: number;
  status: 'pending' | 'confirmed' | 'completed';
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalCredits: number;
  checkout: () => Promise<string>;
  orderHistory: Order[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart data from localStorage", e);
        localStorage.removeItem("cart");
      }
    }
    
    // Load order history
    const savedHistory = localStorage.getItem("orderHistory");
    if (savedHistory) {
      try {
        setOrderHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse order history from localStorage", e);
        localStorage.removeItem("orderHistory");
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);
  
  // Save order history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
  }, [orderHistory]);

  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
  };

  const checkout = async (): Promise<string> => {
    if (items.length === 0) {
      throw new Error("Cart is empty");
    }

    // Group items by vendor for notifications
    const vendorItems: Record<string, CartItem[]> = {};
    items.forEach(item => {
      if (!vendorItems[item.vendorId]) {
        vendorItems[item.vendorId] = [];
      }
      vendorItems[item.vendorId].push(item);
    });
    
    // In a real app, this would be an API call to notify vendors
    Object.entries(vendorItems).forEach(([vendorId, vendorItems]) => {
      console.log(`Notifying vendor ${vendorId} about order:`, vendorItems);
    });

    // Create a new order and add to history
    const newOrder: Order = {
      id: `order_${Date.now()}`,
      items: [...items],
      date: new Date().toISOString(),
      totalCredits: totalCredits,
      status: 'pending'
    };
    
    setOrderHistory(prevHistory => [newOrder, ...prevHistory]);
    
    // Clear the cart after successful checkout
    clearCart();
    
    return newOrder.id;
  };

  const totalCredits = items.reduce((sum, item) => sum + (item.credits * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart, 
      totalCredits,
      checkout,
      orderHistory
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

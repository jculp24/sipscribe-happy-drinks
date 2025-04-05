
import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  vendorName: string;
  vendorId: string;
  credits: number;
  quantity: number;
  image: string;
}

// Mock data for cart items
const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Cold Brew Coffee",
    vendorName: "Coffee Haven",
    vendorId: "v1",
    credits: 1,
    quantity: 1,
    image: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Matcha Latte",
    vendorName: "Tea Paradise",
    vendorId: "v2",
    credits: 1,
    quantity: 1,
    image: "/placeholder.svg"
  }
];

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  totalCredits: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(initialCartItems);

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
      return [...prevItems, item];
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const totalCredits = items.reduce((sum, item) => sum + (item.credits * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, totalCredits }}>
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

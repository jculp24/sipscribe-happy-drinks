
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, removeItem, totalCredits } = useCart();

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart."
    });
  };
  
  return (
    <div className="sipscribe-container">
      <header className="w-full py-3 px-4 flex items-center justify-between bg-background border-b border-border">
        <Button 
          variant="ghost" 
          size="icon" 
          className="touch-target" 
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">My Cart</h1>
        <div className="w-10" />
      </header>
      
      <main className="flex flex-col w-full pb-16">
        {items.length > 0 ? (
          <>
            <div className="px-4 py-3">
              <h2 className="text-lg font-medium mb-3">Cart Items</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 bg-card p-3 rounded-lg">
                    <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-md" />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.vendorName}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold">{item.credits} {item.credits === 1 ? "Credit" : "Credits"}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="px-4 mt-6">
              <Separator className="mb-4" />
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{totalCredits} {totalCredits === 1 ? "Credit" : "Credits"}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{totalCredits} {totalCredits === 1 ? "Credit" : "Credits"}</span>
              </div>
              
              <Button className="w-full mt-4">
                Checkout
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 h-[60vh]">
            <div className="text-6xl mb-4">🥤</div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-center text-muted-foreground mb-4">
              Looks like you haven't added any drinks to your cart yet.
            </p>
            <Button onClick={() => navigate('/home')}>
              Browse Drinks
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;

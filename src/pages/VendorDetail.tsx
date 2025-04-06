
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Clock, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { vendors, user } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const VendorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState("menu");
  
  const vendor = vendors.find(v => v.id === id);
  
  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">Vendor Not Found</h1>
          <Button onClick={() => navigate("/")}>Return Home</Button>
        </div>
      </div>
    );
  }

  const isFavorite = user.favorites.includes(vendor.id);

  const handleAddToOrder = (itemId: string, itemName: string) => {
    if (user.remainingCredits > 0) {
      const menuItem = vendor.menu.find(item => item.id === itemId);
      if (!menuItem) return;
      
      addItem({
        id: `${vendor.id}-${itemId}`,
        name: itemName,
        vendorName: vendor.name,
        vendorId: vendor.id,
        credits: 1, // Assuming each item costs 1 credit
        quantity: 1,
        image: "/placeholder.svg" // Using placeholder image
      });
      
      toast({
        title: "Added to cart",
        description: `${itemName} has been added to your cart.`,
      });
    } else {
      toast({
        title: "Insufficient credits",
        description: "You need to top up your subscription.",
        variant: "destructive",
      });
    }
  };

  const handleToggleFavorite = () => {
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${vendor.name} has been ${isFavorite ? "removed from" : "added to"} your favorites.`,
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
        <h1 className="text-lg font-semibold">{vendor.name}</h1>
        <Button 
          variant="ghost" 
          size="icon" 
          className="touch-target" 
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("h-5 w-5", isFavorite ? "fill-primary" : "")} />
        </Button>
      </header>
      
      <main className="flex flex-col w-full pb-16">
        <div className="bg-secondary h-40 w-full flex items-center justify-center">
          <p className="text-3xl">
            {vendor.primaryCategory === "Coffee" ? "☕" :
             vendor.primaryCategory === "Bubble Tea" ? "🧋" :
             vendor.primaryCategory === "Juice" ? "🧃" :
             vendor.primaryCategory === "Smoothie" ? "🥤" : "🍵"}
          </p>
        </div>
        
        <Tabs defaultValue="menu" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full h-12 grid grid-cols-3">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu" className="p-0">
            <div className="px-4 py-2 bg-secondary">
              <p className="text-sm text-muted-foreground">{vendor.description}</p>
            </div>
            <div className="divide-y divide-border">
              {vendor.menu.map((item) => (
                <div key={item.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <p className="text-sm font-medium mt-1">{item.price}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAddToOrder(item.id, item.name)}
                    aria-label={`Add ${item.name} to order`}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            <div className="p-4 space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-muted-foreground">{vendor.address}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold">Hours</h3>
                  <p className="text-muted-foreground">{vendor.hours}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="p-4 flex items-center justify-center h-40">
              <p className="text-muted-foreground">Reviews coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default VendorDetail;

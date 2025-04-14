
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, ChevronLeft, Clock, Edit, FileText, MapPin, PlusCircle, Settings, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { vendors } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { VendorMenu } from "@/components/vendor/VendorMenu";
import { VendorHours } from "@/components/vendor/VendorHours";
import { VendorLocation } from "@/components/vendor/VendorLocation";

const VendorDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("menu");
  const [isVendorActive, setIsVendorActive] = useState(false);
  
  // In a real app, this would come from the database
  // For demo, we find a matching vendor or use a placeholder
  const vendor = vendors.find(v => v.id === id) || {
    id: id || "new",
    name: "Your Business Name",
    description: "Your business description",
    address: "Your address",
    hours: "Not set",
    primaryCategory: "Coffee",
    distance: "0.0 mi",
    rating: 0,
    menu: [],
    isActive: false
  };

  const toggleVendorStatus = () => {
    // In a real app, this would update the database
    const newStatus = !isVendorActive;
    setIsVendorActive(newStatus);
    
    toast({
      title: newStatus ? "Vendor now active" : "Vendor now inactive",
      description: newStatus 
        ? "Your business is now visible to customers" 
        : "Your business is now hidden from customers",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
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
        <h1 className="text-lg font-semibold">Vendor Dashboard</h1>
        <Button 
          variant="ghost" 
          size="icon" 
          className="touch-target" 
          onClick={() => navigate("/vendor-settings/" + id)}
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </header>
      
      <div className="p-4 bg-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">{vendor.name}</h2>
            <p className="text-sm text-muted-foreground">{vendor.primaryCategory}</p>
          </div>
          <Button
            variant={isVendorActive ? "default" : "outline"}
            size="sm"
            onClick={toggleVendorStatus}
          >
            {isVendorActive ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Active
              </>
            ) : (
              "Go Live"
            )}
          </Button>
        </div>
        <div className="mt-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Store className="h-4 w-4 mr-1" />
            {isVendorActive ? "Visible to customers" : "Not visible to customers"}
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="menu" value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="w-full h-12 grid grid-cols-3">
          <TabsTrigger value="menu" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Menu
          </TabsTrigger>
          <TabsTrigger value="hours" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Hours
          </TabsTrigger>
          <TabsTrigger value="location" className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            Location
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="menu" className="flex-1">
          <VendorMenu vendorId={id || ""} initialItems={vendor.menu} />
        </TabsContent>
        
        <TabsContent value="hours" className="flex-1">
          <VendorHours vendorId={id || ""} initialHours={vendor.hours} />
        </TabsContent>
        
        <TabsContent value="location" className="flex-1">
          <VendorLocation vendorId={id || ""} initialAddress={vendor.address} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorDashboard;

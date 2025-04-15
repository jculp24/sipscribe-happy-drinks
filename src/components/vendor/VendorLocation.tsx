
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface VendorLocationProps {
  vendorId: string;
  initialAddress: string;
}

export function VendorLocation({ vendorId, initialAddress }: VendorLocationProps) {
  const { toast } = useToast();
  const [address, setAddress] = useState(initialAddress);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  
  const saveLocation = () => {
    // In a real app, this would save to the database and update coordinates
    console.log("Saving location for vendor", vendorId, {
      address,
      city,
      state,
      zip
    });
    
    toast({
      title: "Location updated",
      description: "Your business location has been updated.",
    });
  };
  
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-1">
        <h3 className="font-semibold">Set Your Location</h3>
        <p className="text-sm text-muted-foreground">
          Help customers find your business on the map.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium">
            Street Address
          </label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium">
            City
          </label>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Philadelphia"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="state" className="text-sm font-medium">
              State
            </label>
            <Input
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="PA"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="zip" className="text-sm font-medium">
              ZIP Code
            </label>
            <Input
              id="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="19107"
            />
          </div>
        </div>
        
        <div className="h-48 bg-secondary flex items-center justify-center rounded-md border border-border">
          <p className="text-muted-foreground text-center">
            Map preview would appear here
            <br />
            <span className="text-sm">(Requires Mapbox integration)</span>
          </p>
        </div>
      </div>
      
      <Button onClick={saveLocation} className="w-full">
        Save Location
      </Button>
    </div>
  );
}

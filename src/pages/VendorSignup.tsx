
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { vendors } from "@/data/mockData";

const VendorSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    address: "",
    primaryCategory: "Coffee",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Generate a new unique ID (in a real app, this would be handled by the backend)
      const newId = `v${vendors.length + 1}`;
      
      // In a real app, this would be saved to the database
      const newVendor = {
        id: newId,
        ...formData,
        distance: "0.0 mi", // Would be calculated based on user location in a real app
        rating: 0,
        hours: "Not set",
        menu: [],
        isActive: false,
      };
      
      // For demo purposes, we're not actually modifying the vendors array
      // as that would require proper state management across the app
      console.log("New vendor signup:", newVendor);
      
      toast({
        title: "Signup successful!",
        description: "You can now complete your vendor profile.",
      });
      
      setIsSubmitting(false);
      navigate(`/vendor-dashboard/${newId}`);
    }, 1500);
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
        <h1 className="text-lg font-semibold">Join as a Vendor</h1>
        <div className="w-8"></div> {/* Empty div for layout balance */}
      </header>
      
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Partner with Sipscribe</h2>
          <p className="text-muted-foreground">
            Start sharing your beverages with our subscription network
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Business Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your business name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Business Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contact@yourbusiness.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 555-5555"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="primaryCategory" className="text-sm font-medium">
              Primary Category
            </label>
            <select
              id="primaryCategory"
              name="primaryCategory"
              value={formData.primaryCategory}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            >
              <option value="Coffee">Coffee</option>
              <option value="Bubble Tea">Bubble Tea</option>
              <option value="Juice">Juice</option>
              <option value="Smoothie">Smoothie</option>
              <option value="Tea">Tea</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              Business Address
            </label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="1234 Main St, City, State ZIP"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Business Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell customers about your business..."
              rows={3}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Sign Up as Vendor"}
          </Button>
        </form>
        
        <p className="mt-6 text-center text-sm text-muted-foreground">
          By signing up, you agree to Sipscribe's <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </main>
    </div>
  );
};

export default VendorSignup;

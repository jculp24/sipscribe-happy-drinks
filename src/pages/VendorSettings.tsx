
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { vendors } from "@/data/mockData";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const VendorSettings = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, this would come from the database
  const vendor = vendors.find(v => v.id === id) || {
    id: id || "new",
    name: "Your Business Name",
    description: "Your business description",
    address: "Your address",
    hours: "9:00 AM - 5:00 PM",
    primaryCategory: "Coffee",
    distance: "0.0 mi",
    rating: 0,
    menu: []
  };
  
  const [formData, setFormData] = useState({
    name: vendor.name,
    description: vendor.description,
    primaryCategory: vendor.primaryCategory,
    email: "",
    phone: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const saveSettings = () => {
    // In a real app, this would save to the database
    console.log("Saving vendor settings", formData);
    
    toast({
      title: "Settings saved",
      description: "Your business information has been updated.",
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
        <h1 className="text-lg font-semibold">Vendor Settings</h1>
        <div className="w-8"></div>
      </header>
      
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Business Information</h2>
            <p className="text-sm text-muted-foreground">
              Update your business details and preferences
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Business Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                rows={3}
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
              >
                <option value="Coffee">Coffee</option>
                <option value="Bubble Tea">Bubble Tea</option>
                <option value="Juice">Juice</option>
                <option value="Smoothie">Smoothie</option>
                <option value="Tea">Tea</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Contact Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contact@yourbusiness.com"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Contact Phone
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 555-5555"
              />
            </div>
            
            <Button onClick={saveSettings} className="w-full">
              Save Settings
            </Button>
          </div>
          
          <div className="pt-4 border-t border-border">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Delete Vendor Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    vendor account and remove all of your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      toast({
                        title: "Account deleted",
                        description: "Your vendor account has been deleted.",
                      });
                      navigate("/");
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorSettings;

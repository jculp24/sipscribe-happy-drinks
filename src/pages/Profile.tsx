
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, CreditCard, Heart, History, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { user } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const profileItems = [
  { 
    id: "subscription", 
    name: "Subscription Management", 
    icon: <CreditCard className="h-5 w-5" />,
    link: "/subscription"
  },
  { 
    id: "history", 
    name: "Order History", 
    icon: <History className="h-5 w-5" />,
    link: "/history"
  },
  { 
    id: "favorites", 
    name: "Favorites", 
    icon: <Heart className="h-5 w-5" />,
    link: "/favorites"
  },
  { 
    id: "settings", 
    name: "Account Settings", 
    icon: <Settings className="h-5 w-5" />,
    link: "/settings"
  }
];

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    
    // Simulate logout process
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out."
      });
      navigate("/");
    }, 500);
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
        <h1 className="text-lg font-semibold">My Profile</h1>
        <div className="w-10" />
      </header>
      
      <main className="flex flex-col w-full pb-16">
        <div className="p-6 flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        
        <div className="bg-secondary p-4 mx-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{user.subscriptionTier} Plan</h3>
              <p className="text-sm text-muted-foreground">Renews on {user.renewalDate}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/subscription")}
            >
              Manage
            </Button>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-sm">
              <span>Credits Remaining</span>
              <span className="font-semibold">{user.remainingCredits}</span>
            </div>
            <div className="w-full bg-muted h-2 rounded-full mt-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${(user.remainingCredits / 20) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="px-4">
          <h3 className="text-lg font-semibold mb-2">Account</h3>
          <div className="bg-card rounded-lg overflow-hidden divide-y divide-border">
            {profileItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start py-4 h-auto rounded-none"
                onClick={() => navigate(item.link)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="mt-6 px-4">
          <h3 className="text-lg font-semibold mb-2">Preferences</h3>
          <div className="bg-card rounded-lg overflow-hidden p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span>Dark Mode</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
        
        <div className="mt-8 px-4">
          <Button 
            variant="outline" 
            className="w-full justify-center items-center"
            onClick={handleLogout}
            disabled={loading}
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Log Out</span>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Profile;

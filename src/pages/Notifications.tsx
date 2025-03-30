
import { useNavigate } from "react-router-dom";
import { Bell, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  const navigate = useNavigate();

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
        <h1 className="text-lg font-semibold">Notifications</h1>
        <div className="w-10" />
      </header>
      
      <main className="flex flex-col items-center justify-center w-full py-16 px-4">
        <Bell className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold">No notifications yet</h2>
        <p className="text-muted-foreground text-center mt-2">
          We'll notify you about important updates, order status changes, and special offers.
        </p>
      </main>
    </div>
  );
};

export default Notifications;


import { Bell, MapPin, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

interface HeaderProps {
  location?: string;
  unreadNotifications?: boolean;
  className?: string;
}

export function Header({
  location = "Philadelphia, PA",
  unreadNotifications = false,
  className,
}: HeaderProps) {
  const { totalCredits } = useCart();
  
  return (
    <header
      className={cn(
        "w-full py-3 px-4 flex items-center justify-between bg-background border-b border-border",
        className
      )}
    >
      <div className="flex items-center gap-1">
        <MapPin className="h-4 w-4 text-foreground" aria-hidden="true" />
        <span className="text-sm font-medium text-foreground line-clamp-1">
          {location}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        
        <Button
          variant="ghost"
          size="icon"
          className="touch-target relative"
          asChild
          aria-label="Cart"
        >
          <Link to="/cart">
            <ShoppingCart className="h-5 w-5" />
            {totalCredits > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {totalCredits}
              </span>
            )}
          </Link>
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="touch-target relative"
          asChild
          aria-label="Notifications"
        >
          <Link to="/notifications">
            <Bell className="h-5 w-5" />
            {unreadNotifications && (
              <span className="absolute top-1 right-1 bg-primary h-2 w-2 rounded-full" />
            )}
          </Link>
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="touch-target"
          asChild
          aria-label="Profile"
        >
          <Link to="/profile">
            <User className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </header>
  );
}

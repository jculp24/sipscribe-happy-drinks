
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface VendorItemProps {
  id: string;
  name: string;
  distance: string;
  rating: number;
  primaryCategory?: string;
  className?: string;
}

export function VendorItem({
  id,
  name,
  distance,
  rating,
  primaryCategory,
  className,
}: VendorItemProps) {
  return (
    <Link
      to={`/vendor/${id}`}
      className={cn(
        "block w-full p-4 hover:bg-secondary transition-colors",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{name}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              <span>{distance}</span>
            </div>
            <div className="flex items-center">
              <span className="text-foreground">★</span>
              <span className="ml-0.5">{rating.toFixed(1)}</span>
            </div>
            {primaryCategory && (
              <>
                <span className="text-muted-foreground">•</span>
                <span>{primaryCategory}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

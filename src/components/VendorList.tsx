
import { VendorItem } from "@/components/VendorItem";
import { cn } from "@/lib/utils";

interface Vendor {
  id: string;
  name: string;
  distance: string;
  rating: number;
  primaryCategory?: string;
}

interface VendorListProps {
  vendors: Vendor[];
  className?: string;
  title?: string;
}

export function VendorList({ vendors, className, title }: VendorListProps) {
  if (vendors.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-muted-foreground">
        No vendors found.
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {title && (
        <h2 className="font-semibold text-lg px-4 pt-4 pb-2">{title}</h2>
      )}
      <div className="divide-y divide-border">
        {vendors.map((vendor) => (
          <VendorItem key={vendor.id} {...vendor} />
        ))}
      </div>
    </div>
  );
}

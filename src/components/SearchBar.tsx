
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  className,
  placeholder = "Search drinks, vendors...",
}: SearchBarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-12 h-12 w-full rounded-full bg-secondary border-0 text-lg shadow-lg"
        aria-label="Search"
      />
    </div>
  );
}

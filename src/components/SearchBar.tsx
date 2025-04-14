
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (value: string) => void;
  className?: string;
  placeholder?: string;
  value?: string;
}

export function SearchBar({
  onSearch,
  className,
  placeholder = "Search drinks, vendors...",
  value = "",
}: SearchBarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        type="search"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        className="pl-9 h-10 w-full"
        aria-label="Search"
      />
    </div>
  );
}

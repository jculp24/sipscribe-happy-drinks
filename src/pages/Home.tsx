
import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { DrinkCategories } from "@/components/DrinkCategories";
import { Map } from "@/components/Map";
import { VendorList } from "@/components/VendorList";
import { vendors } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter vendors based on category and search query
  const filteredVendors = vendors.filter((vendor) => {
    const matchesCategory = selectedCategory
      ? vendor.primaryCategory === selectedCategory
      : true;
    
    const matchesSearch = searchQuery
      ? vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-16">
        <div className="p-4 space-y-4">
          <SearchBar onSearch={setSearchQuery} />
          <DrinkCategories 
            selectedCategory={selectedCategory} 
            onSelect={setSelectedCategory} 
          />
        </div>
        
        <div className="px-4 pb-4">
          <div className="relative w-full h-40 bg-secondary rounded-lg overflow-hidden">
            <Map />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/70 to-transparent">
              <h2 className="font-medium">Discover nearby vendors</h2>
              <p className="text-sm text-muted-foreground">Find drinks in your area</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className="font-semibold text-lg">Vendors Near You</h2>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            asChild
          >
            <Link to="/vendor-signup">
              <Store className="h-4 w-4" />
              Become a Vendor
            </Link>
          </Button>
        </div>
        
        <VendorList vendors={filteredVendors} />
      </main>
    </div>
  );
};

export default Home;

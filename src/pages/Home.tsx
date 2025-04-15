
import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Map } from "@/components/Map";
import { SearchBar } from "@/components/SearchBar";
import { DrinkCategories } from "@/components/DrinkCategories";
import { VendorList } from "@/components/VendorList";
import { vendors, categories, user } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Cup, Salad, Wine } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleVendorClick = useCallback((vendorId: string) => {
    navigate(`/vendor/${vendorId}`);
  }, [navigate]);

  // Filter vendors based on search and category
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = searchQuery === "" || 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      vendor.primaryCategory?.toLowerCase() === categories.find(c => c.id === selectedCategory)?.name.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Add icons to categories
  const formattedCategories = [
    {
      id: "soda",
      name: "Soda",
      icon: "🥤"
    },
    {
      id: "diet-soda",
      name: "Diet Soda",
      icon: "🥤"
    },
    {
      id: "juice",
      name: "Juice",
      icon: "🧃"
    },
    {
      id: "water",
      name: "Water",
      icon: "💧"
    }
  ];

  return (
    <div className="sipscribe-container">
      <Header 
        unreadNotifications={true}
      />
      
      <main className="flex flex-col w-full pb-16">
        <Map 
          height="320px" 
          vendors={vendors.map(v => ({
            id: v.id,
            name: v.name,
            location: v.location
          }))}
          onVendorClick={handleVendorClick}
        />
        
        <div className="px-4 py-4">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
          />
        </div>
        
        <DrinkCategories 
          categories={formattedCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          className="my-3"
        />
        
        <VendorList 
          vendors={filteredVendors}
          title="Nearby Vendors"
        />
      </main>
    </div>
  );
};

export default Home;

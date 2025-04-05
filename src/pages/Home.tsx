
import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Map } from "@/components/Map";
import { SearchBar } from "@/components/SearchBar";
import { DrinkCategories } from "@/components/DrinkCategories";
import { VendorList } from "@/components/VendorList";
import { vendors, categories, user } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

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

  const formattedCategories = categories.map(category => ({
    ...category,
    icon: <span aria-hidden="true" className="text-lg">{category.icon}</span>
  }));

  return (
    <div className="sipscribe-container">
      <Header 
        unreadNotifications={true}
        location="Philadelphia, PA"
      />
      
      <main className="flex flex-col w-full pb-16">
        <Map 
          height="240px" 
          vendors={vendors.map(v => ({
            id: v.id,
            name: v.name,
            location: v.location
          }))}
          onVendorClick={handleVendorClick}
        />
        
        <div className="px-4 py-3">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
          />
        </div>
        
        <DrinkCategories 
          categories={formattedCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          className="my-2"
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

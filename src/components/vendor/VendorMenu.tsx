
import { useState } from "react";
import { PlusCircle, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
}

interface VendorMenuProps {
  vendorId: string;
  initialItems: MenuItem[];
}

export function VendorMenu({ vendorId, initialItems = [] }: VendorMenuProps) {
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialItems);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };
  
  const addMenuItem = () => {
    if (newItem.name && newItem.price) {
      // In a real app, this would save to the database
      const newMenuItem = {
        id: `item-${Date.now()}`,
        ...newItem
      };
      
      setMenuItems(prev => [...prev, newMenuItem]);
      setNewItem({ name: "", description: "", price: "" });
      setDialogOpen(false);
      
      toast({
        title: "Menu item added",
        description: `${newItem.name} has been added to your menu.`,
      });
    }
  };
  
  const removeMenuItem = (id: string) => {
    // In a real app, this would update the database
    setMenuItems(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: "Menu item removed",
      description: "The item has been removed from your menu.",
    });
  };
  
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Menu Items</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Menu Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Item Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Latte"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={newItem.description}
                  onChange={handleInputChange}
                  placeholder="Describe your item..."
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">
                  Price
                </label>
                <Input
                  id="price"
                  name="price"
                  value={newItem.price}
                  onChange={handleInputChange}
                  placeholder="$4.99"
                  required
                />
              </div>
              
              <Button onClick={addMenuItem} className="w-full">
                Add to Menu
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {menuItems.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No menu items yet.</p>
          <p className="text-sm mt-1">Add your first menu item to get started!</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {menuItems.map(item => (
            <div key={item.id} className="py-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="text-sm font-medium mt-1">{item.price}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeMenuItem(item.id)}
                className="text-destructive hover:bg-destructive/10"
                aria-label="Remove item"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

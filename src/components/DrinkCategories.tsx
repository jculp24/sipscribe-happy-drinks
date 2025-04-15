
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface DrinkCategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  className?: string;
}

export function DrinkCategories({
  categories = [],
  selectedCategory,
  onSelectCategory,
  className,
}: DrinkCategoriesProps) {
  if (!categories || categories.length === 0) {
    return null;
  }
  
  return (
    <div className={cn("w-full", className)}>
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: false,
          dragFree: true
        }}
      >
        <CarouselContent className="px-4">
          {categories.map((category) => (
            <CarouselItem key={category.id} className="basis-auto pl-0 pr-3">
              <button
                className={cn(
                  "category-pill", 
                  selectedCategory === category.id ? "active" : "inactive"
                )}
                onClick={() => onSelectCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                aria-pressed={selectedCategory === category.id}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

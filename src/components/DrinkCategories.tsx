
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}: DrinkCategoriesProps) {
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
              <Button
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className="h-auto py-2 px-3 rounded-full"
                onClick={() => onSelectCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                aria-pressed={selectedCategory === category.id}
              >
                <span className="flex items-center gap-1.5">
                  {category.icon}
                  <span className="text-xs font-medium">{category.name}</span>
                </span>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

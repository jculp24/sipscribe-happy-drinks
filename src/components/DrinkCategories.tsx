
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
    <div className={cn("w-full overflow-x-auto pb-2", className)}>
      <div className="flex space-x-3 px-4 min-w-max">
        {categories.map((category) => (
          <Button
            key={category.id}
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
        ))}
      </div>
    </div>
  );
}

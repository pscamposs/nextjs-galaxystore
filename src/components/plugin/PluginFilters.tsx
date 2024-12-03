import { Category } from "@/types/FilterTypes";
import { getIconByName } from "@/utils/IconUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { CategorySkeleton } from "../skeleton/CategorySkeleton";

interface IFilterComponent {
  onFilter: (filter: string) => void;
  categoryFilter: string;
}

export const PluginFilters = ({
  onFilter,
  categoryFilter,
}: IFilterComponent) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(`${process.env.API_URL}/categories`);
      return (await response.json()) as Category[];
    },
  });

  return (
    <div className="text-center mt-2 flex flex-col">
      {isLoading ? (
        <CategorySkeleton />
      ) : (
        categories?.map((category) => {
          return (
            <button
              key={category.id}
              className={`mt-2 rounded-sm ${
                categoryFilter === category.name.toLocaleLowerCase()
                  ? "bg-purple-900"
                  : "bg-zinc-900"
              } py-4 hover:bg-purple-800 transition-all `}
              onClick={() => onFilter(category.name)}
            >
              <FontAwesomeIcon icon={getIconByName(category.icon)} />
              <p>{category.name}</p>
            </button>
          );
        })
      )}
    </div>
  );
};

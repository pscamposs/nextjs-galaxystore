import { FilterType } from "@/types/FilterTypes";
import { createContext, useState } from "react";

interface FilterContextProps {
  filterTag: FilterType;
  updateFilterTag: (filterTag: FilterType) => void;
  filterName?: string;
  updateFilterName: (name: string) => void;
}

const FilterContext = createContext<FilterContextProps>({
  filterTag: FilterType.GERAL,
} as FilterContextProps);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filterTag, setFilterTag] = useState<FilterType>(FilterType.GERAL);
  const [filterName, setFilteName] = useState<string>();
  const updateFilterTag = (tag: FilterType) => {
    setFilterTag(tag);
  };

  const updateFilterName = (name: string) => {
    setFilteName(name);
  };

  return (
    <FilterContext.Provider
      value={{
        updateFilterTag,
        filterTag,
        filterName,
        updateFilterName,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export { FilterContext };

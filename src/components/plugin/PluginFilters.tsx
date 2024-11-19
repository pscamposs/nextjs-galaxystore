"use client";
import { useFilter } from "@/hooks/useFilter";
import { Category } from "@/types/FilterTypes";
import { getIconByName } from "@/utils/IconUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const PluginFilter = styled.div<{ selected: boolean }>`
  width: 100%;
  padding: 16px 8px;
  margin-top: 8px;
  background-color: ${(props) =>
    props.selected ? "var(--draft-color-2)" : "var(--secondary-dark)"};
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.2s;
  &:hover {
    background-color: var(--draft-color);
  }

  svg {
    font-size: 1.5rem;
  }
`;

const FilterContainer = styled.div`
  width: 100%;
`;

const fetchCategories = async () => {
  const response = await fetch(`${process.env.API_URL}/categories`);
  const json = (await response.json()) as Category[];
  return json;
};

export function PluginFilters({
  onFilter,
  categoryFilter,
}: {
  onFilter: (filter: string) => void;
  categoryFilter: string;
}) {
  const queryCategories = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <FilterContainer>
      {queryCategories.data?.map((category) => (
        <PluginFilter
          selected={category.name.toLowerCase() === categoryFilter}
          key={category.id}
          onClick={() => onFilter(category.name)}
        >
          <FontAwesomeIcon icon={getIconByName(category.icon)} />
          <p>{category.name}</p>
        </PluginFilter>
      ))}
    </FilterContainer>
  );
}

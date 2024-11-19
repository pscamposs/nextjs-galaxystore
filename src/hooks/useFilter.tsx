import { useContext } from "react";
import { FilterContext } from "../context/use-filter-context";

export function useFilter() {
  return useContext(FilterContext);
}

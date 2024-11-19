import { CartContext } from "@/context/use-cart-context";
import { useContext } from "react";

export default function useCart() {
  return useContext(CartContext);
}

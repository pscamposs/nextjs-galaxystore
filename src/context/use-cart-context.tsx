"use client";
import { fetchClient } from "@/libs/fetchClient";
import { ICart, Plugin } from "@/types/FilterTypes";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface CartContextProps {
  cart: ICart | undefined;
  removeItem: (plugin: Plugin) => void;
  addItem: (plugin: Plugin) => void;
  checkout: () => void;
}

export const CartContext = createContext({} as CartContextProps);

export const CartContexProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<ICart>();

  const router = useRouter();

  const { data: session } = useSession();

  const checkSessionStatus = async () => {
    if (!cart?.cartId) {
      router.push("/login");
    }
    return;
  };

  const fetchCart = async () => {
    const response = await fetchClient(`/cart`, {}, false);
    if (!response.ok) return [];
    return (await response.json()) as ICart;
  };

  const { refetch, data: userCart } = useQuery({
    queryKey: ["fetchCart"],
    queryFn: () => fetchCart(),
  });

  const removeItem = async (plugin: Plugin) => {
    checkSessionStatus();
    const response = await fetchClient(
      `/cart/${plugin.id}`,
      {
        method: "DELETE",
      },
      false
    );

    if (response) {
      toast.success("Plugin remivido do carrinho.");
      refetch();
    }
  };

  const addItem = async (plugin: Plugin) => {
    checkSessionStatus();
    const response = await fetchClient(
      `/cart/${plugin.id}`,
      {
        method: "PUT",
      },
      false
    );
    if (response.ok) {
      toast.success("Plugin adicionado ao seu carrinho.");
      refetch();
    }
  };

  const checkout = async () => {
    checkSessionStatus();
    const response = await fetchClient(
      `/payment/checkout/${cart?.cartId}`,
      {},
      false
    );
    if (response.ok) {
      const redirectUrl = await response.text();
      window.location.href = redirectUrl;
    } else {
      toast.error("Não foi possível completar sua solicitação");
    }
  };

  useEffect(() => {
    if (!session) return;
    refetch();
    if (userCart && !Array.isArray(userCart)) {
      setCart(userCart);
    }
  }, [refetch, session, userCart]);

  return (
    <CartContext.Provider
      value={{
        checkout,
        removeItem,
        addItem,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

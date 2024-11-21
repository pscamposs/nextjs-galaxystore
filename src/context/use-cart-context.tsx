"use client";
import { fetchClient } from "@/libs/fetchClient";
import { ICart, Plugin } from "@/types/FilterTypes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { toast } from "sonner";

interface CartContextProps {
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
    } else {
      const data = await response.json();
      toast.error(data?.message);
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

  return (
    <CartContext.Provider
      value={{
        checkout,
        addItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

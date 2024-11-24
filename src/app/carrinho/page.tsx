"use client";
import { ContentContainer } from "@/components/ContentContainer";
import Header from "@/components/Header";
import { Layout } from "@/components/Layout";
import Loader from "@/components/Loader";
import { LoaderButton } from "@/components/LoaderButton";
import { FormWrapper } from "@/components/plugin/FormContainer";
import { fetchClient } from "@/libs/fetchClient";
import { Plugin } from "@/types/FilterTypes";
import { centsToReal } from "@/utils/FormatUtils";
import { faDeleteLeft, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Cart() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const fetchUserCart = async () => {
    const response = await fetchClient("/cart");
    const data = await response.json();
    return data;
  };

  const {
    data: cart,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchUserCart,
  });

  const handleCheckout = async () => {
    setLoading(true);
    const response = await fetchClient(`/payment/checkout/${cart?.cartId}`);
    const data = await response.text();
    setLoading(false);
    if (response.ok) router.push(data);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const response = await fetchClient(`/cart/${id}`, { method: "DELETE" });
    setLoading(false);
    if (response.ok) {
      refetch();
      toast.success("Plugin removido do carrinho");
    }
  };

  return (
    <Layout header={<Header />}>
      <div className="flex justify-around flex-wrap gap-8 w-[70%] max-lg:w-[100%] m-auto py-8">
        <section className="bg-zinc-900 flex-1 p-12 max-lg:p-6">
          <div className="py-2">
            <h2 className="text-3xl font-bold text-zinc-100">Meu pedido</h2>
            <p className="text-zinc-200">Confira seu carrinho de compras</p>
          </div>
          {isFetching ? (
            <Loader />
          ) : (
            <div className="flex justify-center py-8 flex-col gap-2">
              {cart?.plugins.length > 0 ? (
                cart.plugins.map((plugin: Plugin) => {
                  return (
                    <div
                      key={plugin.id}
                      className="flex justify-between items-center w-[50%] max-lg:w-full bg-zinc-800 p-4 rounded-sm cursor-default m-auto relative"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          width={64}
                          height={64}
                          src={plugin.image}
                          alt="pluginImage"
                        />
                        <div>
                          <h2 className="text-zinc-200 font-bold text-lg line-clamp-1">
                            {plugin.name}
                          </h2>
                          <p>{plugin.category.name}</p>
                        </div>
                      </div>
                      <div>
                        <p className="bg-purple-900 p-2 rounded-md font-bold">
                          {centsToReal(plugin.price)}
                        </p>
                      </div>
                      <button className="absolute -right-2 -top-3">
                        <FontAwesomeIcon
                          icon={faDeleteLeft}
                          className="text-red-600"
                          onClick={() => handleDelete(plugin.id)}
                        />
                      </button>
                    </div>
                  );
                })
              ) : (
                <FontAwesomeIcon icon={faShoppingBag} size="6x" />
              )}
            </div>
          )}
        </section>
        <section>
          {isFetching ? (
            <Loader />
          ) : (
            <>
              <div>
                <h2 className="text-2xl">Cupom de desconto</h2>
                <FormWrapper>
                  <input placeholder="50GALAXY" />
                </FormWrapper>
              </div>
              <div className="text-zinc-100 font-bold text-lg bg-zinc-900 px-4 py-8">
                <div className="flex justify-between">
                  <h2>Subtotal</h2>
                  <span className="font-bold text-zinc-400">
                    {centsToReal(cart?.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <h2>Desconto</h2>
                  <span className="font-bold text-zinc-400">
                    {centsToReal(cart?.discount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <h2>Total</h2>
                  <span className="font-bold text-zinc-400">
                    {centsToReal(cart?.subtotal - cart?.discount)}
                  </span>
                </div>
              </div>
              {cart?.subtotal > 0 && (
                <LoaderButton
                  className="bg-purple-900 w-full mt-2 py-4 text-xl font-bold uppercase hover:bg-purple-800 transition-all"
                  onClick={handleCheckout}
                  loading={loading}
                  disabled={loading}
                >
                  Finalizar
                </LoaderButton>
              )}
            </>
          )}
        </section>
      </div>
    </Layout>
  );
}

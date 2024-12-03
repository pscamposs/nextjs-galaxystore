import { Plugin } from "@/types/FilterTypes";
import { centsToReal } from "@/utils/FormatUtils";
import Image from "next/image";
import { LoaderButton } from "../LoaderButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { fetchClient } from "@/libs/fetchClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";

export const PluginCard = ({ plugin }: { plugin: Plugin }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { toggleModal } = useModal();

  const addItem = async (plugin?: Plugin) => {
    setLoading(true);
    const response = await fetchClient(
      `/cart/${plugin?.id}`,
      {
        method: "PUT",
      },
      false
    );
    if (response.ok) {
      toast.success("Plugin adicionado ao seu carrinho.");
    } else if (response.status == 409) {
      const data = await response.json();
      toast.error(data.message);
    } else {
      router.push("/login");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center text-center min-w-[200px]">
      <div>
        <Image
          alt="icon"
          width={84}
          height={64}
          src={plugin.image}
          className="cursor-pointer"
          onClick={() => toggleModal(plugin)}
        />
      </div>
      <div className="w-full">
        <p className="bg-zinc-900 p-2 rounded-sm">{plugin.category.name}</p>
        <div className="py-2">
          <h2 className="font-bold">{plugin.name}</h2>
          <p>{centsToReal(plugin.price)}</p>
        </div>
        <LoaderButton
          className="bg-purple-800 p-2 rounded-sm hover:bg-purple-900 transition-all w-full"
          loading={loading}
          onClick={() => addItem(plugin)}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="ml-1 text-sm ">Adicionar ao carrinho</span>
        </LoaderButton>
      </div>
    </div>
  );
};

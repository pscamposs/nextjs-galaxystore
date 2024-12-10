import { useContext, useState } from "react";
import { ModalContext } from "../../context/use-modal-context";
import GeneralContent from "./(tabs)/GeneralContent";
import CommandsContent from "./(tabs)/CommandsContent";
import PermissionsContent from "./(tabs)/PermissionContent";
import UpdatesContent from "./(tabs)/UpdatesContent";
import Image from "next/image";
import { centsToReal } from "@/utils/FormatUtils";
import { LoaderButton } from "../LoaderButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { Plugin } from "@/types/FilterTypes";
import { fetchClient } from "@/libs/fetchClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ModalTabs() {
  const { tab, toggleTab, plugin, toggleModal } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      toggleModal();
    }
    setLoading(false);
  };
  const tabs = {
    Geral: <GeneralContent />,
    Comandos: <CommandsContent />,
    Perms: <PermissionsContent />,
    Updates: <UpdatesContent />,
  };

  const handleChangeTab = (target: string) => {
    const view = Object.entries(tabs).filter((t) => t[0] == target)[0];
    toggleTab(view);
  };
  return (
    <div>
      <div>
        <div className="flex items-center gap-4 cursor-default py-8 mb-4">
          <div className="bg-zinc-900 p-4">
            <Image
              width={64}
              height={64}
              src={plugin?.image || ""}
              alt="pluginImage"
            />
          </div>
          <div className="flex flex-col justify-between h-24">
            <div>
              <h2 className="text-slate-400">{plugin?.category.name}</h2>
              <p className="font-bold text-2xl">{plugin?.name}</p>
            </div>
            <div>
              <span className="text-zinc-300">
                {plugin?.downloads} downloads
              </span>
              <p className="text-zinc-100">{centsToReal(plugin?.price || 0)}</p>
              <LoaderButton
                onClick={() => addItem(plugin)}
                loading={loading}
                className="py-2"
              >
                <FontAwesomeIcon icon={faShop} className="mx-2" />
                Comprar
              </LoaderButton>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 py-2 border-b border-zinc-700">
        {Object.entries(tabs).map(([key, value]) => {
          return (
            <button
              className={`font-light border-b-2 text-sm border-zinc-700 ${
                tab.label === key && "border-purple-500"
              } transition-all hover:text-purple-700 `}
              onClick={() => handleChangeTab(key)}
              key={key}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}

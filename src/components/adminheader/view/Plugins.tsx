import Loader from "@/components/Loader";
import { fetchClient } from "@/libs/fetchClient";
import { Plugin } from "@/types/FilterTypes";
import { faPlug, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Profile } from "./Profile";
import { PluginCreation } from "./PluginCreationg";

export const PluginsView = ({
  setView,
}: {
  setView: (label: string, view: any) => void;
}) => {
  const { data: plugins } = useQuery({
    queryKey: ["plugin"],
    queryFn: async () => {
      const response = await fetchClient("/plugins");

      return (await response.json()) as Plugin[];
    },
  });

  if (!plugins) return <Loader />;

  return (
    <div>
      <h1 className="font-medium text-2xl">Plugins na Loja</h1>
      <section className="py-4">
        <div>
          <button
            className="bg-purple-900 px-4 py-2 rounded-sm hover:bg-purple-800"
            onClick={() =>
              setView("Plugins", <PluginCreation setView={setView} />)
            }
          >
            Adicionar
          </button>
        </div>
      </section>
      {plugins.length == 0 && (
        <section className="text-slate-200 text-center py-8">
          <FontAwesomeIcon icon={faPlug} size="4x" />
          <h2 className="text-xl ">A loja não possuí plugins</h2>
        </section>
      )}

      <section className="flex gap-4 flex-wrap py-8">
        {plugins.map((plugin: Plugin) => {
          return (
            <div
              key={plugin.id}
              className="flex items-center  gap-4 cursor-default"
            >
              <div className="bg-zinc-900 p-6">
                <Image
                  width={64}
                  height={64}
                  src={plugin.image}
                  alt="pluginImage"
                />
              </div>
              <div className="flex flex-col justify-between h-24">
                <div>
                  <h2 className="text-slate-400">{plugin.category.name}</h2>
                  <p className="font-bold text-2xl">{plugin.name}</p>
                  <span className="font-medium text-zinc-500">0 Downloads</span>
                </div>
                <div>
                  <button className="bg-purple-900 px-4 py-2 rounded-sm hover:bg-purple-800">
                    Editar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

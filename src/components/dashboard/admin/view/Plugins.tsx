import { fetchClient } from "@/libs/fetchClient";
import { Category, Plugin } from "@/types/FilterTypes";
import { faDeleteLeft, faPlug } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { PluginCreation } from "./PluginCreation";
import { getIconByName } from "@/utils/IconUtils";
import { toast } from "sonner";
import { PluginEditor } from "./PluginEdition";
import { PluginUpdate } from "./PluginUpdate";
import { centsToReal } from "@/utils/FormatUtils";
import { CategorySkeleton } from "@/components/skeleton/CategorySkeleton";
import { PluginSkeleton } from "@/components/skeleton/PluginSkeleton";
import Image from "next/image";

export const PluginsView = ({
  setView,
}: {
  setView: (label: string, view: any) => void;
}) => {
  const {
    data: plugins,
    refetch: pluginRefetch,
    isLoading: isLoadingPluins,
  } = useQuery({
    queryKey: ["plugin"],
    queryFn: async () => {
      const response = await fetchClient("/plugins");

      return (await response.json()) as Plugin[];
    },
  });

  const {
    data: categories,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["categoriess"],
    queryFn: async () => {
      const response = await fetchClient("/categories");

      return (await response.json()) as Category[];
    },
  });

  const handleDeleteCategory = async (id: string) => {
    const response = await fetchClient(
      `/categories/${id}`,
      {
        method: "DELETE",
      },
      false
    );
    if (!response.ok) {
      const data = await response.json();
      toast.error(data.message || "Não foi possível deletar");
      return;
    }
    refetch();
    toast.success("Categoria deletada com sucesso.");
  };

  const handleDeletePlugin = async (id: string) => {
    const response = await fetchClient(
      `/plugins/${id}`,
      {
        method: "DELETE",
      },
      false
    );
    if (!response.ok) {
      const data = await response.json();
      toast.error(data.message || "Não foi possível deletar");
      return;
    }
    pluginRefetch();
    toast.success("Plugin deletado com sucesso.");
  };

  return (
    <div>
      <section>
        <h2 className="font-medium text-2xl">Categorias</h2>

        {isLoading ? (
          <CategorySkeleton />
        ) : (
          <div className="flex gap-2 py-4 overflow-x-auto">
            {categories?.map((categorie) => {
              return (
                <div
                  key={categorie.id}
                  className="bg-zinc-900 py-4 px-6 relative text-center w-32 hover:scale-105 transition-all cursor-pointer"
                >
                  <FontAwesomeIcon icon={getIconByName(categorie.icon)} />
                  <p>{categorie.name}</p>
                  <button
                    className="absolute -right-1 -top-2 text-red-600 hover:text-red-700 transition-all font-bold"
                    onClick={() => handleDeleteCategory(categorie.id)}
                  >
                    <FontAwesomeIcon icon={faDeleteLeft} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
      <section>
        <h1 className="font-medium text-2xl">Plugins na Loja</h1>

        {isLoadingPluins ? (
          <div className="py-4">
            <PluginSkeleton />
            <PluginSkeleton />
            <PluginSkeleton />
          </div>
        ) : (
          <>
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

            {plugins?.length == 0 && (
              <section className="text-slate-200 text-center py-8">
                <FontAwesomeIcon icon={faPlug} size="4x" />
                <h2 className="text-xl ">A loja não possuí plugins</h2>
              </section>
            )}

            <section className="flex gap-6 max-lg:gap-16 flex-wrap py-8">
              {plugins?.map((plugin: Plugin) => {
                return (
                  <div
                    key={plugin.id}
                    className="relative flex items-center gap-4 cursor-default hover:scale-105 transition-all border-l-2 border-zinc-600 px-2"
                  >
                    <div className="bg-zinc-900 p-6">
                      <Image
                        width={64}
                        height={64}
                        alt="icon"
                        src={plugin.image}
                      />
                    </div>
                    <div className="flex flex-col justify-between h-28">
                      <div>
                        <h2 className="text-slate-400">
                          {plugin.category.name}
                        </h2>
                        <p className="font-bold text-2xl">{plugin.name}</p>
                        <span className="font-medium text-zinc-500">
                          0 Downloads
                        </span>
                        <p className="py-2 text-zinc-400 font-bold">
                          {centsToReal(plugin.price)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="bg-purple-900 px-4 py-2 rounded-sm hover:bg-purple-800"
                          onClick={() =>
                            setView(
                              "Plugins",
                              <PluginEditor plugin={plugin} setView={setView} />
                            )
                          }
                        >
                          Editar
                        </button>
                        <button
                          className="bg-purple-900 px-4 py-2 rounded-sm hover:bg-purple-800"
                          onClick={() =>
                            setView(
                              "Plugins",
                              <PluginUpdate plugin={plugin} setView={setView} />
                            )
                          }
                        >
                          Atualização
                        </button>
                      </div>
                    </div>
                    <button
                      className="absolute -right-1 -top-2 text-red-600 hover:text-red-700 transition-all font-bold"
                      onClick={() => handleDeletePlugin(plugin.id)}
                    >
                      <FontAwesomeIcon icon={faDeleteLeft} />
                    </button>
                  </div>
                );
              })}
            </section>
          </>
        )}
      </section>
    </div>
  );
};

import { InputCurrency } from "@/components/input/InputCurrency";
import { Selector } from "@/components/input/Selector";
import { CategoryCreation } from "./CategoryCreation";
import { TextArea } from "@/components/input/TextArea";
import { Input } from "@/components/input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PluginsView } from "./Plugins";
import { toast } from "sonner";
import { fetchClient } from "@/libs/fetchClient";
import { useState } from "react";
import { Category, Plugin } from "@/types/FilterTypes";
import { useQuery } from "@tanstack/react-query";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { LoaderButton } from "@/components/LoaderButton";

export const PluginEditor = ({
  setView,
  plugin,
}: {
  setView: (label: string, view: any) => void;
  plugin: Plugin;
}) => {
  const {
    data: categories,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await fetchClient("/categories", {
        method: "GET",
      });

      return (await response.json()) as Category[];
    },
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Plugin>(plugin);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    setLoading(true);

    const response = await fetchClient(
      "/plugins",
      {
        method: "PUT",
        body: JSON.stringify({
          ...data,
          version: data.version.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      false
    );

    if (!response.ok) {
      const data = await response.json();
      toast.error(data.message || "Não foi possível editar o plugin.");
      setLoading(false);
      return;
    }

    toast.success("Plugin editado com sucesso.");
    setView("Plugins", <PluginsView setView={setView} />);
    setLoading(false);
  }

  return (
    <section className="plugin-editor">
      <h1>
        <button
          className="mr-2 py-1 px-2 rounded hover:bg-zinc-600"
          onClick={() => setView("Plugins", <PluginsView setView={setView} />)}
        >
          <FontAwesomeIcon icon={faLeftLong} />
        </button>
        Editando plugin
      </h1>
      <div className="w-full">
        <form
          className="flex justify-center gap-8 max-lg:flex-col"
          onSubmit={handleSubmit}
        >
          <section className="flex-1 max-w-[400px]">
            <Input
              placeholder="Galaxy plugin"
              label="Titulo"
              name="name"
              required
              value={data.name}
              onChange={(e) =>
                setData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <Input
              placeholder="URL da imagem"
              label="Imagem"
              name="image"
              required
              value={data.image}
              onChange={(e) =>
                setData((prev) => ({ ...prev, image: e.target.value }))
              }
            />
            <TextArea
              label="Descrição"
              name="description"
              value={data.description}
              onChange={(e) =>
                setData((prev) => ({ ...prev, description: e.target.value }))
              }
            />

            <Selector
              label="Categoria"
              view={<CategoryCreation />}
              selectorOptions={categories?.map((cat) => ({
                label: cat.name,
                value: cat.id,
              }))}
              refetch={refetch}
              name="category"
              value={data.category.id}
              onChange={(value) =>
                setData((prev) => ({
                  ...prev,
                  category:
                    categories?.find((cat) => cat.id === value) ||
                    prev.category,
                }))
              }
              loading={isFetching}
            />
          </section>
          <section>
            <InputCurrency
              placeholder="R$0,00"
              label="Preço"
              name="price"
              required
              value={data.price}
              onChange={(event) =>
                setData((prev) => ({
                  ...prev,
                  price: parseFloat(event.target.value),
                }))
              }
            />

            <Selector
              label="Versão"
              name="version"
              selectorOptions={plugin.updates.map((update) => ({
                label: update.version,
                value: update.id,
              }))}
              value={data.version.id}
              onChange={(value) =>
                setData((prev) => ({
                  ...prev,
                  version:
                    plugin.updates.find((update) => update.id === value) ||
                    prev.version,
                }))
              }
              loading={isFetching}
            />

            <LoaderButton
              className="p-2 bg-purple-800 mt-2 rounded-sm w-full"
              type="submit"
              loading={loading}
            >
              Salvar
            </LoaderButton>
          </section>
        </form>
      </div>
    </section>
  );
};

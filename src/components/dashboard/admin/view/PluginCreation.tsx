import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PluginsView } from "./Plugins";
import { Input } from "@/components/input/Input";
import { TextArea } from "@/components/input/TextArea";
import { Selector } from "@/components/input/Selector";
import { FileInput } from "@/components/input/FileInput";
import { InputCurrency } from "@/components/input/InputCurrency";
import { LoaderButton } from "@/components/LoaderButton";
import { CategoryCreation } from "./CategoryCreation";
import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "@/libs/fetchClient";
import { Category, Plugin } from "@/types/FilterTypes";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/Loader";

/* TODO:
  Corrigir o fetch de categorias: não está buscando na atualização
*/
export const PluginCreation = ({
  setView,
}: {
  setView: (label: string, view: any) => void;
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

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      version: formData.get("version"),
      description: formData.get("description"),
      image: formData.get("image"),
      category: formData.get("category"),
    };

    const response = await fetchClient(
      "/plugins",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
      false
    );

    if (!response.ok) {
      const data = await response.json();
      toast.error(data.message || "Não foi possível criar o plugin.");
    } else {
      setView("Plugins", <PluginsView setView={setView} />);
      const plugin = (await response.json()) as Plugin;
      const upload = await fetchClient(`/plugins/${plugin.version.id}/upload`, {
        method: "POST",
        body: formData,
      });
      const uploadData = await upload.json();
      if (upload.ok) {
        toast.success("Plugin criado com sucesso.");
      } else {
        toast.error(uploadData.message || "Erro ao fazer upload do plugin.");
      }
    }

    setLoading(false);
  }

  return (
    <section className="">
      <h1>
        <button
          className="mr-2 py-1 px-2 rounded hover:bg-zinc-600"
          onClick={() => setView("Plugins", <PluginsView setView={setView} />)}
        >
          <FontAwesomeIcon icon={faLeftLong} />
        </button>
        Adicionando plugin
      </h1>
      <div className="w-full">
        <form
          className="flex justify-center gap-8 max-lg:flex-wrap"
          onSubmit={handleSubmit}
        >
          <section className="flex-1 max-w-[400px]">
            <Input
              placeholder="Galaxy plugin"
              label="Titulo"
              name="name"
              required
            />
            <Input
              placeholder="Galaxy plugin"
              label="Imagem"
              name="image"
              required
            />
            <TextArea label="Descrição" name="description" />
            <FileInput
              name="file"
              label="Midia"
              description="Aceita arquivos jar, rar e zip."
              accept=".jar"
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
              loading={isFetching}
            />
          </section>
          <section>
            <InputCurrency
              placeholder="R$0,00"
              label="Preço"
              name="price"
              required
            />
            <Input placeholder="1.0.0" label="Versão" name="version" required />

            <LoaderButton
              className="p-2 bg-purple-800 mt-2 rounded-sm w-full"
              type="submit"
              loading={loading}
            >
              Adicionar
            </LoaderButton>
          </section>
        </form>
      </div>
    </section>
  );
};

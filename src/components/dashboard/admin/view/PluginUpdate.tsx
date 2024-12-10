import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PluginsView } from "./Plugins";
import { Input } from "@/components/input/Input";
import { TextArea } from "@/components/input/TextArea";
import { LoaderButton } from "@/components/LoaderButton";
import { fetchClient } from "@/libs/fetchClient";
import { Plugin, Update } from "@/types/FilterTypes";
import { useState } from "react";
import { toast } from "sonner";
import { FileInput } from "@/components/input/FileInput";

export const PluginUpdate = ({
  setView,
  plugin,
}: {
  setView: (label: string, view: any) => void;
  plugin: Plugin;
}) => {
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setView("Plugins", <PluginsView setView={setView} />);
  };

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const description = formData.get("description");
    const version = formData.get("version");
    const response = await fetchClient(
      "/plugins/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          version,
          plugin: plugin.id,
        }),
      },
      false
    );

    if (response.ok) {
      handleClose();

      const update = (await response.json()) as Update;
      const upload = await fetchClient(`/plugins/${update.id}/upload`, {
        method: "POST",
        body: formData,
      });
      const uploadData = await upload.json();
      if (upload.ok) {
        toast.success("Update criado com sucesso.");
      } else {
        toast.error(uploadData.message || "Erro ao fazer update do plugin.");
      }
    } else {
      const data = await response.json();
      toast.error(data.message || "Não foi possível criar o update");
    }

    setLoading(false);
  }

  return (
    <section className="">
      <h1>
        <button
          className="mr-2 py-1 px-2 rounded hover:bg-zinc-600"
          onClick={() => handleClose()}
        >
          <FontAwesomeIcon icon={faLeftLong} />
        </button>
        Novo update - {plugin.name}
      </h1>
      <div className="w-full">
        <form
          className="flex justify-center gap-8 max-lg:flex-wrap"
          onSubmit={handleSubmit}
        >
          <section className="flex-1 max-w-[400px]">
            <TextArea label="Descrição da atualização" name="description" />
            <Input placeholder="1.0.0" label="Versão" name="version" />
            <FileInput
              name="file"
              label="Midia"
              description="Aceita arquivos jar, rar e zip"
            />
            <LoaderButton
              loading={loading}
              className="bg-purple-700 w-full py-2 my-2 font-bold hover:bg-purple-800 transition-all"
            >
              Enviar
            </LoaderButton>
          </section>
        </form>
      </div>
    </section>
  );
};

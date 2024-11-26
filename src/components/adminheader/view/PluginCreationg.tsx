import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PluginsView } from "./Plugins";
import { FormWrapper } from "@/components/plugin/FormContainer";
import { Input } from "@/components/Input";
import { TextArea } from "@/components/TextArea";
import { Selector } from "@/components/Selector";
import { FileInput } from "@/components/FileInput";
import { InputCurrency } from "@/components/InputCurrency";
import { LoaderButton } from "@/components/LoaderButton";

export const PluginCreation = ({
  setView,
}: {
  setView: (label: string, view: any) => void;
}) => {
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
        <form className="flex justify-center gap-8 max-lg:flex-wrap">
          <section className="flex-1  max-w-[400px]">
            <Input placeholder="Galaxy plugin" label="Titulo" required />
            <TextArea label="Descrição" />
            <FileInput
              label="Midia"
              description="Aceita arquivos jar, rar e zip."
              accept=".jar"
              required
            />
            <Selector
              label="Categoria"
              selectorOptions={["Geral", "Factions", "RankUp"]}
            />
          </section>
          <section>
            <InputCurrency placeholder="R$0,00" label="Preço" required />
            <Input placeholder="1.0.0" label="Versão" required />
            <Selector
              label="Status"
              selectorOptions={["Ativo", "Pausado", "Privado"]}
            />
            <LoaderButton className="p-2 bg-purple-800 mt-2 rounded-sm w-full">
              Adicionar
            </LoaderButton>
          </section>
        </form>
      </div>
    </section>
  );
};

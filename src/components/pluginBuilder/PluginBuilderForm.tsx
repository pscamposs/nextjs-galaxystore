import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormWrapper } from "../plugin/FormContainer";
import {
  faCoins,
  faFont,
  faImage,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { Plugin } from "@/types/FilterTypes";
import PluginFileDrag from "./PluginFileDrag";
import styled from "styled-components";
import { useSession } from "next-auth/react";

interface BuilderFormProps {
  setDialogOpen: any;
  setPlugin: (plugin: any) => void;
  setFile: (file: File | null) => void;
  plugin?: Plugin | any;
  file?: File | null;
  editing?: boolean;
}

const BuilderForm = styled.form``;

export default function PluginBuilderForm({
  setDialogOpen,
  setPlugin,
  setFile,
  plugin,
  file,
  editing,
}: BuilderFormProps) {
  const handleDialog = (e: React.SyntheticEvent) => {
    setDialogOpen((prev: boolean) => !prev);
    setPlugin({
      canEdit: true,
    });
    setFile(null);
  };

  const handlePluginForm = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPlugin((prevPlugin: Plugin) => ({
      ...prevPlugin,
      [event.target.name]: event.target.value,
    }));
  };

  const validatePlugin = () => {
    if (editing) return plugin?.name && plugin.price && plugin.category;
    else return plugin?.name && plugin.price && plugin.category && file;
  };

  const { data: session } = useSession();

  const formHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    let formData = new FormData(event.target as HTMLFormElement);

    if (editing) {
      const response = await fetch(
        `${process.env.API_URL}/plugin/${plugin._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${session?.user?.accessToken}`,
          },
          body: JSON.stringify({
            id: plugin._id,
            update: plugin,
          }),
        }
      );
    } else {
      const response = await fetch(`${process.env.API_URL}/plugin`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `${session?.user?.accessToken}`,
        },
      });
    }
  };

  return (
    <BuilderForm onSubmit={formHandler}>
      <div>
        <FormWrapper>
          <FontAwesomeIcon icon={faFont} />
          <input
            type="text"
            placeholder="Nome do Plugin"
            required
            name="name"
            onChange={handlePluginForm}
            value={plugin.name}
          />
        </FormWrapper>
        <FormWrapper>
          <FontAwesomeIcon icon={faCoins} />
          <input
            type="number"
            placeholder="Preço do Plugin (centavos)"
            step={5}
            required
            name="price"
            onChange={handlePluginForm}
            value={plugin.price}
          />
        </FormWrapper>

        <FormWrapper>
          <FontAwesomeIcon icon={faTag} />
          <input
            type="text"
            placeholder="Categoria do Plugin"
            required
            name="category"
            onChange={handlePluginForm}
            value={plugin.category}
          />
        </FormWrapper>
        <div>
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            cols={10}
            name="description"
            onChange={handlePluginForm}
            value={plugin.description}
          ></textarea>
        </div>

        <div>
          {validatePlugin() && <button id="submit">Enviar</button>}
          <button id="cancel" onClick={handleDialog} type="reset">
            Cancelar
          </button>
        </div>
      </div>
      <div>
        <PluginFileDrag setFile={setFile} file={file} />
      </div>
    </BuilderForm>
  );
}

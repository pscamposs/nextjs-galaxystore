import { useState } from "react";
import PluginBuilderForm from "./PluginBuilderForm";
import PluginCard from "../plugin/PluginCard";
import { Plugin } from "@/types/FilterTypes";
import styled from "styled-components";
import PluginFileDrag from "./PluginFileDrag";

const PluginDialog = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;

  padding: 2rem;

  height: 100vh;

  background-color: rgba(0, 0, 0, 0.7);

  form {
    width: 100%;
    background-color: var(--primary-dark);
    padding: 16px 32px;
    display: flex;
    flex-wrap: wrap;
  }

  label {
    display: block;
    margin: 8px 0 0 0;
    font-weight: 600;
  }

  textarea {
    background-color: var(--secondary-dark);
    border: none;
    border-bottom: 1px solid var(--draft-color-2);
    color: var(--draft-color);
    width: 100%;
    border-radius: 8px;

    padding: 12px 4px;
    font-size: 1.1rem;
    outline: none;
  }

  button {
    padding: 8px 12px;
    border: none;
    margin: 4px;
    cursor: pointer;
    font-weight: medium;
    background-color: transparent;
    outline: none;
    &:hover {
      opacity: 0.8;
    }
  }

  #submit {
    color: #00ca60;
    border-bottom: 1px solid #00ca60;
  }
  #cancel {
    color: #fc7d75;
  }

  #pluginFileDialog {
    background-color: var(--primary-dark);
    display: flex;
    justify-content: center;
    flex-direction: column;
    line-height: 150%;
    color: var(--draft-color-2);

    padding: 16px;

    input {
      display: none;
    }

    button {
      color: #f2f2f2;
    }
  }
`;

export default function PluginBuilder({
  setDialogOpen,
  title,
  editPlugin,
}: {
  setDialogOpen: any;
  title: string;
  editPlugin?: Plugin;
}) {
  const [plugin, setPlugin] = useState<any>(
    editPlugin ?? {
      canEdit: true,
    }
  );
  const [file, setFile] = useState<File | null>();

  return (
    <PluginDialog>
      <section>
        <h2>{title}</h2>
        <p>Adicione as informações necessárias</p>
        <div>
          <PluginBuilderForm
            setDialogOpen={setDialogOpen}
            setPlugin={setPlugin}
            setFile={setFile}
            file={file}
            plugin={plugin}
            editing={!!editPlugin}
          />
        </div>
      </section>
      {/* <section>
        <PluginCard plugin={plugin} edit={false} />
      </section> */}
    </PluginDialog>
  );
}

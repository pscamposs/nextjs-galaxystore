import {
  faCloudArrowDown,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import styled from "styled-components";

interface DialogProps {
  isHover: boolean;
}

const PluginDropContainer = styled.div<DialogProps>`
  border: ${(props) => (props.isHover ? "1px dashed #fff" : "none")};
`;

interface FileDragProps {
  setFile: (file: File) => void;
  file?: File | null;
}

export default function PluginFileDrag({ setFile, file }: FileDragProps) {
  const [drag, setDrag] = useState(false);

  const handlePluginFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragHover = (event: React.DragEvent<HTMLDivElement>) => {
    setDrag(true);
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDragExit = (event: React.DragEvent<HTMLDivElement>) => {
    setDrag(false);
    event.preventDefault();
  };

  const handlePluginDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDrag(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFile(droppedFiles[0]);
  };

  const fileDialogRef = useRef<any>();

  const handleFileDialog = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fileDialogRef.current.click();
  };

  return (
    <PluginDropContainer
      id="pluginFileDialog"
      onDragOver={handleDragHover}
      onDragLeave={handleDragExit}
      onDrop={handlePluginDrop}
      isHover={drag}
    >
      <input
        type="file"
        name="file"
        id="plugin"
        ref={fileDialogRef}
        onChange={handlePluginFile}
      />
      <FontAwesomeIcon
        icon={drag ? faCloudArrowUp : faCloudArrowDown}
        size="10x"
      />
      <h3>Arraste o arquivo do plugin</h3>
      <p>ou</p>
      <button onClick={handleFileDialog}>Escolher um arquivo</button>

      {file && (
        <div>
          <p>{file.name}</p>
        </div>
      )}
    </PluginDropContainer>
  );
}

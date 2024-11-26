import { formatBytes } from "@/utils/FormatUtils";
import { useRef, useState } from "react";

export interface IInput
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    React.AriaAttributes {
  label?: string;
  description?: string;
}
export const FileInput: React.FC<IInput> = (props) => {
  const { children, label, description, ...rest } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File>();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files?.[0];
    if (files) setFile(files);
  }

  return (
    <div>
      <label className="block text-sm font-bold py-2" htmlFor={label}>
        {label}
      </label>

      <input
        {...rest}
        ref={inputRef}
        type="file"
        className="bg-zinc-700 p-2 rounded outline-none w-full text-sm hidden"
        onChange={handleInputChange}
      />
      <div className="p-4 border-dashed border-zinc-500 border flex flex-col justify-center items-center gap-2">
        {file ? (
          <div className="text-start">
            <h3 className="font-bold text-zinc-300">{file.name}</h3>
            <p className="text-sm">{formatBytes(file.size)}</p>
            <button
              type="button"
              onClick={() => inputRef.current && inputRef.current.click()}
              className="bg-zinc-700 p-2 text-sm rounded-md font-bold"
            >
              Alterar arquivo
            </button>
          </div>
        ) : (
          <>
            <button
              className="shadow shadow-zinc-600 p-2 text-sm rounded-md font-bold"
              type="button"
              onClick={() => inputRef.current && inputRef.current.click()}
            >
              Fazer upload de arquivo
            </button>
            <p className="text-sm text-zinc-400 font-medium">{description}</p>
          </>
        )}
      </div>
    </div>
  );
};

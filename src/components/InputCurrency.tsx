import { centsToReal } from "@/utils/FormatUtils";
import { useEffect, useState } from "react";

export interface IInput
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    React.AriaAttributes {
  label?: string;
}
export const InputCurrency: React.FC<IInput> = (props) => {
  const { children, label, ...rest } = props;
  const [inFocus, setInFocus] = useState(false);

  const [numberValue, setNumberValue] = useState(0);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const inputValue = Number(event.target.value);
    setNumberValue(inputValue);
  }

  return (
    <div>
      <label className="block text-sm font-bold py-2" htmlFor={label}>
        {label}
      </label>
      <input
        {...rest}
        type={inFocus ? "number" : "text"}
        className="bg-zinc-700 p-2 rounded outline-none w-full text-sm"
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
        value={!inFocus ? centsToReal(numberValue) : props.value}
        onChange={handleChange}
      />
    </div>
  );
};

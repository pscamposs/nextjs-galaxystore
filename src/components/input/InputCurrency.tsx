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
  const { children, label, value, onChange, ...rest } = props;
  const [inFocus, setInFocus] = useState(false);

  const [numberValue, setNumberValue] = useState(
    typeof value === "string" ? Number(value) : value || 0
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value;

    if (inFocus) {
      const numericValue = parseFloat(inputValue.replace(/[^\d]/g, "")) || 0;
      setNumberValue(numericValue);

      if (onChange) {
        // Callback para enviar o valor ao pai
        onChange({
          ...event,
          target: {
            ...event.target,
            value: numericValue.toString(),
          },
        });
      }
    }
  }

  return (
    <div>
      <label className="block text-sm font-bold py-2" htmlFor={label}>
        {label}
      </label>
      <input type="hidden" value={numberValue} name={props.name} />
      <input
        {...rest}
        type={inFocus ? "number" : "text"}
        className="bg-zinc-700 p-2 rounded outline-none w-full text-sm"
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
        value={!inFocus ? centsToReal(numberValue) : numberValue}
        onChange={handleChange}
      />
    </div>
  );
};

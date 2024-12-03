import { faEnvelope, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface IInput
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    React.AriaAttributes {
  label?: string;
  icon?: IconDefinition;
}
export const Input: React.FC<IInput> = (props) => {
  const { children, label, icon, ...rest } = props;
  return (
    <div>
      <label className="block text-sm font-bold py-1" htmlFor={label}>
        {label}
      </label>
      {icon ? (
        <div className="flex items-center gap-2 bg-zinc-900">
          <FontAwesomeIcon icon={icon} className="px-4" />
          <input
            {...rest}
            className="bg-zinc-900 py-4 rounded outline-none w-full text-sm"
          />
        </div>
      ) : (
        <input
          {...rest}
          className="bg-zinc-900 p-4 rounded outline-none w-full text-sm"
        />
      )}
    </div>
  );
};

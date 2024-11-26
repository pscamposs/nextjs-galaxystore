export interface IInput
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    React.AriaAttributes {
  label?: string;
}
export const Input: React.FC<IInput> = (props) => {
  const { children, label, ...rest } = props;
  return (
    <div>
      <label className="block text-sm font-bold py-2" htmlFor={label}>
        {label}
      </label>
      <input
        {...rest}
        className="bg-zinc-700 p-2 rounded outline-none w-full text-sm"
      />
    </div>
  );
};

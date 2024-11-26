export interface ITextArea
  extends React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    React.AriaAttributes {
  label?: string;
}
export const TextArea: React.FC<ITextArea> = (props) => {
  const { children, label, ...rest } = props;
  return (
    <div>
      <label className="block text-sm font-bold py-2" htmlFor={label}>
        {label}
      </label>
      <textarea
        {...rest}
        className="bg-zinc-700 p-2 rounded outline-none w-full text-sm"
      />
    </div>
  );
};

import React from "react";

export interface IButton
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  loading?: boolean;
}

export const LoaderButton: React.FC<IButton> = (props) => {
  const { children, loading, ...rest } = props;
  return (
    <button {...rest}>
      {loading ? (
        <div className="m-auto p-4 rounded-full w-2 animate-spin border-2 border-b-transparent border-white"></div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

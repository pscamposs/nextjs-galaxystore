import { ReactNode } from "react";

interface FormWrapperProps {
  children: ReactNode;
}

export const FormWrapper = (props: FormWrapperProps) => {
  return <div className="block py-2">{props.children}</div>;
};

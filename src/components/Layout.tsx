import { ReactElement } from "react";
import FooterComponent from "./Footer";

interface FooProps extends React.PropsWithChildren {
  header?: ReactElement;
  children: ReactElement;
}
export const Layout = ({ header, ...props }: FooProps) => {
  return (
    <div className="w-full relative pb-52">
      {header}
      {props.children}
      <FooterComponent />
    </div>
  );
};

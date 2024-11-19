import React from "react";
import styled from "styled-components";

const ButtonLoader = styled.div`
  padding: 8px 0;
  border: 2px solid #fff;
  border-bottom: 2px solid #222;
  width: 20px;
  height: 20px;
  margin: 0 auto;
  border-radius: 50%;
  animation: spin 4s infinite;

  @keyframes spin {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

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
      {loading ? <ButtonLoader></ButtonLoader> : <>{children}</>}
    </button>
  );
};

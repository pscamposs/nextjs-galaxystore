"use client";

import styled from "styled-components";
import ModalContextProvider from "../context/use-modal-context";

const Container = styled.div`
  padding: 4rem 16px;
  height: 100dvh;
  transition: all 0.2s ease-in;
  overflow-y: scroll;
`;

export function ContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <ModalContextProvider>
      <Container>{children}</Container>
    </ModalContextProvider>
  );
}

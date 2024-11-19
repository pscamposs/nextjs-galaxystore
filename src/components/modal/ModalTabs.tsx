import { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../../context/use-modal-context";

const ModalTabContainer = styled.button<{ selected: boolean }>`
  display: inline-block;
  border: none;
  margin-left: 8px;
  padding: 8px 6px;
  border-bottom: 1px solid
    ${(props) => (props.selected ? "var(--draft-color);" : "#000")};
  cursor: pointer;
  background-color: transparent;
  color: var(--primary-white);
  font-size: 16px;
  transition: 0.2s all ease-in;
`;

export default function ModalTab({ target }: { target: string }) {
  const { tab, toggleTab } = useContext(ModalContext);

  return (
    <ModalTabContainer
      selected={tab === target}
      onClick={() => toggleTab(target)}
    >
      {target}
    </ModalTabContainer>
  );
}

import { Suspense, useContext, useState } from "react";
import styled from "styled-components";
import { ModalContext } from "../../context/use-modal-context";
import PluginCard from "../plugin/PluginCard";
import ModalTab from "./ModalTabs";
import GeneralContent from "./(tabs)/GeneralContent";
import PermissionsContent from "./(tabs)/PermissionContent";
import UpdatesContent from "./(tabs)/UpdatesContent";
import CommentsContent from "./(tabs)/CommentsContent";

const ModalContainer = styled.div`
  visibility: hidden;
  /* visibility: ${(props) => (props.isVisible ? "visible" : "hidden")}; */
  position: fixed;
  bottom: 0;
  width: 100%;
  /* height: ${(props) => (props.isVisible ? "100%" : "0")}; */
  z-index: 9999;
`;

const ModalMask = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
`;

const ModalContent = styled.div`
  position: fixed;
  bottom: 0;
  background-color: var(--secondary-dark);
  width: 100%;
  /* height: ${(props) => (props.isVisible ? "550px" : "0")}; */
  transition: 0.3s all ease-in;
  padding: 8px 16px;

  > h2 {
    font-weight: 400;
    font-size: 16px;
    border-bottom: 1px solid var(--secondary-white);
    padding: 4px 0;
  }
`;

const ModalInfo = styled.div`
  margin: 32px 0;
  display: flex;
  p {
    font-weight: 600;
    text-transform: uppercase;
  }
`;

const ModalTabsContainer = styled.div`
  margin: 32px 0;
`;

export default function PluginInfoModal() {
  const { isOpen, toggleModal, tab, plugin } = useContext(ModalContext);

  return (
    <ModalContainer>
      <ModalMask onClick={() => toggleModal({})} />
      <ModalContent>
        <h2>Detalhes do Plugin</h2>
        <ModalInfo>
          {/* <PluginCard plugin={plugin} edit={false} />
          <p>Downloads: {plugin?.downloads}</p> */}
        </ModalInfo>
        <ModalTabsContainer>
          <ModalTab target="Geral" />
          {/* <ModalTab target="Permissões" />
          <ModalTab target="Atualizações" />
          <ModalTab target="Comentários" /> */}
        </ModalTabsContainer>
        <Suspense fallback={<div>Carregando conteúdo...</div>}>
          {tab === "Geral" && <GeneralContent />}
          {/* {tab === "Permissões" && <PermissionsContent />}
          {tab === "Atualizações" && <UpdatesContent />}
          {tab === "Comentários" && <CommentsContent />} */}
        </Suspense>
      </ModalContent>
    </ModalContainer>
  );
}

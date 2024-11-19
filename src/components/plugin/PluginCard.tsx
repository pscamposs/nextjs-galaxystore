import React, { useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faShop } from "@fortawesome/free-solid-svg-icons";
import { Plugin } from "@/types/FilterTypes";
import Image from "next/image";
import useModal from "@/hooks/useModal";
import { centsToReal } from "@/utils/FormatUtils";
import useCart from "@/hooks/useCart";
import { useSession } from "next-auth/react";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--secondary-dark);
  text-align: center;
  max-height: 340px;

  padding: 16px 32px;

  img {
    max-width: 128px;
    cursor: pointer;
  }

  &:hover {
    transform: scale(1.01);
    transition: 0.2s;
  }
`;

const CardTag = styled.p`
  background-color: var(--secondary-white);
  color: var(--primary-white);
  padding: 4px 2px;
  border-radius: 4px;
  margin: 4px auto;
  width: 100px;
`;

const CardTitle = styled.h2`
  margin: 8px 0;
`;

const CardPrice = styled.p`
  margin: 8px 0;

  font-size: 1.4rem;
`;

const CardButton = styled.button`
  background-color: var(--primary-dark);
  border: none;

  color: var(--primary-white);
  cursor: pointer;

  width: 100%;
  padding: 8px 32px;

  svg {
    margin-right: 5px;
  }
`;

export default function PluginCard({
  plugin,
  edit = false,
  setDialogOpen,
  setEditPlugin,
}: {
  plugin: Plugin;
  edit?: boolean;
  setDialogOpen?: any;
  setEditPlugin?: any;
}) {
  const { data: session } = useSession();
  const { toggleModal } = useModal();
  const { addItem } = useCart();

  return (
    <CardContainer>
      <div>
        <Image
          src={plugin.image || "/res/images/Default.svg"}
          alt="pluginIcon"
          onClick={() => toggleModal(plugin)}
          width={128}
          height={128}
        />
        <CardTag>{plugin.category.name || "Exemplo"}</CardTag>
        <CardTitle>{plugin.name || "Nome de exemplo"}</CardTitle>
        <CardPrice>{centsToReal(plugin.price) || "R$ 0,00"}</CardPrice>
      </div>
      <div
        style={{
          padding: 9,
        }}
      >
        <CardButton onClick={() => addItem(plugin)}>
          <FontAwesomeIcon icon={faShop} />
          Comprar
        </CardButton>
      </div>
    </CardContainer>
  );
}

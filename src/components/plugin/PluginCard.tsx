import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { Plugin } from "@/types/FilterTypes";
import Image from "next/image";
import { centsToReal } from "@/utils/FormatUtils";
import { LoaderButton } from "../LoaderButton";
import { fetchClient } from "@/libs/fetchClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

export default function PluginCard({ plugin }: { plugin: Plugin }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const addItem = async (plugin: Plugin) => {
    setLoading(true);
    const response = await fetchClient(
      `/cart/${plugin.id}`,
      {
        method: "PUT",
      },
      false
    );
    if (response.ok) {
      toast.success("Plugin adicionado ao seu carrinho.");
    } else if (response.status == 409) {
      const data = await response.json();
      toast.error(data.message);
    } else {
      router.push("/login");
    }
    setLoading(false);
  };
  return (
    <CardContainer>
      <div>
        <Image
          src={plugin.image || "/res/images/Default.svg"}
          alt="pluginIcon"
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
        <LoaderButton onClick={() => addItem(plugin)} loading={loading}>
          <FontAwesomeIcon icon={faShop} className="mx-2" />
          Comprar
        </LoaderButton>
      </div>
    </CardContainer>
  );
}

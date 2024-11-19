"use client";
import useCart from "@/hooks/useCart";
import { Plugin } from "@/types/FilterTypes";
import { centsToReal } from "@/utils/FormatUtils";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import styled from "styled-components";

const CartItemContainer = styled.tr`
  img {
    width: 64px;
    height: 64px;
  }

  button {
    border: none;
    background-color: transparent;
    color: #f8f8f8;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
  p {
    font-weight: 300;
  }
`;

export default function CartItem({ plugin }: { plugin: Plugin }) {
  const { removeItem } = useCart();

  return (
    <CartItemContainer>
      <td>
        <Image
          src={plugin?.image as string}
          width={32}
          height={32}
          alt="image"
        />
      </td>
      <td>
        <h4>{plugin?.name}</h4>
      </td>
      <td>
        <p>{centsToReal(plugin?.price as number)}</p>
      </td>
      <td>
        <button onClick={() => removeItem(plugin)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </CartItemContainer>
  );
}

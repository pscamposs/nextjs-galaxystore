"use client";
import useCart from "@/hooks/useCart";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const ShotCartContainer = styled.div`
  position: relative;

  span {
    padding: 4px 12px;
    font-size: 16px;
    background-color: red;
    border-radius: 50%;
  }
`;

export default function ShopCart() {
  let { cart } = useCart();

  return (
    <ShotCartContainer>
      <FontAwesomeIcon icon={faCartShopping} />
      {cart?.plugins && <span>{cart.plugins.length}</span>}
    </ShotCartContainer>
  );
}

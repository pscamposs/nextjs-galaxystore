import CartItem from "@/components/cart/CartItem";

import useCart from "@/hooks/useCart";
import { Plugin } from "@/types/FilterTypes";
import { centsToReal } from "@/utils/FormatUtils";
import { faBorderNone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";

const NoItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  color: gray;
  p {
    text-align: center;

    font-size: 3rem;
  }
`;

const CartCheckout = styled.div`
  button {
    margin-top: 12px;
    padding: 1rem;
    width: 100%;
    max-height: 200px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;
    &:hover {
      background-color: var(--primary-dark);
      color: #f2f2f2;
    }
  }

  line-height: 150%;

  h4 {
    font-weight: 400;
  }
`;

const CartItems = styled.table`
  width: 100%;
`;

const CartContainer = styled.div`
  height: 250px;
`;

export default function CartCheckoutContainer() {
  const { cart, checkout } = useCart();

  if (cart?.plugins.length) {
    return (
      <>
        <CartContainer>
          <CartItems>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cart.plugins.map((plugin: Plugin) => (
                <CartItem key={plugin.id} plugin={plugin} />
              ))}
            </tbody>
          </CartItems>
        </CartContainer>
        <h2>Seu pedido</h2>
        <CartCheckout>
          <div>
            <h4>Total: {centsToReal(1)}</h4>
            <h4>Desconto: {centsToReal(1)}</h4>
            <h3>SubTotal: {centsToReal(1)}</h3>
          </div>
          <div>
            <button onClick={checkout}>Checkout</button>
          </div>
        </CartCheckout>
      </>
    );
  } else {
    return (
      <NoItems>
        <FontAwesomeIcon icon={faBorderNone} size="7x" />
        <p>Não há itens</p>
      </NoItems>
    );
  }
}

"use client";
import CartCheckoutContainer from "@/components/cart/CartItems";
import { ContentContainer } from "@/components/ContentContainer";
import { Layout } from "@/components/Layout";
import styled from "styled-components";

const CartBody = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const CartSection = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: var(--secondary-dark);
  padding: 2rem;

  h2 {
    padding: 12px 0;
    margin: 12px 0;
    border-bottom: 1px solid #fff;
  }
`;

export default function Cart() {
  return (
    <Layout>
      <ContentContainer>
        <CartBody>
          <CartSection>
            <h2>Itens do Carrinho</h2>

            <CartCheckoutContainer />
          </CartSection>
        </CartBody>
      </ContentContainer>
    </Layout>
  );
}

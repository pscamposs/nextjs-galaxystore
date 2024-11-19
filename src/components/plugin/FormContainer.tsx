"use client";

import styled from "styled-components";

export const FormWrapper = styled.div`
  background-color: var(--secondary-dark);
  padding: 2px 12px;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 1rem;

  input {
    background-color: transparent;
    border: none;
    outline: none;
    color: var(--primary-white);
    font-size: 16px;
    padding: 16px 8px;
    width: 100%;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  padding: 0 16px;

  img {
    max-width: 64px;
    max-height: 64px;
  }

  button {
    padding: 12px 4px;
    width: 100%;
    border-radius: 4px;
    margin: 8px 0;
    background-color: var(--secondary-dark);
    color: var(--primary-white);
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 600;
  }

  button:hover {
    background-color: var(--draft-color-2);
  }

  form {
    max-width: 500px;
    margin: 0 auto;
  }
`;

export const Separator = styled.div`
  height: 2px;
  background-color: var(--draft-color-2);
  margin: 12px 0;
`;

export const FormHeader = styled.div`
  text-align: center;
  margin: 32px 0;
`;

export default function FormComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FormContainer>{children}</FormContainer>;
}

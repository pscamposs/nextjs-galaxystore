import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import styled from "styled-components";

const LogoutButton = styled.button`
  border: none;
  padding: 0 1rem;
  background-color: transparent;
  color: var(--primary-white);
  cursor: pointer;
  margin-top: 8px;

  span {
    margin: 8px;
  }

  &:hover {
    color: red;
  }
`;

export default function Logout() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut();
  };

  return (
    <LogoutButton onClick={() => signOut()}>
      <FontAwesomeIcon icon={faArrowLeft} />
      <span>Sair da minha conta</span>
    </LogoutButton>
  );
}

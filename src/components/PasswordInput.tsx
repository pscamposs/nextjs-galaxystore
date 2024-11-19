import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import styled from "styled-components";

const PasswordContainer = styled.div`
  width: 100%;
  position: relative;
  svg {
    position: absolute;
    top: 20px;
    right: 4px;
    cursor: pointer;
  }
`;

export default function PasswordInput() {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState("");

  const toggleVisible = () => {
    setIsVisible((prev) => !isVisible);
  };

  return (
    <PasswordContainer>
      <input
        type={isVisible ? "text" : "password"}
        placeholder="Senha de login"
        name="password"
        required
      />

      <FontAwesomeIcon
        icon={isVisible ? faEyeSlash : faEye}
        onClick={() => toggleVisible()}
      />
    </PasswordContainer>
  );
}

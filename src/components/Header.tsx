"use client";
import {
  faBars,
  faHome,
  faPlug,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import logo from "../../public/res/images/galaxy-logo.png";
import { useState } from "react";
import ShopCart from "./ShopCart";

const MainHeader = styled.header`
  width: 100%;
  background-color: var(--primary-dark);
  padding: 20px 32px;

  overflow: hidden;
  top: 0;
  left: 0;

  img {
    max-width: 64px;
    max-height: 64px;
  }

  nav {
    display: flex;
    justify-content: space-between;
  }

  .menu-button {
    visibility: hidden;
    position: absolute;
    right: 16px;
    top: 55px;
    font-size: 1.5rem;
    background-color: transparent;
    color: aliceblue;
    border: none;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    nav {
      display: block;
    }

    .menu-button {
      visibility: visible;
    }

    .open {
      height: 240px;
    }
  }
`;

const MainList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;

  transition: all 0.2s ease-in;

  li {
    margin-right: 16px;
    padding: 8px 0;
  }

  li a {
    text-decoration: none;
    color: var(--primary-white);
    font-size: 18px;
    text-transform: uppercase;
    transition: 0.2s;
    width: 100%;
    display: inline-block;
    padding: 12px 0;
  }

  li a:hover {
    color: var(--draft-color);
  }

  li #profile {
    padding: 12px 8px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-weight: 600;
    background-color: var(--draft-color-2);
    color: var(--primary-white);
  }

  li button:hover {
    background-color: var(--draft-color);
    transition: 0.2s;
  }

  li svg {
    margin-right: 4px;
  }

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    height: 0;

    text-align: center;

    ul {
      width: 100%;
      text-align: center;
    }
  }
`;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <MainHeader>
        <nav>
          <div>
            <Image src={logo} alt="Logo" />
          </div>
          <button className="menu-button" onClick={() => handleOpenMenu()}>
            {isOpen ? (
              <FontAwesomeIcon icon={faX} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>

          <MainList className={isOpen ? "open" : ""}>
            <li>
              <Link href="/">
                <FontAwesomeIcon icon={faHome} />
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/plugins">
                <FontAwesomeIcon icon={faPlug} />
                Plugins
              </Link>
            </li>
            <li>
              <Link href="/cart">
                <ShopCart />
              </Link>
            </li>
            {/* <li>
            <Link href="/termos">
              <FontAwesomeIcon icon={faBook} />
              Termos
            </Link>
          </li> */}
            <li>
              <Link href="/profile" id="profile">
                <FontAwesomeIcon icon={faUser} />
                Área do Cliente
              </Link>
            </li>
          </MainList>
        </nav>
      </MainHeader>
    </header>
  );
}

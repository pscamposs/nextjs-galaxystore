import Image from "next/image";
import logo from "../../../public/res/images/galaxy-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCartShopping,
  faDashboard,
  faHome,
  faLongArrowAltUp,
  faPerson,
  faPlug,
  faShop,
  faSignOut,
  faTicket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons/faShoppingBag";
import React, { useState } from "react";
import { HomeView } from "./view/Home";
import { SupportView } from "./view/Support";
import { PaymentsView } from "./view/Payments";
import { PluginsView } from "./view/Plugins";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MenuItem = ({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: IconProp;
  onClick?: () => void;
}) => {
  return (
    <li
      className="text-zinc-300 hover:text-purple-500 transition-all cursor-pointer flex gap-2 items-center"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
      <p className="line-clamp-1">{label}</p>
    </li>
  );
};

const NavItem = ({
  label,
  icon,
  selected,
  view,
  handleChangeView,
}: {
  label: string;
  icon: IconProp;
  selected?: string;
  view: React.ReactElement;
  handleChangeView: (label: string, view: React.ReactElement) => void;
}) => {
  return (
    <li
      className={`text-zinc-300 hover:text-zinc-400 hover:${
        !selected && "bg-zinc-800/10"
      } cursor-pointer flex gap-2 justify-center items-center  w-48 p-4 rounded-md transition-all ${
        selected == label && "bg-zinc-800"
      }`}
      onClick={() => handleChangeView(label, view)}
    >
      <FontAwesomeIcon icon={icon} />
      <p className="line-clamp-1">{label}</p>
    </li>
  );
};

export const DashboardHeader = ({ setView }: { setView: any }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [select, setSelect] = useState("Início");

  const handleChangeView = (label: string, view: React.ReactElement) => {
    setSelect(label);
    setView(view);
  };

  return (
    <header className="relative ">
      <section className="px-12 h-64 flex justify-between items-center flex-wrap gap-2 bg-zinc-900 ">
        <div className="flex items-end gap-4">
          <Image src={logo} alt="logo" width={80} height={50} />
          <div className="mt-4 cursor-default">
            <h1 className="text-3xl font-bold">Galaxy Store</h1>
            <p>
              Seja bem vindo de volta,{" "}
              <span className="font-bold">
                {session?.user.profile.username}
              </span>
            </p>
          </div>
        </div>
        <div>
          <ul className="flex gap-4 ">
            <MenuItem
              label="Voltar as compras"
              icon={faShoppingBag}
              onClick={() => router.push("/plugins")}
            />
            <MenuItem label="Perfil" icon={faUser} />
            <MenuItem
              label="Sair da conta"
              icon={faSignOut}
              onClick={signOut}
            />
          </ul>
        </div>
      </section>
      <nav className=" w-[90%] m-auto p-4 absolute -bottom-8 max-md:-bottom-20 left-0 right-0 overflow-x-auto">
        <ul className="flex gap-2">
          <NavItem
            label="Início"
            icon={faHome}
            selected={select}
            view={<HomeView />}
            handleChangeView={handleChangeView}
          />
          <NavItem
            label="Suporte"
            icon={faTicket}
            selected={select}
            view={<SupportView />}
            handleChangeView={handleChangeView}
          />
          <NavItem
            label="Minhas compras"
            icon={faCartShopping}
            selected={select}
            view={<PaymentsView />}
            handleChangeView={handleChangeView}
          />
          <NavItem
            label="Meus plugins"
            icon={faPlug}
            selected={select}
            view={<PluginsView />}
            handleChangeView={handleChangeView}
          />
        </ul>
      </nav>
    </header>
  );
};

import Image from "next/image";
import { useState } from "react";
import logo from "../../public/res/images/galaxy-logo.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartPlus,
  faClose,
  faHome,
  faPlug,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

export default function Header() {
  const { status } = useSession();

  const [visible, setVisible] = useState(false);

  const handleOpenMenu = () => {
    setVisible(!visible);
  };

  return (
    <header className="flex items-center justify-between bg-zinc-900 max-lg:px-4 relative z-10">
      <section className="px-12 py-4 flex justify-between items-center flex-wrap gap-2 max-lg:px-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src={logo} alt="logo" width={40} height={50} />
          </Link>
          <div className="cursor-default">
            <h1 className="text-xl font-bold">Galaxy Store</h1>
          </div>
        </div>
      </section>
      <FontAwesomeIcon
        icon={visible ? faClose : faBars}
        onClick={handleOpenMenu}
        className="lg:hidden"
      />
      <nav
        className={`px-4 w-full flex justify-between bg-zinc-900 flex-1 max-lg:flex-col max-lg:absolute max-lg:items-start left-0 top-16  transition-all overflow-hidden ${
          visible ? "max-lg:h-72" : "max-lg:h-0"
        }`}
      >
        <ul className="flex items-center gap-4 max-lg:mt-4 max-lg:flex-col max-lg:px-2 max-lg:w-full">
          <li className="hover:text-purple-800  transition-all">
            <Link href="/" className="max-lg:py-2 max-lg:px-12">
              <FontAwesomeIcon icon={faHome} />
              <span className="px-1">Inicio</span>
            </Link>
          </li>
          <li className="hover:text-purple-800 transition-all">
            <Link href="/plugins" className="max-lg:py-2 max-lg:px-12">
              <FontAwesomeIcon icon={faPlug} />
              <span className="px-1">Plugins</span>
            </Link>
          </li>
          <li className="hover:text-purple-800  transition-all">
            <Link href="/discord" className="max-lg:py-2 max-lg:px-12">
              <span>Discord</span>
            </Link>
          </li>
        </ul>
        <ul className="flex gap-4 py-6 max-lg:flex-col max-lg:w-full ">
          <li>
            <Link
              href="/carrinho"
              className="bg-zinc-800 p-2 rounded-sm hover:bg-zinc-700"
            >
              <FontAwesomeIcon icon={faCartPlus} />
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="bg-zinc-800 py-2 px-6 rounded-sm hover:bg-zinc-700 max-lg:block"
            >
              <span>Criar conta</span>
            </Link>
          </li>
          <li>
            <Link
              href={status == "authenticated" ? "/perfil" : "/login"}
              className="bg-purple-950 py-2 px-6 hover:bg-purple-900 max-lg:block"
            >
              <FontAwesomeIcon icon={faUser} />
              <span className="px-1 ">Meu Perfil</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

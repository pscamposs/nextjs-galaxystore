import { Plugin } from "@/types/FilterTypes";
import { createContext, useState } from "react";

// TODO: Fix modal context (plugin description, plugin context)

interface ModalContextProps {
  isOpen: boolean;
  tab: string;
  toggleModal: (plugin: any) => void;
  toggleTab: (tab: string) => void;
  plugin?: Plugin;
}

const ModalContext = createContext({} as ModalContextProps);

export default function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [plugin, setPlugin] = useState<Plugin | undefined>();
  const [tab, setTab] = useState("Geral");

  const toggleModal = (plugin: any) => {
    setPlugin(plugin);
    setIsOpen((value) => !value);
  };

  const toggleTab = (tab: string) => {
    setTab(tab);
  };

  return (
    <ModalContext.Provider
      value={{
        tab,
        isOpen,
        toggleModal,
        toggleTab,
        plugin,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext };

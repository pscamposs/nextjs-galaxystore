import GeneralContent from "@/components/modal/(tabs)/GeneralContent";
import { Plugin } from "@/types/FilterTypes";
import { createContext, useState } from "react";

// TODO: Fix modal context (plugin description, plugin context)

interface ModalContextProps {
  isOpen: boolean;
  tab: { label: string; view: any };
  toggleModal: (plugin: any) => void;
  toggleTab: (view: any) => void;
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
  const [tab, setTab] = useState({
    label: "Geral",
    view: <GeneralContent />,
  });

  const toggleModal = (plugin: any) => {
    if (!plugin) {
      setIsOpen((value) => !value);
      return;
    }
    setPlugin(plugin);
    setIsOpen((value) => !value);
  };

  const toggleTab = (view: any) => {
    setTab({
      label: view[0],
      view: view[1],
    });
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

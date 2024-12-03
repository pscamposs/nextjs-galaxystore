import { useContext, useState, useEffect } from "react";
import { ModalContext } from "../../context/use-modal-context";
import ModalTabs from "./ModalTabs";

export default function PluginInfoModal() {
  const { isOpen, toggleModal, tab } = useContext(ModalContext);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setHeight(500);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  if (!isOpen && height === 0) return null;

  return (
    <div
      className="fixed z-10 top-0 left-0 w-full h-dvh bg-zinc-900/25 "
      onClick={() => {
        toggleModal(null);
      }}
    >
      <div
        className="bg-zinc-800 p-2 transition-all z-20 overflow-y-auto absolute left-0 right-0 bottom-0 "
        style={{
          height: `${height}px`,
          transition: "height 0.3s ease",
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="text-lg p-2 font-bold border-b-2 border-zinc-700">
          Informações do Plugin
        </h1>
        <section className="py-4">
          <ModalTabs />
        </section>
        <section>{tab.view}</section>
      </div>
    </div>
  );
}

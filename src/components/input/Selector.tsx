import {
  faChevronRight,
  faFolderOpen,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Loader from "../Loader";

export const Selector = ({
  selectorOptions,
  label,
  name,
  view,
  value,
  loading,
  refetch,
  onChange,
}: {
  view?: React.ReactElement;
  selectorOptions?: { label: string; value: any }[]; // Alterado para aceitar objetos
  label: string;
  name: string;
  value?: any;
  loading?: boolean;
  refetch?: () => void;
  onChange?: (value: any) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState(value || "");
  const [options, setOptions] = useState(selectorOptions);

  const [currentView, setView] = useState<React.ReactElement | null>(null);

  const handleChangeOption = (selected: { label: string; value: any }) => {
    setOption(selected.value);
    setIsOpen(false);
    if (onChange) {
      onChange(selected.value); // Callback com o value selecionado
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const handleDocumentClick = useCallback(
    (event: MouseEvent) => {
      if (currentView) return;

      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [currentView]
  );

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setOption(value);
    if (value) {
      setOptions(
        selectorOptions?.filter((op) =>
          op.label.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setOptions(selectorOptions);
    }
    if (onChange) {
      onChange(value); // Callback ao digitar no campo
    }
  };

  const handleCloseView = () => {
    setView(null);
  };

  const openView = () => {
    if (view) {
      setView(
        React.cloneElement(view, {
          handleClose: handleCloseView,
          refetch: refetch,
        })
      );
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-bold py-2" htmlFor={name}>
        {label}
      </label>
      <input
        className="bg-zinc-700 p-2 rounded outline-none w-full text-sm"
        onFocus={() => setIsOpen(true)}
        value={options?.find((opt) => opt.value === option)?.label || option}
        type="search"
        onChange={handleChange}
        required
        name={name}
      />
      {isOpen && (
        <div className="absolute p-4 bg-zinc-900 w-full bottom-10 h-64 rounded-md shadow shadow-zinc-900 overflow-y-auto">
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : currentView ? (
            currentView
          ) : (
            <>
              {options && options.length > 0 ? (
                options.map((option) => {
                  return (
                    <button
                      className="flex items-center justify-between w-full hover:bg-zinc-800 p-2 rounded-sm transition-all"
                      key={option.value}
                      onClick={() => handleChangeOption(option)}
                      type="button"
                    >
                      <p className="font-bold text-sm">{option.label}</p>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-2">
                  <FontAwesomeIcon icon={faFolderOpen} />
                  <h2>Nenhuma opção disponível</h2>
                </div>
              )}
              {view && (
                <button
                  type="button"
                  className="w-full text-zinc-50 hover:text-zinc-400 transition-all mt-2"
                  onClick={openView}
                >
                  <FontAwesomeIcon icon={faPlus} className="px-1" />
                  Adicionar
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

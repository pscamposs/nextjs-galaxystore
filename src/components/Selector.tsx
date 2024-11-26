import {
  faChevronRight,
  faRightFromBracket,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";

export const Selector = ({
  selectorOptions,
  label,
}: {
  selectorOptions: string[];
  label: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [option, setOption] = useState("");
  const [options, setOptions] = useState(selectorOptions);

  const handleChangeOption = (selected: any) => {
    setOption(selected);
    setIsOpen(false);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const handleDocumentClick = useCallback((event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setOption(value);
    if (value) {
      setOptions(
        selectorOptions.filter((op) =>
          op.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setOptions(selectorOptions);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-bold py-2" htmlFor="Categoria">
        {label}
      </label>
      <input
        className="bg-zinc-700 p-2 rounded outline-none w-full text-sm"
        onFocus={() => setIsOpen(true)}
        value={option}
        type="search"
        onChange={handleChange}
        required
      />
      {isOpen && (
        <div className="absolute p-4 bg-zinc-900 w-full bottom-10 h-56 rounded-md shadow shadow-zinc-900">
          {options?.map((option) => {
            return (
              <button
                className="flex items-center justify-between w-full hover:bg-zinc-800 p-2 rounded-sm transition-all"
                key={option}
                onClick={() => handleChangeOption(option)}
                type="button"
              >
                <p className="font-bold text-sm ">{option}</p>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

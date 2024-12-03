import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@/components/input/Input";

import { LoaderButton } from "@/components/LoaderButton";
import { useState } from "react";
import { fetchClient } from "@/libs/fetchClient";
import { toast } from "sonner";

export const CategoryCreation = ({
  handleClose,
  refetch,
}: {
  handleClose?: () => void;
  refetch?: () => void;
}) => {
  const [category, setCategory] = useState({
    name: "",
    icon: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  }

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetchClient(
      "/categories",
      {
        body: JSON.stringify(category),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
      false
    );
    const data = await response.json();
    if (response.ok) {
      toast.success("Categoria adicionada com sucesso");
      if (refetch) refetch();
      if (handleClose) handleClose();
    } else {
      toast.error(data.message || "Não foi possível criar a categoria");
    }
    setLoading(false);
  };

  return (
    <section>
      <h1>
        <button
          className="mr-2 py-1 px-2 rounded hover:bg-zinc-600"
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faLeftLong} />
        </button>
        Adicionando categoria
      </h1>
      <div className="w-full text-zinc-50">
        <div className="flex justify-center gap-8 max-lg:flex-wrap items-center flex-col ">
          <section className="flex-1  max-w-[400px]">
            <Input
              placeholder="Geral"
              label="Titulo"
              required
              onChange={handleChangeInput}
              name="name"
            />
            <Input
              placeholder="home"
              label="Icone"
              required
              onChange={handleChangeInput}
              name="icon"
            />
            <LoaderButton
              className="p-2 bg-purple-800 mt-2 rounded-sm w-full text-zinc-50 hover:bg-purple-700"
              onClick={handleSubmit}
              type="button"
              loading={loading}
            >
              Adicionar
            </LoaderButton>
          </section>
        </div>
      </div>
    </section>
  );
};

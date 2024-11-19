import { useContext } from "react";
import { ModalContext } from "../context/use-modal-context";

export default function useModal() {
  return useContext(ModalContext);
}

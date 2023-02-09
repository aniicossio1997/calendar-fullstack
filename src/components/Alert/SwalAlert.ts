import { Button } from "@chakra-ui/react";
import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
interface IProps {
  title: string;
  description?: string;
  handleDeleted?: () => void;
  handleResetButtons?: () => void;
}

export const SwalAlertErrorSimple = ({ title, description = "" }: IProps) => {
  return Swal.fire({
    icon: "error",
    title: title,
    text: description,
    allowOutsideClick: false,
    keydownListenerCapture: false,
    stopKeydownPropagation: false,
    backdrop: true,
    showCloseButton: true,
  });
};

export const SwalAlertDelete = ({
  title,
  description,
  handleDeleted = () => {},
  handleResetButtons = () => {},
}: IProps) => {
  return Swal.fire({
    title: title,
    text: description,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#928D8C",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      handleDeleted();
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      handleResetButtons();
      console.log("canceled");
    }
  });
};

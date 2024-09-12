"use client";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import FormCreateService from "./FormCreateService";

const ServiceFormModal: React.FC<{
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}> = ({ setIsModalOpen, isModalOpen }) => {
  // Manejador de clics para cerrar el modal
  const handleOverlayClick = () => {
    setIsModalOpen(false);
  };

  // Manejador de clics dentro del contenido del modal para prevenir el cierre
  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Evita que el clic se propague al overlay
  };

  return (
    <CSSTransition
      in={isModalOpen}
      timeout={200}
      classNames="modal"
      unmountOnExit
    >
      <div
        className="modal-overlay z-50"
        onClick={handleOverlayClick} // Cierra el modal si se hace clic en el overlay
      >
        <div
          className="modal-content-sucursal"
          onClick={handleContentClick} // Evita el cierre al hacer clic en el contenido
        >
          <div className="flex items-center mb-5 pb-5 border-b border-custom-grey w-full">
            <h3 className="font-semibold text-2xl">Crear Servicio</h3>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-5 right-5 py-1 px-1.5 transition-all border-2 border-custom-red bg-transparent rounded-md hover:bg-custom-red text-custom-white hover:cursor-pointer"
          >
            <IoMdClose />
          </button>

          <FormCreateService setIsModalOpen={setIsModalOpen} />
        </div>
      </div>
    </CSSTransition>
  );
};

export default ServiceFormModal;

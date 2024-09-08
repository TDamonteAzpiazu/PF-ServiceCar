import React from "react";
import { IoMdClose } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import ServiceForm from "./ServiceForm";

interface ServiceFormModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServiceFormModal: React.FC<ServiceFormModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleClose = () => setIsModalOpen(false);

  return (
    <CSSTransition
      in={isModalOpen}
      timeout={200}
      classNames="modal"
      unmountOnExit
    >
      <div className="modal-overlay z-50 flex justify-center items-center">
        <div className="modal-content max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg relative">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-1 text-red-500"
          >
            <IoMdClose size={24} />
          </button>
          <ServiceForm setIsModalOpen={setIsModalOpen} />
        </div>
      </div>
    </CSSTransition>
  );
};

export default ServiceFormModal;

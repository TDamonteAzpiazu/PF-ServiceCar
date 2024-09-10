import React, { useState } from "react";
import ServiceEditModal from "./ServiceEditModal";
import { IService } from "@/helpers/types/types";

const EditarButton: React.FC<{ service: IService }> = ({ service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="text-white border py-2 px-4 rounded hover:bg-custom-red transition duration-300"
      >
        Editar
      </button>

      {isModalOpen && (
        <ServiceEditModal service={service} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default EditarButton;
"use client"
import React, { useState } from "react";
import ServiceFormModal from "./ServiceFormModal";

const ServiceAdd: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <button
        onClick={handleModalToggle}
        className="bg-white text-black py-2 px-4 rounded hover:bg-custom-red hover:text-white transition duration-300"
      >
        Agregar Servicios
      </button>
      {isModalOpen && (
        <ServiceFormModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default ServiceAdd;

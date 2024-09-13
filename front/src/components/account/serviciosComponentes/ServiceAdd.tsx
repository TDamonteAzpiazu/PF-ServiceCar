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
        className="rounded py-2 px-3 bg-custom-red hover:text-custom-red hover:bg-custom-white"
      >
        Agregar Servicios
      </button>
      {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-55 z-40"></div>
        )}
      
        <ServiceFormModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      
    </div>
  );
};

export default ServiceAdd;

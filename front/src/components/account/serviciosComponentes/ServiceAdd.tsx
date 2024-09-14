"use client"
import React, { useState } from "react";
import ServiceFormModal from "./ServiceFormModal";
import { IService } from "@/helpers/types/types";

const ServiceAdd: React.FC<{setServicios: React.Dispatch<React.SetStateAction<IService[]>>}> = ({setServicios}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <button
        onClick={handleModalToggle}
        className="bg-custom-red text-white py-2 px-4 rounded hover:bg-white hover:text-custom-red transition duration-300"
       
      >
        Agregar Servicios
      </button>
      {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-55 z-40"></div>
        )}
      
        <ServiceFormModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setServicios={setServicios}
        />
      
    </div>
  );
};

export default ServiceAdd;

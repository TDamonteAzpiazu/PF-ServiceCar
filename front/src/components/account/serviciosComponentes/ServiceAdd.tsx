import React from 'react';

const ServiceAdd: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <button className="bg-white text-black py-2 px-4 rounded hover:bg-custom-red hover:text-white transition duration-300">
        Agregar Servicios
      </button>
      
    </div>
  );
};

export default ServiceAdd;

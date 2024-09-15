import React, { useState } from 'react';
import { IService } from '@/helpers/types/types';
import EditService from './EditService'; // Asegúrate de que la ruta sea correcta
import { MdEdit } from "react-icons/md";


const EditarButton: React.FC<{ service: IService; handleUpdate: () => void }> = ({ service, handleUpdate }) => {
  const [viewEditService, setViewEditService] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setViewEditService(true)}
        className="border transition duration-300 border-blue-600 text-blue-600 rounded-lg p-2 text-base  hover:bg-blue-600 hover:text-custom-white"
      >
        <MdEdit />
      </button>
      {viewEditService && (
          <div className="fixed inset-0 bg-black bg-opacity-55 z-40"></div>
        )}
      
        <EditService
          setViewEditService={setViewEditService}
          viewEditService={viewEditService}
          service={service}
          handleUpdate={handleUpdate} 
        />
      
    </>
  );
};

export default EditarButton;

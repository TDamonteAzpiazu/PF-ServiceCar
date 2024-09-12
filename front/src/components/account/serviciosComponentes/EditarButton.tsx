import React, { useState } from 'react';
import { IService } from '@/helpers/types/types';
import EditService from './EditService'; // Asegúrate de que la ruta sea correcta

const EditarButton: React.FC<{ service: IService; handleUpdate: () => void }> = ({ service, handleUpdate }) => {
  const [viewEditService, setViewEditService] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setViewEditService(true)}
        className="border border-blue-600 text-blue-600 rounded-lg p-2 text-base hover:bg-blue-600 hover:text-custom-white"
      >
        Editar
      </button>
      {viewEditService && (
        <EditService
          setViewEditService={setViewEditService}
          viewEditService={viewEditService}
          service={service}
          handleUpdate={handleUpdate} // Pasar la función de actualización
        />
      )}
    </>
  );
};

export default EditarButton;

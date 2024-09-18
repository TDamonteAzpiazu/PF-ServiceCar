import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const NoResultados: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-3">
      <FaExclamationTriangle className="text-4xl text-red-600" />
      <p className="text-white text-xl mt-4">No hemos encontrado resultados</p>
    </div>
  );
};

export default NoResultados;

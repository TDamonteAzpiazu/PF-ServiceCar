"use client"
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import OrdenOpciones from "./Ordenamiento";


interface FiltersProps {
  ordenPrecioAsc: () => void;
  ordenPrecioDesc: () => void;
}

const Filters: React.FC<FiltersProps> = ({ ordenPrecioAsc, ordenPrecioDesc}) => {
  const [mostarOrdenOpciones, setmostarOrdenOpciones] = useState(false);

  return (
    <div className="flex lg:flex-row lg:w-2/3 sm:w-1/2 w-full flex-col lg:gap-1 gap-2 sm:mb-0 mb-3 relative">
      <div className="flex w-full gap-1 justify-end">
        <button className="flex gap-2 items-center font-semibold hover:bg-custom-white hover:text-custom-red text-custom-white rounded-md border bg-custom-red border-custom-red py-1.5 px-3">
          Filtrar
          <span>
            <FaFilter />
          </span>
        </button>
        <div className="relative">
          <button 
            className="flex gap-2 min-w-40 items-center font-semibold hover:bg-custom-white hover:text-custom-red text-custom-white rounded-md border bg-custom-red border-custom-red py-1.5 px-3"
            onClick={() => setmostarOrdenOpciones(!mostarOrdenOpciones)}
          >
            Ordenar por
            <span className="text-xl">
              <IoIosArrowDown />
            </span>
          </button>
          {mostarOrdenOpciones && (
            <OrdenOpciones 
              ordenPrecioAsc={ordenPrecioAsc}
              ordenPrecioDesc={ordenPrecioDesc}
            />
          )}
        </div>
      </div>

      <div className="flex text-custom-white justify-between items-center py-1.5 px-1 border-2 border-custom-white rounded-md">
        <input
          type="text"
          placeholder="Buscar servicios..."
          className="bg-transparent outline-none w-full"
        />
        <CiSearch className="text-xl" />
      </div>
    </div>
  );
};

export default Filters;

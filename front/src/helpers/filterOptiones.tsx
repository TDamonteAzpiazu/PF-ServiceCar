"use client";

interface FilterOptionsProps {
  mostrarFiltros: boolean;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ mostrarFiltros }) => {
  return (
    <>
      {mostrarFiltros && (
        <div className="absolute z-10 bg-black text-white p-6 rounded-md shadow-lg top-full mt-2 w-64">
          {/* Filtrar por Ubicación */}
          <div className="mb-6">
            <h3 className="font-semibold text-custom-red mb-3">Ubicación</h3>
            <label className="block mb-3 cursor-pointer">
              <input type="checkbox" className="mr-1 accent-custom-red" />
              <span className="text-white">Locación 1</span>
            </label>
            <label className="block mb-3 cursor-pointer">
              <input type="checkbox" className="mr-1 accent-custom-red" />
              <span className="text-white">Locación 2</span>
            </label>
            <label className="block mb-3 cursor-pointer">
              <input type="checkbox" className="mr-1 accent-custom-red" />
              <span className="text-white">Locación 3</span>
            </label>
          </div>

          {/* Filtrar por Tipo de Servicio */}
          <div className="mb-6">
            <h3 className="font-semibold text-custom-red mb-3">Tipo de Servicio</h3>
            <label className="block mb-3 cursor-pointer">
              <input type="checkbox" className="mr-1 accent-custom-red" />
              <span className="text-white">Camiones</span>
            </label>
            <label className="block mb-3 cursor-pointer">
              <input type="checkbox" className="mr-1 accent-custom-red" />
              <span className="text-white">Autos</span>
            </label>
            
          </div>
        </div>
      )}
    </>
  );
};

export default FilterOptions;

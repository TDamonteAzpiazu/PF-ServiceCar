import { useState, useEffect } from "react";
import { ISucursales } from "../types/types";
import { FetchSucursales } from "../serviciosFetch";

interface FilterOptionsProps {
  mostrarFiltros: boolean;
  vehiculos: string[];
  onFilterChange: (vehiculos: string[]) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  mostrarFiltros,
  vehiculos,
  onFilterChange
}) => {
  const [sucursalesData, setSucursalesData] = useState<ISucursales[]>([]);
  const [vehiculosSeleccionados, setVehiculosSeleccionados] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchAndSetSucursales = async () => {
      try {
        const data = await FetchSucursales();
        setSucursalesData(data);
      } catch (error) {
        console.error('Error fetching sucursales:', error);
      }
    };

    fetchAndSetSucursales();
  }, []);

  useEffect(() => {
    
    onFilterChange( Array.from(vehiculosSeleccionados));
  }, [ vehiculosSeleccionados, onFilterChange]);

  

  const handleVehiculoChange = (vehiculo: string) => {
    setVehiculosSeleccionados(prev => {
      const newSelections = new Set(prev);
      if (newSelections.has(vehiculo)) {
        newSelections.delete(vehiculo);
      } else {
        newSelections.add(vehiculo);
      }
      return newSelections;
    });
  };

  return (
    <>
      {mostrarFiltros && (
        <div className="absolute z-10 bg-black text-white p-6 rounded-md shadow-lg top-full mt-2 w-64">
          {/* Filtrar por Ubicación */}
          <div className="mb-6">
            <h3 className="font-semibold text-custom-red mb-3">Sucursales</h3>
            {sucursalesData.map((sucursal, index) => (
              <label key={`sucursal-${sucursal.name || index}`} className="block mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-1 accent-custom-red"
                  
                />
                <span className="text-white">{sucursal.name}</span>
              </label>
            ))}
          </div>

          {/* Filtrar por Tipo de Vehículo */}
          <div className="mb-6">
            <h3 className="font-semibold text-custom-red mb-3">Vehículo</h3>
            {vehiculos.map((vehiculo, index) => (
              <label key={`vehiculo-${vehiculo || index}`} className="block mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-1 accent-custom-red"
                  checked={vehiculosSeleccionados.has(vehiculo || '')}
                  onChange={() => handleVehiculoChange(vehiculo || '')}
                />
                <span className="text-white">{vehiculo}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterOptions;

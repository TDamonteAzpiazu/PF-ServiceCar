"use client";

import { useState, useEffect } from "react";
import { ISucursales } from "../types/types";

interface FilterOptionsProps {
  mostrarFiltros: boolean;
  sucursales: ISucursales[];
  vehiculos: string[];
  onFilterChange: (ubicaciones: ISucursales[], vehiculos: string[]) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  mostrarFiltros,
  sucursales,
  vehiculos,
  onFilterChange
}) => {
  const [ubicacionesSeleccionadas, setUbicacionesSeleccionadas] = useState<Set<string>>(new Set());
  const [vehiculosSeleccionados, setVehiculosSeleccionados] = useState<Set<string>>(new Set());

  useEffect(() => {
    const ubicaciones = sucursales.filter(sucursal =>
      sucursal.name !== undefined && ubicacionesSeleccionadas.has(sucursal.name)
    );
    onFilterChange(ubicaciones, Array.from(vehiculosSeleccionados));
  }, [ubicacionesSeleccionadas, vehiculosSeleccionados, sucursales]);

  const handleUbicacionChange = (sucursalName: string) => {
    setUbicacionesSeleccionadas(prev => {
      const newSelections = new Set(prev);
      if (newSelections.has(sucursalName)) {
        newSelections.delete(sucursalName);
      } else {
        newSelections.add(sucursalName);
      }
      return newSelections;
    });
  };

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
            {sucursales.map((sucursal, index) => (
              <label key={`sucursal-${sucursal.name || index}`} className="block mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-1 accent-custom-red"
                  checked={ubicacionesSeleccionadas.has(sucursal.name || '')}
                  onChange={() => handleUbicacionChange(sucursal.name || '')}
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

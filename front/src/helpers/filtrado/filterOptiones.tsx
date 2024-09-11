import { useState, useEffect } from "react";
import { ISucursales } from "../types/types";
import { FetchSucursales } from "../serviciosFetch";

interface FilterOptionsProps {
  mostrarFiltros: boolean;
  vehiculos: string[];
  onFilterChange: (ubicaciones: ISucursales[], vehiculos: string[]) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  mostrarFiltros,
  vehiculos,
  onFilterChange,
}) => {
  const [sucursalesData, setSucursalesData] = useState<ISucursales[]>([]);
  const [vehiculosSeleccionados, setVehiculosSeleccionados] = useState<
    Set<string>
  >(new Set());
  const [ubicacionesSeleccionadas, setUbicacionesSeleccionadas] = useState<
    Set<string>
  >(new Set());

  useEffect(() => {
    const fetchAndSetSucursales = async () => {
      try {
        const data = await FetchSucursales();
        setSucursalesData(data);
      } catch (error) {
        console.error("Error fetching sucursales:", error);
      }
    };

    fetchAndSetSucursales();
  }, []);

  useEffect(() => {
    onFilterChange(
      sucursalesData.filter((sucursal) =>
        ubicacionesSeleccionadas.has(sucursal.name)
      ),
      Array.from(vehiculosSeleccionados)
    );
  }, [ubicacionesSeleccionadas, vehiculosSeleccionados]);

  const handleSucursalChange = (sucursal: string) => {
    setUbicacionesSeleccionadas((prev) => {
      const updated = new Set(prev);
      if (updated.has(sucursal)) {
        updated.delete(sucursal);
      } else {
        updated.add(sucursal);
      }
      return updated;
    });
  };

  const handleVehiculoChange = (vehiculo: string) => {
    setVehiculosSeleccionados((prev) => {
      const updated = new Set(prev);
      if (updated.has(vehiculo)) {
        updated.delete(vehiculo);
      } else {
        updated.add(vehiculo);
      }
      return updated;
    });
  };

  return (
    <div
      className={`absolute top-16 mt-1 sm:right-0 right-20 z-10 bg-black text-white rounded-lg border border-custom-red ${
        mostrarFiltros ? "flex" : "hidden"
      }`}
    >
      <div className="p-3 " style={{ minWidth: "220px" }}>
        <h3 className="font-semibold text-lg mb-2">Filtros</h3>
        <div className="mb-4">
          <h4 className="font-semibold">Sucursales</h4>
          {sucursalesData.map((sucursal: ISucursales) => (
            <>
              {sucursal.status === "active" ? (
                <div key={sucursal.name} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id={`sucursal-${sucursal.name}`}
                    value={sucursal.name}
                    onChange={() => handleSucursalChange(sucursal.name)}
                  />
                  <label
                    htmlFor={`sucursal-${sucursal.name}`}
                    className="ml-2 md:text-base text-sm"
                  >
                    {sucursal.name}
                  </label>
                </div>
              ) : (
                ""
              )}
            </>
          ))}
        </div>
        <div>
          <h4 className="font-semibold">Vehículos</h4>
          {vehiculos.map((vehiculo) => (
            <div key={vehiculo} className="flex items-center gap-1">
              <input
                type="checkbox"
                id={`vehiculo-${vehiculo}`}
                value={vehiculo}
                onChange={() => handleVehiculoChange(vehiculo)}
              />
              <label
                htmlFor={`vehiculo-${vehiculo}`}
                className="ml-2 md:text-base text-sm"
              >
                {vehiculo}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;

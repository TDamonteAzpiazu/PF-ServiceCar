"use client";

import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import OrdenOpciones from "./Ordenamiento";
import { filtrarServiciosPorSucursal } from "@/helpers/filtrado/filtrarServicios"; // Importa la nueva función
import { IService, ISucursales } from "@/helpers/types/types";
import FilterOptions from "@/helpers/filtrado/filterOptiones";

interface FiltersProps {
  servicios: IService[];
  vehiculos: string[];
  ubicaciones: ISucursales[]; // Agrega el tipo para ubicaciones
  setServiciosFiltrados: (servicios: IService[]) => void;
  ordenPrecioAsc: () => void;
  ordenPrecioDesc: () => void;
  setOrdenamiento: (ordenamiento: string | null) => void; // Añadido
  setSinCoincidencias: React.Dispatch<React.SetStateAction<boolean>>;
  sinCoincidencias: boolean;
}

const Filters: React.FC<FiltersProps> = ({
  servicios,
  vehiculos,
  ubicaciones,
  setServiciosFiltrados,
  ordenPrecioAsc,
  ordenPrecioDesc,
  setOrdenamiento,
  setSinCoincidencias,
  sinCoincidencias,
}) => {
  const [mostrarOrdenOpciones, setMostrarOrdenOpciones] = useState(false);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [ubicacionesSeleccionadas, setUbicacionesSeleccionadas] = useState<
    ISucursales[]
  >([]);
  const [vehiculosSeleccionados, setVehiculosSeleccionados] = useState<
    string[]
  >([]);

  const handleBusqueda = (event: React.ChangeEvent<HTMLInputElement>) => {
    const palabraClave = event.target.value;
    setBusqueda(palabraClave);

    const serviciosFiltrados = filtrarServiciosPorSucursal(
      servicios,
      ubicacionesSeleccionadas.map((ubicacion) => ubicacion.name), // Pasar el array de nombres de sucursales
      palabraClave,
      vehiculosSeleccionados
    );

    setServiciosFiltrados(serviciosFiltrados);
    setSinCoincidencias(serviciosFiltrados.length === 0);
  };

  const handleFilterChange = (
    ubicaciones: ISucursales[],
    vehiculos: string[]
  ) => {
    setUbicacionesSeleccionadas(ubicaciones);
    setVehiculosSeleccionados(vehiculos);

    const serviciosFiltrados = filtrarServiciosPorSucursal(
      servicios,
      ubicaciones.map((ubicacion) => ubicacion.name), // Pasar el array de nombres de sucursales
      busqueda,
      vehiculos
    );

    setServiciosFiltrados(serviciosFiltrados);
    setSinCoincidencias(serviciosFiltrados.length === 0);
  };

  const handleOrdenarAsc = () => {
    ordenPrecioAsc();
    setOrdenamiento("Ascendente");
    setMostrarOrdenOpciones(false);
  };

  const handleOrdenarDesc = () => {
    ordenPrecioDesc();
    setOrdenamiento("Descendente");
    setMostrarOrdenOpciones(false);
  };

  return (
    <div className="flex lg:flex-row lg:w-2/3 sm:w-1/2 w-full flex-col lg:gap-1 gap-2 sm:mb-0 mb-3 relative">
      <div className="flex w-full gap-1 justify-end">
        <div className="relative">
          <button
            className="flex gap-2 items-center font-semibold hover:bg-custom-white hover:text-custom-red text-custom-white rounded-md border bg-custom-red border-custom-red py-1.5 px-3"
            onClick={() => {
              setMostrarFiltros(!mostrarFiltros);
              setMostrarOrdenOpciones(false);
            }}
          >
            Filtrar
            <span>
              <FaFilter />
            </span>
          </button>
          <FilterOptions
            mostrarFiltros={mostrarFiltros}
            vehiculos={vehiculos}
            onFilterChange={handleFilterChange}
            setMostrarFiltros={setMostrarFiltros}
            setOrdenamiento={setOrdenamiento} // Añadido
          />
        </div>
        <div className="relative">
          <button
            className="flex gap-2 min-w-40 items-center font-semibold hover:bg-custom-white hover:text-custom-red text-custom-white rounded-md border bg-custom-red border-custom-red py-1.5 px-3"
            onClick={() => {
              setMostrarOrdenOpciones(!mostrarOrdenOpciones);
              setMostrarFiltros(false);
            }}
          >
            Ordenar por
            <span className="text-xl">
              <IoIosArrowDown />
            </span>
          </button>
          {mostrarOrdenOpciones && (
            <OrdenOpciones
              ordenPrecioAsc={ordenPrecioAsc}
              ordenPrecioDesc={ordenPrecioDesc}
              setMostrarOrdenOpciones={setMostrarOrdenOpciones}
            />
          )}
        </div>
      </div>

      <div className="flex text-custom-white justify-between items-center py-1.5 px-1 border-2 border-custom-white rounded-md">
        <input
          type="text"
          placeholder="Buscar servicios..."
          value={busqueda}
          onChange={handleBusqueda}
          className="bg-transparent outline-none w-full"
        />
        <CiSearch className="text-xl" />
      </div>
    </div>
  );
};

export default Filters;

"use client";

import React, { useState, useEffect } from "react";
import Cards from "@/components/services/cardsServicios";
import { FetchServicio, FetchSucursales } from "@/helpers/serviciosFetch";
import { IService, ISucursales } from "@/helpers/types/types";
import {
  ordenarPrecioAsc,
  ordernarPrecioDesc,
} from "@/helpers/filtrado/ordenamientoService";
import { filtrarServiciosPorSucursal } from "@/helpers/filtrado/filtrarServicios";
import Filters from "./Filters";
import NoResultados from "./NoResultado";

const ContainerServices: React.FC = () => {
  const [servicios, setServicios] = useState<IService[]>([]);
  const [serviciosOrdenados, setServiciosOrdenados] = useState<IService[]>([]);
  const [vehiculos, setVehiculos] = useState<string[]>([]);
  const [ubicaciones, setUbicaciones] = useState<ISucursales[]>([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [sinCoincidencias, setSinCoincidencias] = useState(false);
  const [sinResultados, setSinResultados] = useState(false); // Estado para controlar resultados vacíos
  const [ordenamiento, setOrdenamiento] = useState<string | null>(null); // Nuevo estado para ordenamiento

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedServicios = await FetchServicio();
        const serviciosActivos = fetchedServicios.filter(
          (servicio) => servicio.status === "active"
        );
        setServicios(serviciosActivos);
        setServiciosOrdenados(serviciosActivos);

        const vehiculosUnicos = Array.from(
          new Set(serviciosActivos.flatMap((servicio) => servicio.vehiculo))
        );

        setVehiculos(vehiculosUnicos);

        const fetchedSucursales = await FetchSucursales();
        const sucursalesActivas = fetchedSucursales.filter(
          (sucursal) => sucursal.status === "active"
        );
        setUbicaciones(sucursalesActivas);
      } catch (error) {
        console.error("Error fetching servicios:", error);
      }
    };

    fetchData();
  }, []);

  const handleOrdenarPrecioAsc = () => {
    setServiciosOrdenados(ordenarPrecioAsc(serviciosOrdenados));
    setOrdenamiento("Ascendente");
  };

  const handleOrdenarPrecioDesc = () => {
    setServiciosOrdenados(ordernarPrecioDesc(serviciosOrdenados));
    setOrdenamiento("Descendente");
  };

  const handleEliminarOrdenamiento = () => {
    setServiciosOrdenados(servicios); // Restablece la lista sin orden
    setOrdenamiento(null); // Elimina el estado de ordenamiento
  };

  const handleFilterChange = (
    ubicacionesSeleccionadas: ISucursales[],
    vehiculosSeleccionados: string[]
  ) => {
    const serviciosFiltrados = filtrarServiciosPorSucursal(
      servicios,
      ubicacionesSeleccionadas.map((ubicacion) => ubicacion.name), // Ahora es un array
      "",
      vehiculosSeleccionados
    );
    setServiciosOrdenados(serviciosFiltrados);

    setSinResultados(serviciosFiltrados.length === 0);
  };

  return (
    <>
      <div className="flex sm:flex-row flex-col sm:justify-between mx-8 sm:items-center">
        <h2 className="text-start sm:w-1/2 w-full text-white text-xl font-semibold sm:my-12 my-7">
          Encuentra el servicio que buscas
        </h2>
        <Filters
          servicios={servicios}
          vehiculos={vehiculos}
          ubicaciones={ubicaciones}
          setServiciosFiltrados={setServiciosOrdenados}
          ordenPrecioAsc={handleOrdenarPrecioAsc}
          ordenPrecioDesc={handleOrdenarPrecioDesc}
          setOrdenamiento={setOrdenamiento}
          setSinCoincidencias={setSinCoincidencias}
          sinCoincidencias={sinCoincidencias}
        />
      </div>

      {ordenamiento && (
        <div className="flex justify-start mx-6 my-2">
          <div className="bg-red-500 text-white py-1 px-3 rounded flex items-center gap-2">
            <span>Ordenado por precio {ordenamiento}</span>
            <button onClick={handleEliminarOrdenamiento}>✕</button>
          </div>
        </div>
      )}

      <section className="mx-6">
        {sinResultados ? (
          <NoResultados />
        ) : (
          <Cards servicios={serviciosOrdenados} sinCoincidencias={sinCoincidencias}/>
        )}
      </section>
    </>
  );
};

export default ContainerServices;

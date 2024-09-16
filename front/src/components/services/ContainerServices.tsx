"use client"
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
import { FaExclamationTriangle } from "react-icons/fa"; // Nuevo ícono

const ContainerServices: React.FC = () => {
  const [servicios, setServicios] = useState<IService[]>([]);
  const [serviciosOrdenados, setServiciosOrdenados] = useState<IService[]>([]);
  const [vehiculos, setVehiculos] = useState<string[]>([]);
  const [ubicaciones, setUbicaciones] = useState<ISucursales[]>([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false); // Estado para filtros
  const [sinResultados, setSinResultados] = useState(false); // Nuevo estado para controlar resultados vacíos

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
  };

  const handleOrdenarPrecioDesc = () => {
    setServiciosOrdenados(ordernarPrecioDesc(serviciosOrdenados));
  };

  const handleFilterChange = (
    ubicacionesSeleccionadas: ISucursales[],
    vehiculosSeleccionados: string[]
  ) => {
    const serviciosFiltrados = filtrarServiciosPorSucursal(
      servicios,
      ubicacionesSeleccionadas.map((ubicacion) => ubicacion.name).join(","),
      "",
      vehiculosSeleccionados
    );
    setServiciosOrdenados(serviciosFiltrados);

    // Verifica si hay resultados o no
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
        />
      </div>

      <section className="mx-6">
        {sinResultados ? (
          <div className="flex flex-col items-center justify-center">
            <FaExclamationTriangle className="text-4xl text-red-600" />
            <p className="text-white text-xl mt-4">
              No hemos encontrado resultados
            </p>
          </div>
        ) : (
          <Cards servicios={serviciosOrdenados} />
        )}
      </section>
    </>
  );
};

export default ContainerServices;

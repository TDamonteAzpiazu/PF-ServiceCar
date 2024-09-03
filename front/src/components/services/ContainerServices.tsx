"use client";

import React, { useState, useEffect } from "react";
import Cards from "@/components/services/cardsServicios";
import { FetchServicio, FetchSucursales } from "@/helpers/serviciosFetch";
import { IService, ISucursales } from "@/helpers/types/types";
import {
  ordenarPrecioAsc,
  ordernarPrecioDesc,
} from "@/helpers/filtrado/ordenamientoService";
import { filtrarServiciosPorSucursal } from "@/helpers/filtrado/filtrarServicios"; // Importa la nueva función
import Filters from "./Filters";

const ContainerServices: React.FC = () => {
  const [servicios, setServicios] = useState<IService[]>([]);
  const [serviciosOrdenados, setServiciosOrdenados] = useState<IService[]>([]);
  const [vehiculos, setVehiculos] = useState<string[]>([]);
  const [ubicaciones, setUbicaciones] = useState<ISucursales[]>([]); // Agrega el estado para ubicaciones

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedServicios = await FetchServicio();
        setServicios(fetchedServicios);
        setServiciosOrdenados(fetchedServicios);

        const vehiculosUnicos = Array.from(
          new Set(fetchedServicios.flatMap((servicio) => servicio.vehiculo))
        );

        setVehiculos(vehiculosUnicos);

        // Fetch sucursales y actualizar el estado
        const fetchedSucursales = await FetchSucursales();
        setUbicaciones(fetchedSucursales);
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

  const handleFilterChange = (ubicacionesSeleccionadas: ISucursales[], vehiculosSeleccionados: string[]) => {
    const serviciosFiltrados = filtrarServiciosPorSucursal(
      servicios,
      ubicacionesSeleccionadas.map(ubicacion => ubicacion.name).join(','), // Filtra por nombres de sucursales
      "",
      vehiculosSeleccionados
    );
    setServiciosOrdenados(serviciosFiltrados);
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
      <section className="mx-8">
        <Cards servicios={serviciosOrdenados} />
      </section>
    </>
  );
};

export default ContainerServices;

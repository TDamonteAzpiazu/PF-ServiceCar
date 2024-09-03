"use client"
import React, { useState, useEffect } from "react";
import Cards from "@/components/services/cardsServicios";
import { FetchServicio } from "@/helpers/serviciosFetch";
import Filters from "@/components/services/Filters";
import { IService, ISucursales } from "@/helpers/types/types";
import {
  ordenarPrecioAsc,
  ordernarPrecioDesc,
} from "@/helpers/filtrado/ordenamientoService";
import { filtrarServicios } from "@/helpers/filtrado/filtrarServicios";

const ContainerServices: React.FC = () => {
  const [servicios, setServicios] = useState<IService[]>([]);
  const [serviciosOrdenados, setServiciosOrdenados] = useState<IService[]>([]);
  const [vehiculos, setVehiculos] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedServicios = await FetchServicio();
      setServicios(fetchedServicios);
      setServiciosOrdenados(fetchedServicios);

    
      const vehiculosUnicos = Array.from(new Set(fetchedServicios.flatMap(servicio => servicio.vehiculo)));

      setVehiculos(vehiculosUnicos);
    };

    fetchData();
  }, []);

  const handleOrdenarPrecioAsc = () => {
    setServiciosOrdenados(ordenarPrecioAsc(serviciosOrdenados));
  };

  const handleOrdenarPrecioDesc = () => {
    setServiciosOrdenados(ordernarPrecioDesc(serviciosOrdenados));
  };

  const handleFilterChange = (ubicaciones: ISucursales[], vehiculos: string[]) => {
    const serviciosFiltrados = filtrarServicios(
      servicios,
      "",
      vehiculos
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

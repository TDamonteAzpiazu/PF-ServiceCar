"use client";
import { useState, useEffect } from "react";
import Cards from "@/components/services/cardsServicios";
import { FetchServicio } from "@/helpers/serviciosFetch";
import Filters from "@/components/services/Filters";
import Banner from "@/components/services/Banner";
import { IService } from "@/helpers/types/types";
import { ordenarPrecioAsc, ordernarPrecioDesc } from "@/helpers/ordenamientoService";

const Servicios = () => {
  const [servicios, setServicios] = useState<IService[]>([]);
  const [serviciosFiltrados, setServiciosFiltrados] = useState<IService[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedServicios = await FetchServicio();
      setServicios(fetchedServicios);
      setServiciosFiltrados(fetchedServicios);
    };

    fetchData();
  }, []);

  const handleOrdenarPrecioAsc = () => {
    setServiciosFiltrados(ordenarPrecioAsc(serviciosFiltrados));
  };

  const handleOrdenarPrecioDesc = () => {
    setServiciosFiltrados(ordernarPrecioDesc(serviciosFiltrados));
  };

  return (
    <main>
      <Banner />
      <div className="flex sm:flex-row flex-col sm:justify-between mx-8 sm:items-center">
        <h2 className="text-start sm:w-1/2 w-full text-white text-xl font-semibold sm:my-12 my-7">
          Encuentra el servicio que buscas
        </h2>
        <Filters 
          servicios={servicios}
          setServiciosFiltrados={setServiciosFiltrados}
          ordenPrecioAsc={handleOrdenarPrecioAsc} 
          ordenPrecioDesc={handleOrdenarPrecioDesc} 
        />
      </div>
      <section className="mx-8">
        <Cards servicios={serviciosFiltrados} />
      </section>
    </main>
  );
};

export default Servicios;

"use client";

import { FetchServicio } from "@/helpers/serviciosFetch";
import { IService } from "@/helpers/types/types";
import { useEffect, useState } from "react";
import ServiceView from "./ServiceView";

const ServiceCall: React.FC = () => {
  const [servicios, setServicios] = useState<IService[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchServicios = await FetchServicio();
        setServicios(fetchServicios);
      } catch (error) {
        console.error("Error fetching servicios:", error);
      }
    };

    fetchData(); // Llamamos a la función asíncrona dentro de useEffect
  }, []); // El array vacío asegura que se ejecute solo una vez al montarse el componente

  return (
    <div>
      {/* Enviamos la lista de servicios por props a ServicioView */}
      <ServiceView servicios={servicios} />
    </div>
  );
};

export default ServiceCall;

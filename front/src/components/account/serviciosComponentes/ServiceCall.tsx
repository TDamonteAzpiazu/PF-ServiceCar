"use client";

import { FetchServicio } from "@/helpers/serviciosFetch";
import { IService } from "@/helpers/types/types";
import { useEffect, useState } from "react";
import ServiceView from "./ServiceView";

const ServiceCall: React.FC = () => {
  const [servicios, setServicios] = useState<IService[]>([]);
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchServicios = await FetchServicio();
        setServicios(fetchServicios);
      } catch (error) {
        console.error("Error fetching servicios:", error);
      }
    };

    fetchData();
  }, [updateFlag]); // Dependencia en `updateFlag` para actualizar cuando se edite un servicio

  const handleUpdate = () => {
    setUpdateFlag(prev => !prev); // Alternar el estado para desencadenar la actualización
  };

  return (
    <div>
      <ServiceView servicios={servicios} handleUpdate={handleUpdate} />
    </div>
  );
};

export default ServiceCall;

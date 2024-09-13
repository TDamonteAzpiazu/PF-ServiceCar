"use client";
import { FetchServicio } from "@/helpers/serviciosFetch";
import { IService } from "@/helpers/types/types";
import { useEffect, useState } from "react";
import ServiceCardView from "./ServiceCardView";

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
  }, [updateFlag]); 

  const handleUpdate = () => {
    setUpdateFlag((prev) => !prev); // Alternar el estado para desencadenar la actualización
  };

  return (
    <div className="grid gap-6 w-full grid-cols-1 md:grid-cols-2 mb-5">
      {servicios.map((servicio: IService) => (
        <ServiceCardView
          key={servicio.id}
          {...servicio}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default ServiceCall;

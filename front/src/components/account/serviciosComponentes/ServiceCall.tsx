"use client";
import { FetchServicio } from "@/helpers/serviciosFetch";
import { IService } from "@/helpers/types/types";
import { useEffect, useState } from "react";
import ServiceCardView from "./ServiceCardView";

const ServiceCall: React.FC<{
  servicios: IService[];
  handleUpdate: () => void;
}> = ({ servicios, handleUpdate }) => {
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);



  return (
    <div className="grid gap-6 w-11/12 mx-auto grid-cols-1 md:grid-cols-2 mb-5">
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

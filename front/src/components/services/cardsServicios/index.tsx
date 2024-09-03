import React from "react";
import { IService } from "@/helpers/types/types";
import ServiceCard from "../cardServicios";

const Cards: React.FC<{ servicios: IService[] }> = ({ servicios }) => {
  return (
    <div className="flex justify-center">
      <div className=" grid gap-0 w-full mx-3 grid-cols-1 md:grid-cols-2">
        {servicios.map((servicio:IService) => (
          <ServiceCard key={servicio.id} {...servicio} />
        ))}
      </div>
    </div>
  );
};

export default Cards;

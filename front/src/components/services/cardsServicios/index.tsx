import React from "react";
import { IService } from "@/helpers/types/types";
import ServiceCard from "../cardServicios";
import Spinner from "@/components/spinner/Spinner";

const Cards: React.FC<{ servicios: IService[] }> = ({ servicios }) => {
  return (
    <div className="flex justify-center mb-5">
      {!servicios || servicios.length < 1 ? (
        <Spinner title="Loading products..."/>
      ) : (
        <div className="grid gap-6 w-full grid-cols-1 md:grid-cols-2">
          {servicios.map((servicio: IService) => (
            <ServiceCard key={servicio.id} {...servicio} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;

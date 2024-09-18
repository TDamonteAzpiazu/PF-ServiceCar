import React from "react";
import { IService } from "@/helpers/types/types";
import ServiceCard from "../cardServicios";
import Spinner from "@/components/spinner/Spinner";
import NoResultados from "../NoResultado";

const Cards: React.FC<{ servicios: IService[]; sinCoincidencias: boolean }> = ({
  servicios,
  sinCoincidencias,
}) => {
  if (sinCoincidencias) {
    return <NoResultados/>;
  }
  return (
    <div className="flex justify-center mb-5">
      {!servicios || servicios.length < 1 ? (
        <Spinner title="Cargando productos..." />
      ) : (
        <div className="grid gap-6 w-full grid-cols-1 md:grid-cols-2">
          {servicios.map(
            (servicio: IService) =>
              servicio.status === "active" && (
                <ServiceCard key={servicio.id} {...servicio} />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Cards;

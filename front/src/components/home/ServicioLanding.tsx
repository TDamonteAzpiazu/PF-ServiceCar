"use client";
import { useEffect, useState } from "react";
import Cards from "@/components/services/cardsServicios";
import { IService } from "@/helpers/types/types";
import { FetchServicio } from "@/helpers/serviciosFetch";
import Link from "next/link";
import PATHROUTES from "@/helpers/PathRoutes";

const ServiciosLanding: React.FC = () => {
  const [servicios, setServicios] = useState<IService[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedServicios = await FetchServicio();
      setServicios(fetchedServicios.slice(0, 4));
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center mt-14 mb-10">
      <h2 className="text-3xl font-semibold mb-10 text-white">
        Algunos de nuestros Servicios
      </h2>
      <section className="w-full flex justify-center">
        <Cards servicios={servicios} sinCoincidencias={false} />
      </section>
      <div className="mt-4">
        <Link href={PATHROUTES.SERVICES} className="custom-button">
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default ServiciosLanding;

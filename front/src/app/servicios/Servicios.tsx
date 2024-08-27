import React from "react";
import Cards from "@/components/services/cardsServicios";
import { FetchServicio } from "@/helpers/serviciosFetch";
import Filters from "@/components/services/Filters";
import Banner from "@/components/services/Banner";

const Servicios = async () => {
  const servicios = await FetchServicio();
  return (
    <main >
      <Banner/>
      <div className="flex sm:flex-row flex-col sm:justify-between mx-8  sm:items-center">
        <h2 className="text-start sm:w-1/2 w-full text-white text-xl font-semibold sm:my-12 my-7">
          Encontra el servicio que buscas
        </h2>
        <Filters/>
      </div>
      <section className="mx-8">
        <Cards servicios={servicios} />
      </section>
    </main>
  );
};

export default Servicios;

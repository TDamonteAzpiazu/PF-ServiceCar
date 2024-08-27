import React from "react";
import Cards from "@/components/cardsServicios";
import { FetchServicio } from "@/helpers/serviciosFetch";

const Servicios = async () => {
  const servicios = await FetchServicio();
  return (
    <main className="p-4">
      <h2 className="text-center text-white text-4xl font-bold mb-12 mt-[100px]">Nuestros Servicios</h2>
      <section>
        <Cards servicios={servicios} />
      </section>
    </main>
  );
};

export default Servicios;

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import PATHROUTES from "@/helpers/PathRoutes";

const GarageHome = () => {
  return (
    <section className="flex flex-col md:gap-4 md:flex-row items-center justify-between text-white pb-8">
      <div className="flex flex-col mx-10 md:flex-row w-full items-center mt-[69px] md:space-x-10 ">
        <div className="md:w-1/2 space-y-4 text-center md:text-left mb-8 md:mb-0 lg:ml-12 xl:ml-20 2xl:ml-32">
          <h3 className="text-xl font-light">Work efficient</h3>
          <h1 className="text-6xl font-bold text-red-600 ">GARAGEJS</h1>
          <h2 className="text-xl font-semibold">
            Ofrecemos servicios que inspiran calidad y confianza
          </h2>
          <p className="text-sm">
            Podrás elegir y acceder a diversos servicios de calidad y precios
            totalmente accesibles. Descubrí todo lo que ofrecemos para tu
            vehículo.
          </p>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <input
              type="text"
              placeholder="Conoce nuestras sucursales"
              disabled
              className="p-3 text-custom-white rounded-lg border-2 outline-none bg-transparent border-red-600 w-64"
            />
            <Link href={PATHROUTES.SUCURSALES} className="custom-button min-w-[110px]">
              Ver más
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 w-full flex justify-center">
          <Image
            src="/mecanicos.png"
            alt="Mecánicos trabajando"
            className="rounded-lg"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default GarageHome;

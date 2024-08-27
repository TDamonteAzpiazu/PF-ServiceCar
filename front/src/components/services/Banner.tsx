"use client";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CardBanner from "./CardBanner";
import useHorizontalScroll from "@/helpers/scrollCarrusel";

const Banner: React.FC = () => {
  const { containerRef, scrollRight, scrollLeft } = useHorizontalScroll();

  return (
    <div className="flex items-center w-full relative">
      <button
        onClick={scrollLeft}
        className="flecha-izquierda text-black absolute left-1 bg-neutral-300 bg-opacity-50 hover:bg-custom-white p-2 rounded-full text-lg"
        style={{
          boxShadow: "0 0 6px rgba(0, 0, 0, 0.3)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <IoIosArrowBack />
      </button>
      <div
        ref={containerRef}
        className="contenedor-carrusel  w-full overflow-hidden scroll-smooth"
      >
        <div className="container-proyect  flex flex-nowrap h-96">
          <CardBanner
            img="/banner.webp"
            title="Diagnostico vehicular y mantenimiento correctivo"
            text="Contamos con servicios de excelente calidád y al mejor precio."
          />
          <CardBanner
            img="/banner2.webp"
            title="Atención personalizada y con el apoyo de los mejores profesionales"
            text="Procedimientos técnicos rigurosos llevados a cabo por nuestros equipos"
          />
          <CardBanner
            img="/banner3.webp"
            title="Todos los medios de pago disponibles y la mejor relación precio-calidád"
            text="Contamos con mas de 3 sucursales a lo largo de la provincia brindando el mejor servicio."
          />
        </div>
      </div>
      <button
        onClick={scrollRight}
        className="flecha-derecha text-black absolute right-1 bg-neutral-300 bg-opacity-50 hover:bg-custom-white p-2 rounded-full text-lg"
        style={{
          boxShadow: "0 0 6px rgba(0, 0, 0, 0.3)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Banner;

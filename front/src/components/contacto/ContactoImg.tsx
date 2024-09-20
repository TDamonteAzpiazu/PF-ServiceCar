import React from "react";
import Image from "next/image";
import Link from "next/link";
import PATHROUTES from "@/helpers/PathRoutes";

const ContactoImg = () => {
  return (
    <section className="relative h-96 w-full">
      <Image
        src="/contacto.jpeg"
        alt="Servicio de autos"
        layout="fill"
        objectFit="cover"
        className="opacity-70 rounded-lg"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <h3 className="text-lg mb-2">Contactate con nosotros</h3>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Estamos siempre preparados para ayudarte
        </h1>
        <Link href={PATHROUTES.SERVICES} className="custom-button">
          Reservar Turno
        </Link>
      </div>
    </section>
  );
};

export default ContactoImg;

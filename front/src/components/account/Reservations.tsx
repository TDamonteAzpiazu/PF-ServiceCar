"use client";
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import React, { useState } from "react";

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<boolean>(true);
  return (
    <section className="py-3 w-full text-custom-white">
      <h1 className="text-3xl ">Mis reservas</h1>
      <div className="flex flex-col sm:flex-row w-2/3 min-w-56 text-center border-2 mt-5 mb-3 border-custom-white rounded justify-between">
        <div
          className={`sm:w-1/2 w-full text-center py-3 font-semibold ${
            reservations ? "bg-custom-white text-custom-red" : ""
          }`}
        >
          <button onClick={() => setReservations(true)}>
            Reservas pendientes (0)
          </button>
        </div>
        <div className="border border-custom-red sm:block hidden "></div>
        <div
          className={`sm:w-1/2 w-full text-center py-3 font-semibold ${
            reservations ? "" : "bg-custom-white text-custom-red"
          }`}
        >
          <button onClick={() => setReservations(false)}>
            Historial de reservas
          </button>
        </div>
      </div>
      {reservations ? (
        <div>
          <p className="text-custom-grey mb-8">
            Aqui podra ver sus reservas pendientes al dia de la fecha.
          </p>

          <Link
            href={PATHROUTES.SERVICES}
            className=" bg-custom-white text-custom-red rounded py-2 font-semibold px-3 hover:bg-custom-red hover:text-custom-white"
          >
            ¡Reserva un nuevo servicio!
          </Link>
        </div>
      ) : (
        <div>
          <p className="text-custom-grey">
            Aqui vera el historial de sus reservas pasadas.
          </p>
        </div>
      )}
    </section>
  );
};

export default Reservations;

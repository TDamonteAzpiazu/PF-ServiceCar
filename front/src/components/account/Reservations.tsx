'use client'
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import React, { useState } from "react";

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<boolean>(true);
  return (
    <section className="pt-3 w-full">
      <h1 className="text-3xl text-custom-white">Mis reservas</h1>
      <div className="flex w-2/3 py-3 text-center border border-custom-red rounded justify-between">
        <button onClick={()=> setReservations(true)}>Reservas pendientes (0)</button>
        <button onClick={()=> setReservations(false)}>Historial de reservas</button>
      </div>
      {reservations ? (
        <div>
          <p>Aqui podra ver sus reservas pendientes al dia de la fecha.</p>
          <Link href={PATHROUTES.SERVICES}>¡Reserva un nuevo servicio!</Link>
        </div>
      ) : (
        <div>
          <p>Aqui vera el historial de sus reservas pasadas.</p>
        </div>
      )}
    </section>
  );
};

export default Reservations;

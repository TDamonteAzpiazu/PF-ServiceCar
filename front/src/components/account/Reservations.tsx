"use client";
import { getAppointments } from "@/helpers/fetchReservations";
import PATHROUTES from "@/helpers/PathRoutes";
import { IAppointmentUser, IUser } from "@/helpers/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { parse } from "jsonc-parser";
import Cookies from "js-cookie";
import CardReservations from "./CardReservations";

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<IAppointmentUser[] | null>(
    null
  );
  const [history, setHistory] = useState<IAppointmentUser[] | null>(null);
  const [viewHistory, setViewHistory] = useState<boolean>(true);
  const dataUser: IUser = useSelector((state: any) => state.user.user);
  const token = parse(Cookies.get("token")?.toString() || "{}");
  const url = process.env.NEXT_PUBLIC_URL;

  const filterAppointments = async (
    appointments: IAppointmentUser[] | void
  ) => {
    if (appointments) {
      const newAppointments: IAppointmentUser[] = await appointments.filter(
        (appointment: IAppointmentUser) => {
          return appointment.status !== "active";
        }
      );
      await setHistory(newAppointments);
    }
  };

  useEffect(() => {
    if (dataUser && dataUser.id && token) {
      getAppointments(`${url}/appointments/user/${dataUser.id}`, token)
        .then((res) => {
          setReservations(res);
        })
        .then((res) => {
          filterAppointments(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dataUser]);

  console.log(reservations);

  return (
    <section className="py-3 w-full text-custom-white">
      <h1 className="text-3xl ">Mis reservas</h1>
      <div className="flex flex-col sm:flex-row w-2/3 min-w-56 text-center border-2 mt-5 mb-3 border-custom-white rounded justify-between">
        <div
          className={`sm:w-1/2 w-full text-center py-3 font-semibold ${
            viewHistory ? "bg-custom-white text-custom-red" : ""
          }`}
        >
          <button onClick={() => setViewHistory(true)}>
            Reservas pendientes ({reservations?.length})
          </button>
        </div>
        <div className="border border-custom-red sm:block hidden "></div>
        <div
          className={`sm:w-1/2 w-full text-center py-3 font-semibold ${
            viewHistory ? "" : "bg-custom-white text-custom-red"
          }`}
        >
          <button onClick={() => setViewHistory(false)}>
            Historial de reservas
          </button>
        </div>
      </div>
      {viewHistory ? (
        <div className="w-full">
          {reservations && reservations?.length > 0 ? (
            <div className="w-full flex flex-col bg-custom-grey bg-opacity-30 rounded p-4 gap-3 justify-center h-full">
              {reservations.map((reservation: IAppointmentUser) => (
                <CardReservations
                  appointment={reservation}
                  key={reservation.id}
                />
              ))}
            </div>
          ) : (
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
          )}
        </div>
      ) : (
        <div>
          {history && history.length > 0 ? (
            <div className="w-full">
              {history.map((reservation: IAppointmentUser) => (
                <CardReservations
                  appointment={reservation}
                  key={reservation.id}
                />
              ))}
            </div>
          ) : (
            <p className="text-custom-grey">
              Aqui vera el historial de sus reservas pasadas.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default Reservations;

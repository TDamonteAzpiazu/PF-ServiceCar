"use client";
import { IAppointmentUser } from "@/helpers/types/types";
import Link from "next/link";
import React, { useState } from "react";
import { FaLocationDot, FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import ReservationModal from "./ReservationModal";
import UpdateReservations from "./UpdateReservations";

const CardReservations: React.FC<{
  appointment: IAppointmentUser;
  onDelete: () => void;
  fetchAppointments: () => Promise<void>;
}> = ({ appointment, onDelete, fetchAppointments }) => {
  const [viewIappointmentDetail, setViewIappointmentDetail] =
    useState<boolean>(false);
  const [viewIappointmentUpdate, setViewIappointmentUpdate] =
    useState<boolean>(false);
  const toggleMenu = () => {
    setViewIappointmentDetail(!viewIappointmentDetail);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex items-center px-3 py-6 bg-black bg-opacity-40 rounded justify-between">
      <div className=" flex sm:flex-row flex-col lg:gap-4 gap-1 items-center">
        <h2 className=" sm:text-sm text-base">{appointment.service[0].type}</h2>
        <p className="text-custom-grey lg:text-base sm:text-sm text-base">
          {formatDate(appointment.date)}
        </p>
        {appointment.pago === "Pendiente" ? (
          <p className=" lg:text-lg sm:text-sm font-semibold text-base text-red-600">
            IMPAGO
          </p>
        ) : (
          <p className="lg:text-base sm:text-sm text-base">
            {appointment.time}Hr.
          </p>
        )}

        <p className="text-custom-grey lg:text-base sm:text-sm text-base">
          AR$ {appointment.service[0].price}
        </p>
      </div>

      <div className="flex lg:flex-row flex-col items-center gap-4 sm:justify-center justify-between sm:min-h-0 min-h-44">
        <button
          onClick={() => {
            setViewIappointmentDetail(!viewIappointmentDetail);
          }}
          className="border border-custom-red rounded-lg sm:py-1 py-2 px-4 sm:px-2 hover:bg-custom-red "
        >
          Ver más
        </button>
        <div className="flex lg:flex-col flex-row items-center gap-2">
          {appointment.pago !== "Realizado" && (
            <button
              onClick={() => {
                setViewIappointmentUpdate(!viewIappointmentUpdate);
              }}
              className="hover:bg-custom-blue rounded-xl p-2 bg-cyan-800"
            >
              <MdEdit />
            </button>
          )}
          <button
            className="rounded-xl p-2 bg-custom-red hover:bg-red-600"
            onClick={onDelete}
          >
            <FaTrash />
          </button>
        </div>
      </div>
      {viewIappointmentDetail ||
        (viewIappointmentUpdate && (
          <div
            className="fixed inset-0 bg-black bg-opacity-55 z-40"
            onClick={toggleMenu}
          ></div>
        ))}
      <ReservationModal
        appointment={appointment}
        setViewIappointmentDetail={setViewIappointmentDetail}
        viewIappointmentDetail={viewIappointmentDetail}
      />
      <UpdateReservations
        appointment={appointment}
        setViewIappointmentUpdate={setViewIappointmentUpdate}
        viewIappointmentUpdate={viewIappointmentUpdate}
        fetchAppointments={fetchAppointments}
      />
    </div>
  );
};

export default CardReservations;

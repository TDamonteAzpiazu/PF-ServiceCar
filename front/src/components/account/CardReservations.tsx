import { IAppointmentUser } from "@/helpers/types/types";
import Link from "next/link";
import React from "react";
import { FaLocationDot, FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const CardReservations: React.FC<{ appointment: IAppointmentUser }> = ({
  appointment,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son 0-indexados
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex items-center px-3 py-6 bg-black bg-opacity-40 rounded justify-between">
      <div className=" flex sm:flex-row flex-col gap-4">
        <h2 className="lg:text-base sm:text-sm text-base">{appointment.service.type}</h2>
        <p className="text-custom-grey lg:text-base sm:text-sm text-base">{formatDate(appointment.date)}</p>
        <p className="lg:text-base sm:text-sm text-base">{appointment.time}Hr.</p>
        <p className="text-custom-grey lg:text-base sm:text-sm text-base">US ${appointment.service.price}</p>
        <Link href="" className="hover:text-custom-red">
          <FaLocationDot />
        </Link>
      </div>

      <div className="flex lg:flex-row flex-col items-center gap-4 sm:justify-center justify-between sm:min-h-0 min-h-44">
        <button className="border border-custom-red rounded-lg sm:py-1 py-2 px-4 sm:px-2 hover:bg-custom-red ">
          Ver más
        </button>
        <div className="flex lg:flex-col flex-row items-center gap-2">
          <button className="hover:bg-custom-blue rounded-xl p-2 bg-cyan-800">
            <MdEdit />
          </button>
          <button className="rounded-xl p-2 bg-custom-red hover:bg-red-600">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardReservations;

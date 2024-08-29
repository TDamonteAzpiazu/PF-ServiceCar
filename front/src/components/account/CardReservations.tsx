import { IAppointmentUser } from "@/helpers/types/types";
import React from "react";
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const CardReservations: React.FC<{ appointment: IAppointmentUser }> = ({
  appointment,
}) => {
  return (
    <div>
      <h2>{appointment.service.type}</h2>
      <p>{appointment.date}</p>
      <p>{appointment.time}</p>
      <p>{appointment.service.price}</p>
      <p>{appointment.service.location}</p>
      <button>
        <MdEdit />
      </button>
      <button>
        <FaTrash />
      </button>
    </div>
  );
};

export default CardReservations;

"use client";
import { IAppointmentUser, IService } from "@/helpers/types/types";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import "../../styles/modalReservations.css";
import { FetchServicio } from "@/helpers/serviciosFetch";
import FormUpdateReservation from "./FormUpdateReservation";

const UpdateReservations: React.FC<{
  viewIappointmentUpdate: boolean;
  setViewIappointmentUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  appointment: IAppointmentUser;
  fetchAppointments: () => Promise<void>
}> = ({ setViewIappointmentUpdate, viewIappointmentUpdate, appointment, fetchAppointments }) => {
  const [servicios, setServicios] = useState<IService[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedServicios = await FetchServicio();
        setServicios(fetchedServicios);
      } catch (error) {
        console.error("Error fetching servicios:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <CSSTransition
      in={viewIappointmentUpdate}
      timeout={200}
      classNames="modal"
      unmountOnExit
    >
      <div className="modal-overlay z-50">
        <div
          className="modal-content"
          style={{
            boxShadow: "rgba(100,100,111,0.2) 0px 7px 29px 0px",
            maxHeight: "85vh",
          }}
        >
          <div className="flex items-center mb-5 pb-5 border-b border-custom-grey w-full">
            <h3 className="font-semibold text-2xl">Detalle orden</h3>
          </div>
          <button
            onClick={() => setViewIappointmentUpdate(false)}
            className="absolute top-5 right-5 py-1 px-1.5 transition-all border-2 border-custom-red bg-transparent rounded-md hover:bg-custom-red text-custom-white hover:cursor-pointer"
          >
            <IoMdClose />
          </button>
          <div>
            <FormUpdateReservation
              appointment={appointment}
              servicios={servicios}
              setViewIappointmentUpdate={setViewIappointmentUpdate}
              fetchAppointments={fetchAppointments}
            />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default UpdateReservations;

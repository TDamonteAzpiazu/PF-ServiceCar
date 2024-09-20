"use client";
import PATHROUTES from "@/helpers/PathRoutes";
import { IAppointmentUser, IService } from "@/helpers/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import "../../styles/modalReservations.css";
import WalletMP from "../WalletMP";
import { fetchMp } from "@/helpers/fetchMp";
import NavbarOpinion from "./NavbarOpinion";

const ReservationModal: React.FC<{
  viewIappointmentDetail: boolean;
  setViewIappointmentDetail: React.Dispatch<React.SetStateAction<boolean>>;
  appointment: IAppointmentUser;
}> = ({ setViewIappointmentDetail, viewIappointmentDetail, appointment }) => {
  const appointmentDate = new Date(appointment.date);
  const now = new Date();
  const url = process.env.NEXT_PUBLIC_URL;
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (appointment.pago === "Pendiente") {
      fetchMp(url, appointment.service[0], appointment.id).then((res) => {
        setPreferenceId(res.preferenceId);
      });
    }
  }, [appointment, appointment.service[0]]);

  return (
    <CSSTransition
      in={viewIappointmentDetail}
      timeout={200}
      classNames="modal"
      unmountOnExit
    >
      <div className="modal-overlay  z-50">
        <div
          className="modal-content"
          style={{
            boxShadow: "rgba(100,100,111,0.2) 0px 7px 29px 0px",
            maxHeight: "85vh",
          }}
        >
          <div className=" flex items-center mb-5 pb-5 border-b border-custom-grey w-full">
            <h3 className="font-semibold text-2xl">Detalle orden</h3>
          </div>
          <button
            onClick={() => setViewIappointmentDetail(false)}
            className="absolute top-5 right-5 py-1 px-1.5 transition-all  border-2 border-custom-red bg-transparent rounded-md hover:bg-custom-red text-custom-white hover:cursor-pointer"
          >
            <IoMdClose />
          </button>
          <div>
            <h3 className="text-xl font-light">Su orden:</h3>
            <div className="flex flex-col py-2 gap-2">
              <p
                className={`font-semibold capitalize ${
                  appointmentDate < now ? "text-red-600" : "text-green-600"
                }`}
              >
                <span className="font-extralight pr-1 text-custom-white">
                  Status:
                </span>
                {appointmentDate < now
                  ? "Vencida"
                  : appointment.status === "active"
                  ? "Vigente"
                  : "Eliminada"}
              </p>
              <p
                className={`font-semibold ${
                  appointment.pago === "Pendiente"
                    ? "text-red-600"
                    : "text-green-700"
                }`}
              >
                <span className="font-extralight pr-1 text-custom-white">
                  Status de pago:
                </span>
                {appointment.pago}
              </p>
              <p className="font-semibold">
                <span className="font-extralight pr-1">Fecha:</span>
                {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p className="font-semibold">
                <span className="font-extralight pr-1">Hora:</span>
                {appointment.time} Hrs.
              </p>
              <p className="font-semibold">
                <span className="font-extralight pr-1">Sucursal:</span>
                {appointment.sucursal.name}
              </p>
            </div>
            <div>
              <h3
                className="text-center text-lg underline-offset-2 pb-5"
                style={{ textDecoration: "1.5px underline #840000" }}
              >
                Servicios seleccionados
              </h3>
              <div className="flex flex-wrap w-full">
                {appointment.service.map((service: IService) => (
                  <div
                    key={service.id}
                    className="w-1/3 flex flex-col gap-1 items-start"
                  >
                    <Link href={`${PATHROUTES.SERVICES}/${service.id}`}>
                      <Image
                        loading="lazy"
                        alt={service.type}
                        src={service.image}
                        width={140}
                        height={140}
                      />
                      <p className="pt-2 font-extralight text-lg">
                        {service.type}
                      </p>
                      <p className="font-normal">ARS ${service.price}.</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {preferenceId && <WalletMP preferenceId={preferenceId} />}
          <div className="flex justify-around gap-2 pt-3">
            <button
              onClick={() => setViewIappointmentDetail(false)}
              className="p-2 w-32 transition-all text-custom-white bg-custom-red rounded-md hover:bg-red-700"
            >
              Aceptar
            </button>
            {appointment.pago !== "Pendiente" && (
              <button
                onClick={toggleMenu}
                className="p-2 w-32 font-semibold transition-all text-custom-red bg-zinc-400  rounded-md hover:bg-custom-white hover:text-red-700"
              >
                Opinar
              </button>
            )}
          </div>
        </div>
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-55 z-40"
            onClick={toggleMenu}
          ></div>
        )}
        <NavbarOpinion
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          service={appointment.service[0]}
          sucursal={appointment.sucursal}
        />
      </div>
    </CSSTransition>
  );
};

export default ReservationModal;

import { IService, ISucursales } from "@/helpers/types/types";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import FormReservations from "./FormReservations";

const NavbarService: React.FC<{
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  service: IService;
  sucursales:ISucursales[]
}> = ({ isMenuOpen, setIsMenuOpen, service,sucursales }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-[#2b2b2b] px-3 shadow-lg z-50 w-1/3 md:min-w-[400px] min-w-[300px] transition-transform transform ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ transition: "transform 0.5s ease-in-out" }}
    >
      <button
        onClick={() => setIsMenuOpen(false)}
        className=" text-2xl absolute right-5 top-5 hover:text-custom-red"
      >
        <IoCloseSharp />
      </button>
      <div className="flex flex-col gap-3 mt-20 mb-5">
        <h2 className="text-xl">
          Selecciona el dia y horario de tu preferencia
        </h2>
        <p className="font-light text-sm text-neutral-400">
          Debes tener en cuenta los 10 minutos solicitados de anticipación para
          evitar dispendios. Asimismo la empresa se reserva el derecho de
          admisión
        </p>
      </div>
      <div className="flex flex-col gap-1 mb-5">
        <h3 className="text-xl">{service.type}</h3>
        <p className="text-neutral-400">Valor: US$ {service.price}.</p>
      </div>
      <FormReservations service={service} sucursales={sucursales}/>
    </div>
  );
};

export default NavbarService;

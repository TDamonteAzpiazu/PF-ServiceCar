import { IService, ISucursales } from "@/helpers/types/types";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import FormOpinion from "./FormOpinion";

const NavbarOpinion: React.FC<{
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  service: IService;
  sucursal: ISucursales;
}> = ({ isMenuOpen, setIsMenuOpen, service, sucursal }) => {
  return (
    <div
      className={`fixed top-0 left-[-100px] h-full bg-[#2b2b2b]  px-3 shadow-lg z-50 w-1/3 md:min-w-[400px] min-w-[300px] transition-transform transform ${
        isMenuOpen ? "translate-x-[100px]" : "-translate-x-full"
      }`}
      style={{ transition: "transform 0.5s ease-in-out" }}
    >
      <button
        onClick={() => setIsMenuOpen(false)}
        className="text-2xl absolute right-5 top-5 hover:text-custom-red"
      >
        <IoCloseSharp />
      </button>
      <div className="flex flex-col gap-3 mt-20 mb-5">
        <h2 className="text-xl">
          Te invitamos a que nos dejes tu opinión sobre tu experiencia
        </h2>
        <p className="font-light text-sm text-neutral-400">
          Para nosotros es muy importante saber tu opinión acerca de tus
          experiencias en nuestra plataforma. Nos ayudas a seguir mejorando y
          poder brindar un servicio mas eficiente dia a dia.
        </p>
      </div>
      <div className="flex flex-col gap-1 mb-5">
        <h3 className="text-xl">{service.type}</h3>
        <p>{sucursal.name}</p>
      </div>
      <FormOpinion service={service} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default NavbarOpinion;

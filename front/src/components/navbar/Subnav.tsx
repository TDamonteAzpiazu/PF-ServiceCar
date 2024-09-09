import React from "react";
import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";
import PATHROUTES from "@/helpers/PathRoutes";
import { usePathname } from "next/navigation";
import { IUser } from "@/helpers/types/types";
import { FaRegCircleUser } from "react-icons/fa6";

interface SubNavProps {
  typeClass: boolean;
  dataUser: IUser;
}

const SubNav: React.FC<SubNavProps> = ({ typeClass, dataUser }) => {
  const classHeader: string =
    "flex flex-col md:gap-6 gap-4 md:visible invisible md:flex-row text-custom-grey justify-start fixed md:relative top-0 right-0 text-right md:justify-between md:w-1/3 w-1/2 min-w-80 z-50 md:py-0 md:px-0 px-5 pt-14 translate-x-full md:translate-x-0 md:h-6";
  const classFooter: string =
    "md:flex flex-col gap-4 hidden text-custom-grey justify-between items-start w-auto text-base";
  const pathName = usePathname();

  return (
    <nav
      id="menu"
      className={`${typeClass ? classHeader : classFooter} 
      `}
    >
      <Link
        href={PATHROUTES.LANDING}
        className={`enlaces hover:text-custom-white font-semibold ${
          pathName === PATHROUTES.LANDING ? "text-custom-white" : ""
        } `}
      >
        Inicio
      </Link>
      <Link
        href={PATHROUTES.SERVICES}
        className={`enlaces hover:text-custom-white font-semibold ${
          pathName === PATHROUTES.SERVICES ? "text-custom-white" : ""
        } `}
      >
        Servicios
      </Link>
      <Link
        href={PATHROUTES.CONTACT}
        className={`enlaces hover:text-custom-white font-semibold ${
          pathName === PATHROUTES.CONTACT ? "text-custom-white" : ""
        } `}
      >
        Contacto
      </Link>

      <Link
        href={`${PATHROUTES.DASHBOARD}/reservations`}
        className={`enlaces ${
          dataUser ? "block" : "hidden"
        } hover:text-custom-white font-semibold ${
          pathName === `${PATHROUTES.DASHBOARD}/reservations`
            ? "text-custom-white"
            : ""
        } `}
      >
        Reservas
      </Link>
      {dataUser ? (
        <Link
          href={`${PATHROUTES.DASHBOARD}/user`}
          className={`enlaces md:hidden hover:text-custom-white font-semibold text-6xl flex justify-end ${
            pathName === `${PATHROUTES.DASHBOARD}/user`
              ? "text-custom-white"
              : ""
          } `}
        >
          <FaRegCircleUser />
        </Link>
      ) : (
        <div className="pt-8">
          <Link
            href={PATHROUTES.REGISTER}
            className={`enlaces md:hidden text-center text-custom-grey min-w-20 border-2 font-semibold border-custom-red py-1.5 px-4 rounded-md bg-none  hover:text-custom-red`}
          >
            Registro
          </Link>
          <Link
            href={PATHROUTES.LOGIN}
            className="enlaces text-center md:hidden min-w-24 text-custom-white bg-custom-red py-1.5 px-4 rounded hover:bg-red-700 "
          >
            Login
          </Link>
        </div>
      )}

      <div className="md:hidden absolute flex top-5 justify-between w-full">
        <p className="text-custom-red text-2xl font-semibold">GarageJS</p>
        <span
          id="cerrar"
          className=" cursor-pointer text-2xl absolute right-8 hover:text-custom-white"
        >
          <IoCloseSharp />
        </span>
      </div>
    </nav>
  );
};

export default SubNav;

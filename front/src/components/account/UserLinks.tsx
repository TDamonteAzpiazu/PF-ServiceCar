"use client";
import React from "react";
import Cookies from "js-cookie";
import {
  FaCalendarCheck,
  FaRegCircleUser,
  FaTableCellsColumnLock,
} from "react-icons/fa6";
import { MdLogout, MdMiscellaneousServices } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { logout, setToken } from "@/redux/userSlice";
import { signOut } from "next-auth/react";
import { RxPencil2 } from "react-icons/rx";
import { GoGitBranch } from "react-icons/go";
import { IUser } from "@/helpers/types/types";
import { BsFillClipboardDataFill } from "react-icons/bs";

const UserLinks: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathName = usePathname();
  const dataUser: IUser = useSelector((state: any) => state.user.user);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Está seguro/a de cerrar sesión?",
      text: "Debera volver a ingresar para acceder a nuestros servicios",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cerrar sesión.",
      cancelButtonText: "Cancelar",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        Cookies.remove("token");
        dispatch(setToken(null));
        signOut();
        dispatch(logout());
        router.push(PATHROUTES.LANDING);
      } else {
        Swal.fire({
          title: "Operación cancelada",
          text: "¡Aún sigue con sesión activa!.",
          icon: "info",
        });
      }
    });
  };
  return (
    <section className="flex md:flex-col mr-1 flex-row md:w-1/4 w-full justify-between md:items-start items-end h-full md:min-h-[480px] py-3">
      <div className="flex flex-col gap-4 text-custom-grey">
        <div className="flex gap-2 items-center">
          <span className="text-xl">
            <FaRegCircleUser />
          </span>
          <Link
            href={`${PATHROUTES.DASHBOARD}/user`}
            className={`hover:text-custom-white ${
              pathName === `${PATHROUTES.DASHBOARD}/user`
                ? "text-custom-white"
                : ""
            }`}
          >
            Mi cuenta
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-xl">
            <FaCalendarCheck />
          </span>
          <Link
            href={`${PATHROUTES.DASHBOARD}/reservations`}
            className={`hover:text-custom-white ${
              pathName === `${PATHROUTES.DASHBOARD}/reservations`
                ? "text-custom-white"
                : ""
            }`}
          >
            Mis reservas
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-xl">
            <RxPencil2 />
          </span>
          <Link
            href={`${PATHROUTES.DASHBOARD}/opinions`}
            className={`hover:text-custom-white ${
              pathName === `${PATHROUTES.DASHBOARD}/opinions`
                ? "text-custom-white"
                : ""
            }`}
          >
            Mis opiniones
          </Link>
        </div>
        {dataUser && dataUser.role === "admin" && (
          <>
            <div className="flex gap-2 items-center">
              <span className="text-xl">
                <MdMiscellaneousServices />
              </span>
              <Link
                href={`${PATHROUTES.DASHBOARD}/servicios`}
                className={`hover:text-custom-white ${
                  pathName === `${PATHROUTES.DASHBOARD}/servicios`
                    ? "text-custom-white"
                    : ""
                }`}
              >
                Servicios
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-xl">
                <GoGitBranch />
              </span>
              <Link
                href={`${PATHROUTES.DASHBOARD}/sucursales`}
                className={`hover:text-custom-white ${
                  pathName === `${PATHROUTES.DASHBOARD}/sucursales`
                    ? "text-custom-white"
                    : ""
                }`}
              >
                Sucursales
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-xl">
                <FaTableCellsColumnLock />
              </span>
              <Link
                href={`${PATHROUTES.DASHBOARD}/opinionsAdmin`}
                className={`hover:text-custom-white ${
                  pathName === `${PATHROUTES.DASHBOARD}/opinionsAdmin`
                    ? "text-custom-white"
                    : ""
                }`}
              >
                Opiniones
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-xl">
                <BsFillClipboardDataFill />
              </span>
              <Link
                href={`${PATHROUTES.DASHBOARD}/estadisticas`}
                className={`hover:text-custom-white ${
                  pathName === `${PATHROUTES.DASHBOARD}/estadisticas`
                    ? "text-custom-white"
                    : ""
                }`}
              >
                Estadísticas
              </Link>
            </div>
          </>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="border md:w-1/2 w-1/5 md:h-auto h-12 flex gap-1 items-center text-sm border-custom-red py-2 px-3 text-center min-w-36 rounded-md bg-transparent text-custom-white hover:bg-custom-red hover:cursor-pointer"
      >
        <span className="text-xl">
          <MdLogout />
        </span>
        Cerrar sesión
      </button>
    </section>
  );
};

export default UserLinks;

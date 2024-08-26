"use client";
import React from "react";
import Cookies from "js-cookie";
import { FaCalendarCheck, FaRegCircleUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout, setToken } from "@/redux/userSlice";


const UserLinks: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
 

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(setToken(null));
    dispatch(logout());
    router.push(PATHROUTES.LANDING);
  };
  return (
    <section className="flex md:flex-col flex-row md:w-1/4 w-full justify-between md:items-start items-end h-full md:min-h-96 py-3">
      <div className="flex flex-col  gap-4 text-custom-white">
        <div className="flex gap-2 items-center">
          <span className="text-xl">
            <FaRegCircleUser />
          </span>
          <Link href={PATHROUTES.DASHBOARD}>Mi cuenta</Link>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-xl">
            <FaCalendarCheck />
          </span>
          <Link
            href={PATHROUTES.QUOTES}
            className="hover:text-custom-white text-custom-grey"
          >
            Mis reservas
          </Link>
        </div>
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

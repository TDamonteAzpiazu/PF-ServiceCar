import InfoAccount from "@/components/account/InfoAccount";
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import React from "react";
import { FaCalendarCheck, FaRegCircleUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

const Account: React.FC = () => {
  return (
    <main className="flex w-11/12 mx-auto">
      <section className="flex flex-col justify-between h-full min-h-96 py-3">
        <div className="flex flex-col gap-4 text-custom-white">
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
            <Link href={PATHROUTES.QUOTES} className="hover:text-custom-white text-custom-grey">Mis reservas</Link>
          </div>
        </div>
        <button className="border flex gap-1 items-center text-sm border-custom-red py-2 px-3 rounded-md bg-transparent text-custom-white hover:bg-custom-red hover:cursor-pointer">
          <span className="text-xl">
            <MdLogout />
          </span>
          Cerrar sesión
        </button>
      </section>
      <InfoAccount />
    </main>
  );
};

export default Account;

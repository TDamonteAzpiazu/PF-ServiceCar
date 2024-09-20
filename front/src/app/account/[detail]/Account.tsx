import StatisticsAdmin from "@/components/account/admin/Statistics";
import SucursalesAdmin from "@/components/account/admin/SucursalesAdmin";
import InfoAccount from "@/components/account/InfoAccount";
import Opinions from "@/components/account/Opinions";
import OpinionsAdmin from "@/components/account/OpinionsAdmin";
import Reservations from "@/components/account/Reservations";
import Services from "@/components/account/Services";
import UserLinks from "@/components/account/UserLinks";
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import React from "react";

const Account: React.FC<{ params: { detail: string } }> = ({ params }) => {
  const { detail } = params;

  if (
    detail !== "user" &&
    detail !== "reservations" &&
    detail !== "opinions" &&
    detail !== "servicios" &&
    detail !== "sucursales" &&
    detail !== "opinionsAdmin" &&
    detail !== "estadisticas"
  ) {
    return (
      <main>
        Parametro invalido.
        <Link
          href={`${PATHROUTES.DASHBOARD}/user`}
          className="bg-custom-red rounded font-semibold py-2 px-6 hover:bg-red-600 text-custom-white"
        >
          Volver al perfil
        </Link>
      </main>
    );
  }
  return (
    <main className="flex h-full md:flex-row flex-col w-11/12 mx-auto">
      <UserLinks />
      {detail === "user" && <InfoAccount />}
      {detail === "reservations" && <Reservations />}
      {detail === "opinions" && <Opinions />}
      {detail == "servicios" && <Services />}
      {detail === "sucursales" && <SucursalesAdmin />}
      {detail === "opinionsAdmin" && <OpinionsAdmin />}
      {detail === "estadisticas" && <StatisticsAdmin />}
    </main>
  );
};

export default Account;

"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  fetchAppointmentsService,
  fetchAppointmentsSucursal,
  fetchGananciaSucursales,
  fetchNewUsers,
} from "@/helpers/fetchGraph";
import GraphicGral from "./GraphicGral";
import NewUsers from "./NewUsers";
import { IGraphicGral, IGraphicUsers, IUser } from "@/helpers/types/types";
import PATHROUTES from "@/helpers/PathRoutes";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const StatisticsAdmin: React.FC = () => {
  const token = Cookies.get("token");
  const url = process.env.NEXT_PUBLIC_URL;
  const [appointmentsService, setAppointmentService] = useState<IGraphicGral>();
  const [appointmentsSucursales, setAppointmentSucursales] =
    useState<IGraphicGral>();
  const [ganancias, setGanancias] = useState<IGraphicGral>();
  const [users, setUsers] = useState<IGraphicUsers>();
  const router = useRouter();
  const dataUser: IUser = useSelector((state: any) => state.user.user);

  useEffect(() => {
    fetchAppointmentsService(url!, token!)
      .then((res) => {
        setAppointmentService(res);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchGananciaSucursales(url!, token!)
      .then((res) => {
        setGanancias(res);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchAppointmentsSucursal(url!, token!)
      .then((res) => {
        setAppointmentSucursales(res);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchNewUsers(url!, token!)
      .then((res) => {
        setUsers(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if(dataUser && dataUser.role === "user"){
    router.push(`${PATHROUTES.DASHBOARD}/user`)
  }
  return (
    <div className="w-full flex flex-col gap-5 my-2 text-center">
      <div className="w-full flex flex-col gap-1">
        <h2 className="text-custom-white text-xl font-extralight">
          Ganancias por sucursal
        </h2>
        <GraphicGral data={ganancias} />
      </div>
      <div className="w-full flex flex-col gap-1">
        <h2 className="text-custom-white text-xl font-extralight">
          Reservaciones por servicio
        </h2>
        <GraphicGral data={appointmentsService} />
      </div>
      <div className="w-full flex flex-col gap-1">
        <h2 className="text-custom-white text-xl font-extralight">
          Reservaciones por sucursales
        </h2>
        <GraphicGral data={appointmentsSucursales} />
      </div>
      <div className="w-full flex flex-col gap-1">
        <h2 className="text-custom-white text-xl font-extralight">
          Registro de usuarios nuevos
        </h2>
        <NewUsers data={users} />
      </div>
    </div>
  );
};

export default StatisticsAdmin;

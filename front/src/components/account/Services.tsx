"use client";
import React, { useEffect, useState } from "react";
import ServiceCall from "./serviciosComponentes/ServiceCall";
import { useSelector } from "react-redux";
import ServiceAddDelete from "./serviciosComponentes/ServiceAdd";
import { IService, IUser } from "@/helpers/types/types";
import { FetchServicio } from "@/helpers/serviciosFetch";
import { useRouter } from "next/navigation";
import PATHROUTES from "@/helpers/PathRoutes";

const Services: React.FC = () => {
  const dataUser: IUser = useSelector((state: any) => state.user.user);
  const [servicios, setServicios] = useState<IService[]>([]);
  const router = useRouter();
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchServicios = await FetchServicio();
        setServicios(fetchServicios);
      } catch (error) {
        console.error("Error fetching servicios:", error);
      }
    };

    fetchData();
  }, [updateFlag]);

  const handleUpdate = () => {
    setUpdateFlag((prev) => !prev); // Alternar el estado para desencadenar la actualización
  };
  if(dataUser && dataUser.role === "user"){
    router.push(`${PATHROUTES.DASHBOARD}/user`)
  }
  return (
    dataUser &&
    dataUser.role === "admin" && (
      <section className=" w-full text-custom-white ">
        <div className="flex justify-between pt-3 pb-5 items-center">
          <h1 className="font-semibold text-2xl">Servicios Disponibles</h1>
          <ServiceAddDelete setServicios={setServicios}/>
        </div>
        <div className="w-full">
          <ServiceCall servicios={servicios} handleUpdate={handleUpdate}/>
        </div>
      </section>
    )
  );
};

export default Services;

'use client'
import React from "react";
import ServiceCall from "./serviciosComponentes/ServiceCall";
import { useSelector } from "react-redux";
import ServiceAddDelete from "./serviciosComponentes/ServiceAdd";
import { IUser } from "@/helpers/types/types";

const Services: React.FC = () => {
  const dataUser: IUser = useSelector((state: any) => state.user.user);
  return (
    dataUser &&
    dataUser.role === "admin" && (
    <section className=" w-full text-custom-white ">
      <div className="flex justify-between pt-3 pb-5 items-center">
        <h1 className="font-semibold text-2xl">Servicios Disponibles</h1>
        <ServiceAddDelete />
      </div>
       <div className="w-full">
        <ServiceCall />
      </div> 
    </section>)
  );
};

export default Services;

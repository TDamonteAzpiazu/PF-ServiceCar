"use client";
import { ISucursales } from "@/helpers/types/types";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoEarthSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";


const CardSucursalesAdmin: React.FC<{
  sucursal: ISucursales;
  onDelete: () => void;
}> = ({ sucursal, onDelete }) => {

  return (
    <div className="relative bg-neutral-800 bg-opacity-60 p-3 rounded-md flex flex-col gap-1">
      <button className="absolute top-[-10px] right-[-10px] bg-custom-red rounded-full p-1.5 font-medium hover:bg-red-600">
        <RxCross2 />
      </button>
      <h2 className="text-lg">{sucursal.name}</h2>
      <p className="text-custom-grey flex text-sm">
        <span className="text-2xl pr-1">
          <FaLocationDot />
        </span>
        {sucursal.address}
      </p>
      <p className="font-extralight text-sm">{sucursal.details}</p>
      <div className="flex justify-between py-2 text-base font-light">
        <p className="flex">
          <span className="text-2xl pr-1">
            <IoEarthSharp />
          </span>
          Lat: {sucursal.latitud}
        </p>
        <p>Lon: {sucursal.longitud}</p>
      </div>
      <div className="flex justify-between">
        {sucursal.status === "active" ? (
          <button
            onClick={onDelete}
            className="border border-red-600 text-red-600 rounded py-1 px-2 text-base font-medium hover:bg-red-600 hover:text-custom-white"
          >
            Deshabilitar
          </button>
        ) : (
          <button className="border border-green-600 text-green-600 rounded-lg py-1 px-2 text-base font-medium hover:bg-green-600 hover:text-custom-white">
            Habilitar
          </button>
        )}

        <button className="border border-blue-600 text-blue-600 rounded-lg p-2 text-base  hover:bg-blue-600 hover:text-custom-white">
          <MdEdit />
        </button>
      </div>
      
    </div>
  );
};

export default CardSucursalesAdmin;

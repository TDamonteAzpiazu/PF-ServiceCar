"use client";
import { ISucursales } from "@/helpers/types/types";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoEarthSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import EditSucursal from "./EditSucursal";

const CardSucursalesAdmin: React.FC<{
  sucursal: ISucursales;
  onDelete: () => void;
  FetchSucursales: () => Promise<ISucursales[]>;
}> = ({ sucursal, onDelete, FetchSucursales }) => {
  const [viewEditSucursal, setViewEditSucursal] = useState<boolean>(false);

  return (
    <div
      className={`bg-neutral-800 ${
        sucursal.status === "inactive" ? "bg-opacity-50" : "bg-opacity-80"
      }  p-3 rounded-md flex flex-col gap-1`}
    >
      <h2
        className={`text-lg ${
          sucursal.status === "inactive" ? "text-zinc-400" : "text-custom-white"
        }`}
      >
        {sucursal.name}
      </h2>
      <p className="text-custom-grey flex text-sm">
        <span className="text-2xl pr-1">
          <FaLocationDot />
        </span>
        {sucursal.address}
      </p>
      <p
        className={`font-extralight text-sm ${
          sucursal.status === "inactive" ? "text-zinc-400" : "text-custom-white"
        }`}
      >
        {sucursal.details}
      </p>
      <div
        className={`flex justify-between py-2 text-base font-light ${
          sucursal.status === "inactive" ? "text-zinc-400" : "text-custom-white"
        }`}
      >
        <p className="flex">
          <span className="text-2xl pr-1">
            <IoEarthSharp />
          </span>
          Lat: {sucursal.latitud}
        </p>
        <p>Lon: {sucursal.longitud}</p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={onDelete}
          className={`${
            sucursal.status === "active"
              ? "border-red-600 text-red-600 hover:bg-red-600"
              : "border-green-600 text-green-600 hover:bg-green-600"
          } border rounded-lg py-1 px-2 text-base font-medium  hover:text-custom-white transition duration-300`}
        >
          {sucursal.status === "active" ? "Deshabilitar" : "Habilitar"}
        </button>

        <button
          onClick={() => setViewEditSucursal(!viewEditSucursal)}
          className="transition duration-300 border border-blue-600 text-blue-600 rounded-lg p-2 text-base  hover:bg-blue-600 hover:text-custom-white"
        >
          <MdEdit />
        </button>
      </div>
      {viewEditSucursal && (
        <div className="fixed inset-0 bg-black bg-opacity-55 z-40"></div>
      )}
      <EditSucursal
        FetchSucursales={FetchSucursales}
        setViewEditSucursal={setViewEditSucursal}
        viewEditSucursal={viewEditSucursal}
        sucursal={sucursal}
      />
    </div>
  );
};

export default CardSucursalesAdmin;

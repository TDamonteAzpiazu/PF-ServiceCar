"use client";
import PATHROUTES from "@/helpers/PathRoutes";
import { deleteSucursal, FetchSucursales } from "@/helpers/serviciosFetch";
import { ISucursales, IUser } from "@/helpers/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import CardSucursalesAdmin from "./CardSucursalesAdmin";
import CreateSucursal from "./CreateSucursal";

const SucursalesAdmin: React.FC = () => {
  const dataUser: IUser = useSelector((state: any) => state.user.user);
  const [sucursales, setSucursales] = useState<ISucursales[]>([]);
  const router = useRouter();
  const token = Cookies.get("token");
  const [viewCreateSucursal, setViewCreateSucursal] = useState<boolean>(false);

  if (dataUser && dataUser.role !== "admin") {
    router.push(`${PATHROUTES.DASHBOARD}/user`);
  }

  useEffect(() => {
    FetchSucursales()
      .then((res) => {
        setSucursales(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sucursales]);

  const handleDelete = async (sucursal: ISucursales) => {
    try {
      const response = await deleteSucursal(token!, sucursal);

      if (response.message === "Sucursal eliminada correctamente") {
        await FetchSucursales();
      }
    } catch (error) {
      console.error("Error al deshabilitar la sucursal:", error);
    }
  };

  return (
    dataUser &&
    dataUser.role === "admin" && (
      <section className="text-custom-white w-full ">
        <div className="pt-3 pb-5 flex justify-between">
          <h2 className="font-semibold text-2xl">Nuestras sucursales</h2>
          <button
            onClick={() => setViewCreateSucursal(!viewCreateSucursal)}
            className="rounded py-2 px-3 bg-custom-red hover:text-custom-red hover:bg-custom-white"
          >
            Nueva sucursal
          </button>
        </div>
        <div className="grid gap-6 w-full grid-cols-1 md:grid-cols-2 mb-5">
          {sucursales.map((sucursal: ISucursales) => (
            <CardSucursalesAdmin
              sucursal={sucursal}
              key={sucursal.id}
              onDelete={() => handleDelete(sucursal)}
              FetchSucursales={FetchSucursales}
            />
          ))}
        </div>
        {viewCreateSucursal && (
          <div className="fixed inset-0 bg-black bg-opacity-55 z-40"></div>
        )}

        <CreateSucursal
          FetchSucursales={FetchSucursales}
          setViewCreateSucursal={setViewCreateSucursal}
          viewCreateSucursal={viewCreateSucursal}
        />
      </section>
    )
  );
};

export default SucursalesAdmin;

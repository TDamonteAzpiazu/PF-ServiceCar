"use client";
import React, { useEffect, useState } from "react";
import Map from "./Map";
import { FetchSucursales } from "@/helpers/serviciosFetch";
import { IService, ISucursales } from "@/helpers/types/types";
import { FaLocationDot } from "react-icons/fa6";

const SucursalesDetail: React.FC<{ service: IService }> = ({ service }) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [sucursales, setSucursales] = useState<ISucursales[]>([]);
  const [selectedSucursal, setSelectedSucursal] = useState<ISucursales | null>(
    null
  );

  const filterSucursales: ISucursales[] = sucursales.filter((item) =>
    service.sucursales.includes(item.name)
  );

  const markers = selectedSucursal
    ? [
        {
          lat: Number(selectedSucursal.latitud),
          lng: Number(selectedSucursal.longitud),
          name: selectedSucursal.name,
        },
      ]
    : [];
  useEffect(() => {
    FetchSucursales()
      .then((res: ISucursales[]) => {
        setSucursales(res);

        if (res.length > 0) {
          const defaultSucursal =
            res.find((s) => service.sucursales.includes(s.name)) || null;
          setSelectedSucursal(defaultSucursal);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [service]);

  return (
    <div className="my-5">
      <h2 className="text-custom-white text-2xl mb-3">Nuestras sucursales</h2>
      <div className="flex space-x-4 mb-4">
        {filterSucursales.map((sucursal: ISucursales) => (
          <div key={sucursal.id}>
            {sucursal.status !== "active" ? (
              ""
            ) : (
              <button
                onClick={() => setSelectedSucursal(sucursal)}
                className={`py-2 px-4 rounded ${
                  selectedSucursal?.id === sucursal.id
                    ? "bg-custom-red text-white"
                    : "bg-custom-grey"
                }`}
              >
                {sucursal.name}
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedSucursal && selectedSucursal.status === "active" ? (
        <div>
          <h3 className="text-lg ">{selectedSucursal.name}</h3>
          <p className="text-custom-grey py-3 flex items-center">
            <span className="pr-1 text-custom-red">
              <FaLocationDot />
            </span>
            {selectedSucursal.address}
          </p>
          <p className="text-custom-grey font-extralight pb-4">
            {selectedSucursal.details}
          </p>
          <Map
            apiKey={apiKey!}
            center={{
              lat: Number(selectedSucursal.latitud),
              lng: Number(selectedSucursal.longitud),
            }}
            zoom={14}
            markers={markers}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SucursalesDetail;

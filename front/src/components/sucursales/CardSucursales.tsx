"use client";
import { ISucursales } from "@/helpers/types/types";
import React, { useEffect, useState } from "react";
import Map from "../services/Map";
import { FetchSucursales } from "@/helpers/serviciosFetch";
import Spinner from "../spinner/Spinner";

const CardSucursales: React.FC = () => {
  const [sucursales, setSucursales] = useState<ISucursales[]>([]);
  const [selectedSucursal, setSelectedSucursal] = useState<ISucursales | null>(
    null
  );

  useEffect(() => {
    FetchSucursales()
      .then((res) => {
        setSucursales(res);
        setSelectedSucursal(res[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="max-w-4xl mx-auto bg-black rounded-lg overflow-hidden">
      <div className="flex justify-around bg-black rounded">
        {!sucursales || sucursales.length < 1 ? (
          <Spinner title="Cargando sucursales..." />
        ) : (
          sucursales.map((sucursal) =>
            sucursal.status === "active" ? (
              <button
                key={sucursal.id}
                onClick={() => setSelectedSucursal(sucursal)}
                className={`py-2 px-4 w-full ${
                  selectedSucursal?.id === sucursal.id
                    ? "bg-custom-red text-white"
                    : "bg-custom-grey"
                }`}
              >
                {sucursal.name}
              </button>
            ) : null
          )
        )}
      </div>
      {selectedSucursal && selectedSucursal.status === "active" ? (
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4">{selectedSucursal.name}</h3>
          <p className="text-gray-400 mb-2">{selectedSucursal.address}</p>
          <p className="pb-4">{selectedSucursal.details}</p>

          <Map
            apiKey={apiKey!}
            center={{
              lat: Number(selectedSucursal.latitud),
              lng: Number(selectedSucursal.longitud),
            }}
            zoom={14}
            markers={[
              {
                lat: Number(selectedSucursal.latitud),
                lng: Number(selectedSucursal.longitud),
                name: selectedSucursal.name,
              },
            ]}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CardSucursales;

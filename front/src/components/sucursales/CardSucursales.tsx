"use client";
import { ISucursales } from "@/helpers/types/types";
import React, { useState } from "react";
import Map from "../services/Map";

const CardSucursales: React.FC<{ sucursales: ISucursales[] }> = ({
  sucursales,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="max-w-4xl mx-auto bg-black rounded-lg overflow-hidden">
      <div className="flex justify-around bg-black">
        {sucursales.map((sucursal, index) => (
          <button
            key={index}
            className={`py-4 px-6 text-lg font-semibold ${
              activeTab === index ? "bg-red-600 text-white" : "text-white"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {sucursal.name}
          </button>
        ))}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4">
          {sucursales[activeTab].name}
        </h3>
        <p className="text-gray-400 mb-2">{sucursales[activeTab].address}</p>
        <p className="pb-4">{sucursales[activeTab].details}</p>
        <Map
          apiKey={apiKey!}
          center={{
            lat: Number(sucursales[activeTab].latitud),
            lng: Number(sucursales[activeTab].longitud),
          }}
          zoom={14}
          markers={[
            {
              lat: Number(sucursales[activeTab].latitud),
              lng: Number(sucursales[activeTab].longitud),
              name: sucursales[activeTab].name,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CardSucursales;

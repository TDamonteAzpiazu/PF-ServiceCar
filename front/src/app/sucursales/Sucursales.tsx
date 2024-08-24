"use client";
import { sucursales } from "@/helpers/sucursales";
import { useState } from "react";

const Sucursales = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <main className=" text-white py-16 px-8">
      <h2 className="text-center text-3xl font-bold mb-12 mt-[65px]">Detalles de Nuestras Sucursales</h2>
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
              {sucursal.nombre}
            </button>
          ))}
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4">{sucursales[activeTab].nombre}</h3>
          <p className="text-gray-400 mb-2">{sucursales[activeTab].direccion}</p>
          <p>{sucursales[activeTab].detalles}</p>
        </div>
      </div>
    </main>
  );
};

export default Sucursales;

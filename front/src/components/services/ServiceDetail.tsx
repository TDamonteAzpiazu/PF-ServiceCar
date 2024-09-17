"use client";
import { IService, ISucursales } from "@/helpers/types/types";
import React, { useEffect, useState } from "react";
import { fetchDataService, FetchSucursales } from "@/helpers/serviciosFetch";
import Image from "next/image";
import { FaCheckSquare, FaCoffee } from "react-icons/fa";
import { MdLocalCarWash } from "react-icons/md";
import NavbarService from "./NavbarService";
import SucursalesDetail from "./SucursalesDetail";
import CarruselOpinions from "./CarruselOpinions";

const ServiceDetail: React.FC<{ id: string }> = ({ id }) => {
  const url = process.env.NEXT_PUBLIC_URL;
  const [service, setService] = useState<IService>();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [sucursales, setSucursales] = useState<ISucursales[]>([]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    FetchSucursales()
      .then((res) => {
        setSucursales(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchDataService(url, id)
      .then((res: IService) => {
        setService(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url, id]);

  return (
    <section>
      {service && service.status === "active" && (
        <div className="text-custom-white flex flex-col w-11/12 mx-auto">
          <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center items-start mb-5">
            <div className="flex flex-col sm:mb-0 mb-4">
              <h2 className="text-3xl">{service.type}</h2>
              <p className="text-custom-grey pt-1 font-light">
                Selecciona la sucursal que mejor se adapte a tus preferencias
              </p>
            </div>
            <button
              className="bg-custom-red rounded py-3 px-4 hover:bg-red-600"
              onClick={toggleMenu}
            >
              Reservar | ARS${service.price}
            </button>
          </div>

          <Image
            alt={service.type}
            src={service.image}
            width={800} // Ajustar el ancho real deseado
            height={500} // Ajustar la altura real deseada
            className="w-11/12 mx-auto h-[300px] md:h-[500px] rounded-bl-3xl rounded-tr-3xl"
            quality={100} // Establecer la calidad de la imagen
          />

          <div className="border-2 mt-10 mb-6 border-custom-red py-3 px-3 rounded flex flex-col gap-3">
            <p className="text-xl ">Aclaración</p>
            <p className="text-custom-grey">
              El horario y la fecha pactada sera respetada indefectiblemente,
              recomendando hacerse presente 10 minutos antes para evitar
              imprevistos
            </p>
          </div>
          <div className="flex sm:flex-row flex-col mt-3 mb-6 w-full">
            <div className="flex flex-col gap-3 md:w-2/3 w-1/2 sm:mb-0 mb-6">
              <p className="text-xl">Acerca del servicio</p>
              <p className="text-custom-grey">{service.description}</p>
              <div>
                <button
                  className="bg-custom-red rounded py-3 px-4 hover:bg-red-600"
                  onClick={toggleMenu}
                >
                  Reservar | US${service.price}
                </button>
              </div>
            </div>
            <div className="flex flex-col md:w-1/3 w-1/2">
              <p className="text-start mb-4 text-xl">Comodidades</p>
              <p className="flex gap-2 items-center">
                <span className="text-2xl text-custom-red">
                  <FaCheckSquare />
                </span>
                Asesoramiento inmediato
              </p>
              <p className="flex gap-2 my-3 items-center">
                <span className="text-2xl text-custom-red">
                  <MdLocalCarWash />
                </span>
                Lavado del vehiculo sin costo
              </p>
              <p className="flex gap-2 items-center">
                <span className="text-2xl text-custom-red">
                  <FaCoffee />
                </span>
                Zona resto-bar para comodidad del cliente
              </p>
            </div>
          </div>
          <CarruselOpinions id={service.id} />
          <SucursalesDetail service={service} />
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-55 z-40"
              onClick={toggleMenu}
            ></div>
          )}
          <NavbarService
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            service={service}
            sucursales={sucursales}
          />
        </div>
      )}
    </section>
  );
};

export default ServiceDetail;

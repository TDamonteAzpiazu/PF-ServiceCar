"use client";
import { IService } from "@/helpers/types/types";
import React, { useEffect, useState } from "react";
import { fetchDataService } from "@/helpers/serviciosFetch";
import Image from "next/image";
import { FaCheckSquare, FaCoffee } from "react-icons/fa";
import { MdLocalCarWash } from "react-icons/md";

const ServiceDetail: React.FC<{ id: string }> = ({ id }) => {
  const url = process.env.NEXT_PUBLIC_URL;
  const [service, setService] = useState<IService>();

  useEffect(() => {
    fetchDataService(url, id)
      .then((res: IService) => {
        setService(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <section>
      {service && (
        <div>
          <div>
            <div>
              <h2>{service.type}</h2>
              <p>{service.location}</p>
            </div>
            <button>Reservar | ${service.price}Ars. por dia</button>
          </div>
          <Image alt={service.type} src={service.image} />
          <div>
            <p>Aclaracion</p>
            <p>
              El horario y la fecha pactada sera respetada indefectiblemente,
              recomendando hacerse presente 10 minutos antes para evitar
              imprevistos
            </p>
          </div>
          <div>
            <div>
              <p>Acerca del servicio</p>
              <p>{service.description}</p>
              <button>Reservar | ${service.price}Ars. por dia</button>
            </div>
            <div>
              <p>Comodidades</p>
              <p>
                <span>
                  <FaCheckSquare />
                </span>
                Asesoramiento inmediato
              </p>
              <p>
                <span>
                  <MdLocalCarWash />
                </span>
                Lavado del vehiculo sin costo
              </p>
              <p>
                <span>
                  <FaCoffee />
                </span>
                Zona resto-bar para comodidad del cliente
              </p>
            </div>
          </div>
          <div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11687.057015968177!2d-64.49447745976698!3d-31.05197151289664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1724800084286!5m2!1ses-419!2sar"
                width="600"
                height="450"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceDetail;

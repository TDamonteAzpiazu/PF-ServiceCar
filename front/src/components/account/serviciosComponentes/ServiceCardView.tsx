"use client"
import { IService } from "@/helpers/types/types";
import Link from "next/link";
import InhabilitarButton from "./InhabilitarButton";
import EditarButton from "./EditarButton";
import { useState } from "react";

const ServiceCardView: React.FC<IService & { handleUpdate: () => void }> = ({ id, type, description, price, status, sucursales, image, vehiculo, handleUpdate }) => {
  const [serviceStatus, setServiceStatus] = useState(status);

  const handleStatusChange = () => {
    setServiceStatus(serviceStatus === "active" ? "inactive" : "active");
  };

  const serviceData = { id, type, description, price, status, sucursales, image, vehiculo };

  return (
    <div className={`bg-neutral-800 bg-opacity-75 py-3 px-2 rounded-md flex flex-col justify-between gap-1 ${serviceStatus === "inactive" ? "opacity-50" : ""}`}>
      <Link href={`/services/${id}`} className="flex flex-col px-4 py-2 w-full">
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col gap-2">
            <h2 className="lg:text-base sm:text-sm text-base">{type}</h2>
            <p className="text-custom-grey lg:text-sm sm:text-xs text-sm">{description}</p>
            <p className="text-custom-white font-extralight lg:text-sm sm:text-xs text-sm">{vehiculo}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-custom-grey lg:text-base sm:text-sm text-base">${price}</p>
          </div>
        </div>
      </Link>
      <div className="flex items-end justify-between px-4">
        <EditarButton service={serviceData} handleUpdate={handleUpdate} />
        <InhabilitarButton id={id} status={serviceStatus} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
};

export default ServiceCardView;

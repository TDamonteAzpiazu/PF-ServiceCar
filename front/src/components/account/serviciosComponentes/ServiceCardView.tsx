import { IService } from "@/helpers/types/types";
import Link from "next/link";
import InhabilitarButton from "./InhabilitarButton";
import EditarButton from "./EditarButton";
import { useState } from "react";
import { FetchServicio } from "@/helpers/serviciosFetch";

const ServiceCardView: React.FC<IService> = ({ id, type, description, price, status, sucursales, image, vehiculo }) => {
  const [serviceStatus, setServiceStatus] = useState(status);

  const handleStatusChange = () => {
    setServiceStatus(serviceStatus === "active" ? "inactive" : "active");
  };

  const serviceData = { id, type, description, price, status, sucursales, image, vehiculo };

  return (
    <div className={`flex flex-col bg-black bg-opacity-40 rounded hover:bg-opacity-60 transition duration-300 mb-4 w-full ${serviceStatus === "inactive" ? "opacity-50" : ""}`}>
      <Link href={`/services/${id}`} className="flex flex-col px-4 py-4 w-full">
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col">
            <h2 className="lg:text-base sm:text-sm text-base">{type}</h2>
            <p className="text-custom-grey lg:text-sm sm:text-xs text-sm">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-custom-grey lg:text-base sm:text-sm text-base">${price}</p>

          </div>
        </div>
      </Link>
      <div className="flex gap-2 mx-4 mb-4">
        <EditarButton service={serviceData} FetchServices={FetchServicio} />
        <InhabilitarButton id={id} status={serviceStatus} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
};

export default ServiceCardView;

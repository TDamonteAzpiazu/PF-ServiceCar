"use client";
import { IService } from "@/helpers/types/types";
import Link from "next/link";
import InhabilitarButton from "./InhabilitarButton";
import EditarButton from "./EditarButton";
import ImageModal from "./ImageModal";
import { FaImage } from "react-icons/fa";
import { useState } from "react";

const ServiceCardView: React.FC<IService & { handleUpdate: () => void }> = ({
  id,
  type,
  description,
  price,
  status,
  sucursales,
  image,
  vehiculo,
  handleUpdate,
}) => {
  const [serviceStatus, setServiceStatus] = useState(status);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = () => {
    setServiceStatus(serviceStatus === "active" ? "inactive" : "active");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const serviceData = {
    id,
    type,
    description,
    price,
    status,
    sucursales,
    image,
    vehiculo,
  };

  return (
    <div
      className={`bg-neutral-800  py-3 px-2 rounded-md flex flex-col justify-between min-h-40 ${
        serviceStatus === "inactive" ? "bg-opacity-50" : "bg-opacity-85"
      }`}
    >
      <Link
        href={`/servicios/${id}`}
        className="flex flex-col px-4 py-2 w-full"
      >
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col gap-4">
            <h2
              className={`lg:text-base sm:text-sm text-base ${
                serviceStatus === "inactive" ? "text-" : ""
              }`}
            >
              {type}
            </h2>
            <p className="text-custom-grey lg:text-sm sm:text-xs text-sm">
              {description.split(" ").slice(0, 10).join(" ") + ".."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-custom-grey lg:text-base sm:text-sm text-base">
              ${price}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex items-end justify-between px-4">
        <EditarButton service={serviceData} handleUpdate={handleUpdate} />

        <button
          onClick={openModal}
          className="border rounded-md border-custom-grey text-white py-2 px-3 hover:bg-gray-700"
        >
          <FaImage />
        </button>

        <InhabilitarButton
          id={id}
          status={serviceStatus}
          onStatusChange={handleStatusChange}
        />
      </div>

      <ImageModal
        imageUrl={image}
        isOpen={isModalOpen}
        onClose={closeModal}
        serviceId={id}
        handleUpdate={handleUpdate} // Pasa handleUpdate aquii
      />
    </div>
  );
};

export default ServiceCardView;

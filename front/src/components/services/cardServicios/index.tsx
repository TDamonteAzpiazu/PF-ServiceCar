import React from "react";
import Image from "next/image";
import { IService } from "@/helpers/types/types";
import Link from "next/link";
import { MdAttachMoney, MdOutlineDescription } from "react-icons/md";
import { FaLocationDot, FaTruck, FaBuilding } from "react-icons/fa6";
import PATHROUTES from "@/helpers/PathRoutes";

const ServiceCard: React.FC<IService> = ({
  id,
  type,
  description,
  vehiculo,
  image,
  price,
  status,
  sucursales,
}) => {
  return (
    <div className="relative  text-custom-white flex items-center  bg-neutral-800 bg-opacity-90 rounded-bl-3xl rounded-tr-3xl shadow-md overflow-hidden  duration-300 ease-in-out sm:min-h-[290px] md:min-h-[310px] min-h-[300px] transition-transform transform hover:scale-105">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-custom-red"></div>
      <div className="flex-shrink-0 w-1/3 h-full relative overflow-hidden">
        <Image
          src={image}
          alt={type}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>
      <div className="flex flex-col justify-between gap-3 px-4 w-2/3">
        <h5 className="text-lg font-semibold mb-1">{type}</h5>
        <p className="text-custom-grey flex gap-1 items-center text-sm ">
          <span className=" text-custom-red text-2xl">
            <MdOutlineDescription />
          </span>
          <span className="truncate-description">{description}</span>
        </p>

        <p className="text-custom-grey flex gap-1 items-center">
          <span className="text-custom-red text-2xl">
            <FaTruck />
          </span>
          {vehiculo}
        </p>

        <p className="text-custom-grey flex gap-1 items-center">
          <span className="text-custom-red text-2xl">
            <FaLocationDot />
          </span>
          {sucursales[0]}...
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl flex gap-1 font-bold items-center">
            <span className=" text-custom-red text-2xl">
              <MdAttachMoney />
            </span>
            ${price}
          </span>
        </div>
        <div className="flex justify-center">
          <Link
            href={`${PATHROUTES.SERVICES}/${id}`}
            className="border border-custom-red py-1.5 px-2 rounded-md text-custom-white bg-transparent hover:bg-custom-red mt-3 w-2/5 min-w-24 text-center"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

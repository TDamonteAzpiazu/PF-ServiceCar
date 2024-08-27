import React from "react";
import Image from "next/image";
import { IService } from "@/helpers/types/types";

const ServiceCard: React.FC<IService> = ({ 
    id, 
    type, 
    description, 
    location,
    image, 
    price 
}) => {
  return (
    <div className="relative text-white flex items-center mb-6 bg-black rounded-lg shadow-md overflow-hidden w-full h-[200px] transition-transform transform hover:scale-105 hover:bg-red-600 hover:bg-opacity-90">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-600"></div>
      <div className="flex-shrink-0 w-1/3 h-full relative overflow-hidden">
        <Image
          src={image}
          alt={type}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>
      <div className="flex flex-col justify-between p-4 w-2/3">
        <h5 className="text-lg font-semibold">{type}</h5>
        <p className="text-gray-400">{description}</p>
        <p className="text-gray-400">{location}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

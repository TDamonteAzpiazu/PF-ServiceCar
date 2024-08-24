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
  const service: IService = { id, type, description, location, image, price };

  return (
    <div className="w-full max-w-xs bg-black border border-gray-700 rounded-lg shadow-lg p-4 m-4 transform transition-transform duration-300 hover:scale-105">
      <div className="relative h-40 w-full">
        <Image
          src={image}
          alt={type}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="mt-4">
        <h5 className="text-lg font-bold text-gray-500">{type}</h5>
        <p className="text-gray-400 mt-2">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-semibold text-white">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

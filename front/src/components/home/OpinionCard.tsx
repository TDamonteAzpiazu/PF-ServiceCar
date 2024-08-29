import { IOpinion } from "@/helpers/types/types";
import Image from "next/image";
import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const OpinionCard: React.FC<{ opinion: IOpinion; index: number }> = ({
  index,
  opinion,
}) => {
  return (
    <div
      key={index}
      className={`rounded-xl p-6 shadow-md w-full md:w-1/3 max-w-xs max-h-[600px] min-h-[500px] ${
        index === 1 ? "bg-red-700" : "bg-custom-grey"
      }`}
    >
      <div className="flex justify-center mb-4">
        <Image
          width={80}
          height={80}
          src={opinion.icono}
          alt="Icono de la persona"
          className="w-20 h-20 rounded-full"
        />
      </div>
      <div className="flex justify-center mb-2">
        {Array.from({ length: opinion.estrellas }).map((_, starIndex) => (
          <FaStar key={starIndex} className="text-yellow-500 mr-1" />
        ))}
      </div>
      <h3 className="text-xl font-bold text-center">{opinion.nombre}</h3>
      <h4 className="text-gray-400 text-center mb-4">{opinion.ocupacion}</h4>
      <div className="flex justify-center mb-4">
        <FaQuoteLeft className="text-white text-3xl" />
      </div>
      <p className="text-center">{opinion.opinion}</p>
    </div>
  );
};

export default OpinionCard;

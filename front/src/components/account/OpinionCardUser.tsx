import { IOpinionUser } from "@/helpers/types/types";
import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const OpinionCardUser: React.FC<{ opinion: IOpinionUser; index: number }> = ({
  index,
  opinion,
}) => {
 
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <div
      className={`rounded-xl p-6 shadow-md w-full  max-w-xs max-h-[600px] min-h-[500px] ${
        index === 1 ? "bg-red-700" : "bg-custom-grey"
      }`}
    >
      <div className="flex justify-center mb-2">
        {Array.from({ length: opinion.estrellas }).map((_, starIndex) => (
          <FaStar key={starIndex} className="text-yellow-500 mr-1" />
        ))}
      </div>
      <h3 className="text-xl font-bold text-center">{opinion.service}</h3>

      <div className="flex justify-center mb-4">
        <FaQuoteLeft className="text-white text-3xl" />
      </div>
      <p className="text-center">{opinion.opinion}</p>
      <p className="text-gray-400 text-center mb-4">
        {formatDate(opinion.date)}
      </p>
    </div>
  );
};

export default OpinionCardUser;

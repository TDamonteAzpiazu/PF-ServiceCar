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
  const truncateComment = (comment: string, maxLength: number) => {
    if (!comment.includes(" ") && comment.length > maxLength) {
      return `${comment.substring(0, maxLength)}...`;
    }
    return comment;
  };
  return (
    <div
      className={`rounded-xl py-6 px-3 shadow-md md:w-full w-11/12 mx-auto max-h-[600px] text-custom-white  ${
        index % 2 !== 0 ? "bg-red-700" : "bg-[#2b2b2b]"
      }`}
    >
      <div className="flex justify-center mb-2">
        {Array.from({ length: opinion.rating }).map((_, starIndex) => (
          <FaStar key={starIndex} className="text-yellow-500 mr-1" />
        ))}
      </div>
      <h3 className="text-lg font-bold ">{opinion.service.type}</h3>
      <p className="text-neutral-500">AR$ {opinion.service.price}</p>
      <div className="flex justify-center mb-4">
        <FaQuoteLeft className="text-white text-3xl" />
      </div>

      <p className="font-extralight pb-2">{truncateComment(opinion.comment, 20)}</p>
      <p
        className="text-gray-400 text-center mb-3 underline underline-offset-2 "
        style={{ textDecorationColor: "#840000" }}
      >
        {formatDate(opinion.createdAt)}
      </p>
    </div>
  );
};

export default OpinionCardUser;

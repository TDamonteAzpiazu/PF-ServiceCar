import { IOpinionUser } from "@/helpers/types/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { deleteOpinion, getOpinions } from "@/helpers/fetchOpinion";
import Cookies from "js-cookie";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const OpinionCardAdmin: React.FC<{
  opinion: IOpinionUser;
  index: number;
  carrusel: boolean;
  setOpinions: React.Dispatch<React.SetStateAction<IOpinionUser[]>>;
}> = ({ index, opinion, carrusel, setOpinions }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  console.log(opinion);
  const token = Cookies.get("token");
  const url = process.env.NEXT_PUBLIC_URL;

  const truncateComment = (comment: string, maxLength: number) => {
    if (!comment.includes(" ") && comment.length > maxLength) {
      return `${comment.substring(0, maxLength)}...`;
    }
    return comment;
  };

  const handleDelete = async () => {
    const res = await deleteOpinion(url!, token!, opinion.id);
    if (res) {
      getOpinions(url!, token!).then((res) => {
        if (Array.isArray(res)) {
          setOpinions(res);
        } else {
          console.error("Unexpected response format:", res);
          setOpinions([]);
        }
      });
    }
  };

  return (
    <>
      {opinion && (
        <div
          className={`relative   px-3 mb-9 shadow-md ${
            carrusel
              ? "md:min-w-[33%] sm:min-w-[49.5%] min-w-[99.30%]  pb-6 pt-[68px]"
              : "md:w-full w-11/12 mx-auto py-6"
          } md:w-full w-11/12 mx-auto max-h-[600px] text-custom-white rounded-xl ${
            index % 2 !== 0 ? "bg-red-700" : "bg-[#2b2b2b]"
          }`}
        >
          {carrusel ? (
            " "
          ) : (
            <button
              onClick={handleDelete}
              className="absolute top-[-15px] right-[-15px] bg-red-800 rounded-full p-2 hover:bg-red-500"
            >
              <RxCross2 className="hover:bg-red-500  cursor-pointer" />
            </button>
          )}
          <div
            className={`absolute ${
              carrusel ? "top-1" : "top-[-40px]"
            }  left-0 flex  w-full justify-center`}
          >
            {/* <Image
              alt={opinion.user.name}
              src={opinion.user.image}
              width={70}
              height={70}
              className="rounded-full"
            /> */}
          </div>
          <div className="flex justify-center gap-1 mt-4 mb-2">
            {Array.from({ length: opinion.rating }).map((_, starIndex) => (
              <FaStar key={starIndex} className="text-yellow-500 " />
            ))}
          </div>
          {!carrusel && (
            <>
              <h3 className="text-lg font-bold ">{opinion.service.type}</h3>
              <p className="text-neutral-500">AR$ {opinion.service.price}</p>
            </>
          )}

          <div className="flex justify-center mb-4">
            <FaQuoteLeft className="text-white text-3xl" />
          </div>

          <p className="font-extralight pb-2">
            {truncateComment(opinion.comment, 20)}
          </p>
          <p
            className="text-gray-400 text-center mb-3 underline underline-offset-2 "
            style={{ textDecorationColor: "#840000" }}
          >
            {formatDate(opinion.createdAt)}
          </p>
          <p className="font-normal text-lg">{opinion.user.name}</p>
          <p className="font-extralight">{opinion.occupation}</p>
        </div>
      )}
    </>
  );
};

export default OpinionCardAdmin;

import React from "react";
import { BannerProps } from "@/helpers/types/types";
import Link from "next/link";
import PATHROUTES from "@/helpers/PathRoutes";

const CardBanner: React.FC<BannerProps> = ({ img, text, title }) => {
  return (
    <div
      className="proyecto-banner h-full bg-cover pl-6 sm:pl-2"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="info-proyecto text-center flex flex-col justify-center h-5/6 w-11/12 mx-auto p-2.5 gap-5 text-custom-white">
        <h4 className="sm:text-4xl text-3xl font-bold ">{title}</h4>
        <p className="text-custom-white text-lg font-light mb-5">{text}</p>
        <div>
          <Link
            href={PATHROUTES.SUCURSALES}
            className=" transition duration-500 ease-in-out  font-bold py-3 rounded px-7 bg-custom-red text-custom-white text-xs sm:text-base hover:bg-custom-white hover:text-custom-red"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardBanner;

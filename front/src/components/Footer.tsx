"use client";
import React from "react";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import SubNav from "./navbar/Subnav";
import Image from "next/image";
import { FaSquareXTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { IUser } from "@/helpers/types/types";

const Footer: React.FC = () => {
  const dataUser:IUser = useSelector((state: any) => state.user.user);
  return (
    <footer className="bg-zinc-800 bg-opacity-30 backdrop-blur shadow-lg w-full h-full pb-1">
      <div className="flex sm:pr-24 sm:pl-16 pr-5 pl-5 justify-between h-4/5 py-5">
        <div className="">
          <Image
            loading="lazy"
            src="/garagejs.svg"
            alt="Garagejs"
            width={150}
            height={100}
            className="sm:w-36 w-28"
          />
        </div>
        <div className="flex justify-around w-1/5">
          <SubNav typeClass={false} dataUser={dataUser}/>
        </div>
        <div className="sm:flex hidden flex-col text-custom-grey pr-2">
          <h3 className="text-custom-white text-lg pb-3">Contáctenos:</h3>
          <div className="flex flex-col gap-5">
            <p className="flex gap-1 items-center">
              <span>
                <FaPhoneAlt className="text-custom-red" />
              </span>
              (506) 7095-9924
            </p>
            <p className="flex gap-1 items-center">
              <span>
                <FaWhatsapp className="text-custom-red" />
              </span>
              (506) 7095-9924
            </p>
            <p className="flex gap-1 items-center">
              <span>
                <MdEmail className="text-custom-red" />
              </span>
              info@garage.com
            </p>
          </div>
        </div>
        <div className="flex flex-col  items-center gap-5">
          <Link href={"https://x.com/"} className="text-2xl">
            <FaSquareXTwitter className="text-custom-red" />
          </Link>
          <Link
            href={
              "https://www.linkedin.com/in/agustin-gerardo-haag-letterucci-8a6546225/"
            }
            className="text-2xl"
          >
            <FaLinkedin className="text-custom-red" />
          </Link>
          <Link href={"https://www.youtube.com/"} className="text-2xl">
            <FaYoutube className="text-custom-red" />
          </Link>
          <Link
            href={"https://www.instagram.com/agushaag22/"}
            className="text-2xl"
          >
            <FaInstagram className="text-custom-red" />
          </Link>
        </div>
      </div>
      <p className="text-center text-custom-grey">
        &copy; 2024 GarageJS. Todos los derechos reservados. 
      </p>
    </footer>
  );
};

export default Footer;

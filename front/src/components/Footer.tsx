"use client";
import React from "react";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import SubNav from "./navbar/Subnav";
import Image from "next/image";
import { FaSquareXTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-800 bg-opacity-30 backdrop-blur shadow-lg w-full h-full pb-1">
      <div className="flex px-24 justify-between h-4/5 pt-5">
        <div className="">
          <Image
            loading="lazy"
            src="/Garagejs.png"
            alt="Garagejs"
            width={150}
            height={100}
          />
        </div>
        <div className="flex justify-around w-1/5">
          <SubNav typeClass={false} />
        </div>
        <div className="flex flex-col text-custom-grey">
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
            <FaSquareXTwitter className="text-black" />
          </Link>
          <Link
            href={
              "https://www.linkedin.com/in/agustin-gerardo-haag-letterucci-8a6546225/"
            }
            className="text-2xl"
          >
            <FaLinkedin className="text-blue-700" />
          </Link>
          <Link href={"https://www.youtube.com/"} className="text-2xl">
            <FaYoutube className="text-red-700" />
          </Link>
          <Link
            href={"https://www.instagram.com/agushaag22/"}
            className="text-2xl"
          >
            <FaInstagram className="text-red-500" />
          </Link>
        </div>
      </div>
      <p className="text-center text-custom-grey">
        &copy;All rights reserved GarageJS - 2024
      </p>
    </footer>
  );
};

export default Footer;

"use client";
import PATHROUTES from "@/helpers/PathRoutes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import SubNav from "./Subnav";
import { FaRegCircleUser } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";

const Navbar: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
<<<<<<< HEAD
  const dataUser = false;
=======
  const { dataUser, setDataUser } = useAuth();
>>>>>>> 5f782a3549ce3ef059f1b60b3dc39f00024feebb

  useEffect(() => {
    const menu: HTMLElement | null = document.getElementById("menu");
    const mostrar: HTMLElement | null = document.getElementById("mostrar");
    const cerrar: HTMLElement | null = document.getElementById("cerrar");
    const enlaces: NodeListOf<Element> = document.querySelectorAll(".enlaces");

    mostrar?.addEventListener("click", () => {
      if (menu) {
        menu.classList.add("visible");
        menu.style.transition = "0.6s";
        mostrar.style.visibility = "hidden";
      }
    });

    cerrar?.addEventListener("click", () => {
      if (menu) {
        menu.classList.remove("visible");

        mostrar && (mostrar.style.visibility = "visible");
      }
    });

    enlaces.forEach((enlace) => {
      enlace.addEventListener("click", () => {
        if (menu) {
          menu.classList.remove("visible");

          mostrar && (mostrar.style.visibility = "visible");
        }
      });
    });

    return () => {
      mostrar?.removeEventListener("click", () => {});
      cerrar?.removeEventListener("click", () => {});
      enlaces.forEach((enlace) => {
        enlace.removeEventListener("click", () => {});
      });
    };
  }, [dataUser]);

  return (
    <header
      ref={headerRef}
      className={`flex bg-zinc-800 bg-opacity-30 backdrop-blur shadow-lg justify-around items-center fixed w-full py-3 px-6 z-50 transition-colors duration-300 `}
    >
      <div className="pl-3 flex w-3/5 gap-4">
        <Image src={"/Garagejs.png"} alt="Garagejs" width={110} height={10} />

        <div className="flex items-center">
          <SubNav typeClass={true} />
        </div>
      </div>
      <div className="w-2/5 flex justify-end">
        <span
          id="mostrar"
          className="md:hidden text-white flex cursor-pointer text-2xl relative right-1 order-1"
        >
          <RxHamburgerMenu />
        </span>
        {dataUser?.token ? (
          <Link
            href={PATHROUTES.DASHBOARD}
            className="md:flex hidden items-center gap-2 text-custom-white"
          >
            <p className="text-xl font-medium">Agustin Haag</p>
            <span className="text-4xl">
              <FaRegCircleUser />
            </span>
          </Link>
        ) : (
          <div className="md:flex hidden sm:gap-4 sm:text-lg text-sm gap-2 sm:flex-row flex-col text-custom-white">
<<<<<<< HEAD
          
=======
>>>>>>> 5f782a3549ce3ef059f1b60b3dc39f00024feebb
            <Link
              href={PATHROUTES.LOGIN}
              className="text-custom-white bg-custom-red py-1 px-3 rounded w-24 text-center hover:bg-red-600"
            >
              Login
            </Link>
            <Link
              href={PATHROUTES.REGISTER}
<<<<<<< HEAD
              className={`text-black  bg-white  py-1 px-3 w-24 rounded-md bg-none hover:text-custom-white hover:bg-red-600`}
=======
              className={`text-custom-red  bg-custom-white  py-1 px-3 w-24 rounded-md border hover:text-custom-white hover:bg-transparent hover:border-custom-white`}
>>>>>>> 5f782a3549ce3ef059f1b60b3dc39f00024feebb
            >
              Registro
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

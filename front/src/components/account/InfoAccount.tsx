"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";

const InfoAccount: React.FC = () => {

  const dataUser = useSelector((state: any) => state.user.user);

  return (
    <section className="md:w-3/4 w-full mt-2 mr-4">
      {dataUser && (
        <>
          <div className="bg-black py-6 pl-3 bg-opacity-70 flex gap-4 rounded items-center text-custom-white">
            <div className="relative">
              <Image
                alt=""
                src={dataUser?.image || "/userPerfil2.png"}
                height={160}
                width={160}
                className="sm:w-36 w-28"
              />
              <button className="absolute  bottom-5 right-1 border-2 border-custom-red font-semibold sm:text-2xl text-base  rounded-full p-1 bg-custom-red text-custom-white hover:bg-custom-white hover:text-custom-red">
                <MdEdit />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold sm:text-3xl text-xl">
                {dataUser?.name}
              </h2>
              <p className="font-light sm:text-base text-xs">
                {dataUser?.email}
              </p>
            </div>
          </div>
          <div className="text-custom-white flex flex-col gap-5 w-full">
            <div className="flex text-start  pt-3 pb-5">
              <div className="w-1/2">
                <span className="font-light text-custom-grey">Nombre:</span>
                <p>{dataUser?.name}</p>
              </div>
              <div className="w-1/2">
                <span className="font-light text-custom-grey">Email:</span>
                <p>{dataUser?.email}</p>
              </div>
            </div>
            <div className="flex text-start">
              <div className="w-1/2">
                <span className="font-light text-custom-grey">
                  Estado de cuenta:
                </span>
                <p className="text-green-600 capitalize">{dataUser?.status}</p>
              </div>
              <div className="w-1/2">
                <span className="font-light text-custom-grey">Dirección:</span>
                <p>{dataUser?.address}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center my-7">
            <Link
              href="/edit"
              className="bg-custom-red rounded font-semibold py-2 px-6  hover:bg-red-600 text-custom-white"
            >
              Editar perfil
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default InfoAccount;

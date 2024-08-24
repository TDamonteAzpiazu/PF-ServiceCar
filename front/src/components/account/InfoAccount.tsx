import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdEdit } from "react-icons/md";

const InfoAccount: React.FC = () => {
  return (
    <section className="md:w-3/4 w-full mt-2 mr-4">
      <div className="bg-black py-6 pl-3 bg-opacity-70 flex rounded items-center text-custom-white">
        <div className="relative">
          <Image
            alt=""
            src="/userPerfil2.png"
            height={160}
            width={160}
            className="sm:w-36 w-28"
          />
          <button className="absolute  sm:bottom-9 bottom-5 right-3 font-semibold sm:text-2xl text-base  rounded-full p-1 bg-custom-red text-custom-white hover:bg-custom-white hover:text-custom-red">
            <MdEdit />
          </button>
        </div>
        <div>
          <h2 className="font-semibold sm:text-3xl text-xl">
            Agustin Gerardo Haag
          </h2>
          <p className="font-light sm:text-base text-xs">
            agustin-haag@hotmail.com
          </p>
        </div>
      </div>
      <div className="text-custom-white flex flex-col w-full">
        <div className="flex text-start   pt-3 pb-5">
          <div className="w-1/2">
            <span className="font-light text-custom-grey">Nombre:</span>
            <p>Agustin Gerardo</p>
          </div>
          <div className="w-1/2">
            <span className="font-light text-custom-grey">Apellido:</span>
            <p>Haag Letterucci</p>
          </div>
        </div>
        <div className="flex text-start">
          <div className="w-1/2">
            <span className="font-light text-custom-grey">Teléfono:</span>
            <p>+22222333344</p>
          </div>
          <div className="w-1/2">
            <span className="font-light text-custom-grey">Dirección:</span>
            <p>Avenida San martin 209</p>
          </div>
        </div>
      </div>
      <div>
        <Link href="/edit">Editar perfil</Link>
      </div>
    </section>
  );
};

export default InfoAccount;

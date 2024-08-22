import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";

const Opinion: React.FC = () => {
  return (
    <section className="w-1/2 py-2 px-5 md:block hidden">
      <div className="flex items-center gap-2 pb-2">
        <p className="text-3xl mt-3 font-semibold">
          GARAGE<span className="text-black">JS</span>{" "}
        </p>
      </div>
      <h2 className="text-xl font-light py-4">
        ¡Te invitamos a formar parte de esta gran comunidad aqui!
      </h2>

      <Image
        alt="comillas"
        src="/comillas3.png"
        height={50}
        width={50}
        className="rotate-180 pt-4"
      />

      <p className="font-extralight italic pb-3">
        Unete y disfruta de una plataforma con multiples beneficios, totalmente
        acorde a tus preferencias. ¡Te esperamos para juntos seguir creciendo!.
      </p>
      <div className="bg-custom-white flex flex-col items-start p-5 rounded-md w-5/6">
        <h3 className="text-black font-medium text-lg pb-2">
          Algunas opiniones acerca de nuestros servicios
        </h3>
        <p className="text-custom-grey font-extralight pb-2">
          Tenia muchas inquietudes acerca de donde podia llevar mi vehiculo, y
          sobretodo que inspire confianza. Y por suerte conoci GarageJS, en esta
          plataforma encontre sitios acorde a mis necesidades y con una
          excelente relación precio-calidád.
        </p>
        <div className="flex text-black gap-2 items-center">
          <p>Sandra Ceballos</p>
          <span className="text-yellow-400 flex">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Opinion;

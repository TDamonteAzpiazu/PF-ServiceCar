"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import PATHROUTES from "@/helpers/PathRoutes";

export const NotFoundPage: React.FC = () => {
  const [count, setCount] = useState<number>(5);
  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count === 0) {
      redirect(PATHROUTES.LANDING);
    }
    return () => clearInterval(interval);
  }, [count]);

  return (
    <main className="flex md:gap-5 md:flex-row flex-col w-4/5 mx-auto h-full items-center justify-between px-5">
      <div className="flex flex-col md:pl-2 justify-center w-full sm:pt-0 pt-3 md:w-2/4 md:items-start items-center text-custom-white">
        <h1 className="font-semibold text-6xl md:text-8xl mb-4 ">¡Oops!</h1>
        <p className="text-2xl mt-3 mb-5">
          <span className="text-custom-red font-bold text-3xl">404</span> - Page
          not found
        </p>
        <p className="text-custom-grey text-lg mb-5">
          Lo sentimos, la página que buscas no existe.
        </p>
        <p className="text-base">
          Sera redirijido/a al home en {count} segundos.
        </p>
      </div>
      <div className="w-1/2 md:min-w-80 flex justify-end">
        <Image
          loading="lazy"
          width={450}
          height={450}
          src="/404.png"
          alt="Page Not-Found"
        />
      </div>
      <div></div>
    </main>
  );
};

export default NotFoundPage;

"use client";
import React, { useEffect, useState } from "react";
import { getOpinionsAdmin } from "@/helpers/fetchOpinion";
import Cookies from "js-cookie";
import useHorizontalScroll from "@/helpers/scrollCarrusel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import OpinionCardAdmin from "../account/OpinionCardAdmin";
import { IOpinionUser } from "@/helpers/types/types";

const CarruselOpinions: React.FC<{ id: string }> = ({ id }) => {
  const [opinions, setOpinions] = useState<IOpinionUser[]>([]);
  const token = Cookies.get("token");
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    getOpinionsAdmin(url!, token!, id)
      .then((res) => {
        if (Array.isArray(res)) {
          const filteredOpinions = res.filter(
            (opinion) => opinion.status === "active"
          );

          setOpinions(filteredOpinions);
        } else {
          console.error("Unexpected response format:", res);
          setOpinions([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setOpinions([]);
      });
  }, [url, token]);
 
  const { containerRef, scrollRight, scrollLeft } = useHorizontalScroll();
  return (
    <>
      {opinions.length > 0 && (
        <section>
          <h2 className="text-xl">Opiniones de nuestros usuarios</h2>

          <div className="flex items-center w-full relative mt-5">
            <button
              onClick={scrollLeft}
              className="flecha-izquierda z-50 text-black absolute left-[-15px] bg-neutral-300 bg-opacity-50 hover:bg-custom-white p-2 rounded-full text-lg"
              style={{
                boxShadow: "0 0 6px rgba(0, 0, 0, 0.3)",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <IoIosArrowBack />
            </button>
            <div
              ref={containerRef}
              className="contenedor-carrusel  w-full overflow-hidden scroll-smooth"
            >
              <div className="container-proyect  flex flex-nowrap w-full md:gap-[5px] gap-1 ">
                { opinions.length > 0
                  ? opinions.map(
                      (opinion: IOpinionUser, index: number) =>
                        opinion.status === "active" && (
                          <OpinionCardAdmin
                            setOpinions={setOpinions}
                            key={index}
                            index={index}
                            opinion={opinion}
                            carrusel={true}
                          />
                        )
                    )
                  : ""}
              </div>
            </div>
            <button
              onClick={scrollRight}
              className="flecha-derecha text-black absolute right-[-15px] bg-neutral-300 bg-opacity-50 hover:bg-custom-white p-2 rounded-full text-lg"
              style={{
                boxShadow: "0 0 6px rgba(0, 0, 0, 0.3)",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default CarruselOpinions;

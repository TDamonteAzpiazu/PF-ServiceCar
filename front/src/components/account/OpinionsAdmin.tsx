"use client";
import { IOpinionUser, IUser } from "@/helpers/types/types";
import React, { useEffect, useState } from "react";
import { getOpinions } from "@/helpers/fetchOpinion";
import Cookies from "js-cookie";
import OpinionCardAdmin from "./OpinionCardAdmin";
import { useRouter } from "next/navigation";
import PATHROUTES from "@/helpers/PathRoutes";
import { useSelector } from "react-redux";

const OpinionsAdmin: React.FC = () => {
  const dataUser: IUser = useSelector((state: any) => state.user.user);
  const [opinions, setOpinions] = useState<IOpinionUser[]>([]);
  const token = Cookies.get("token");
  const url = process.env.NEXT_PUBLIC_URL;
  const router = useRouter();

  useEffect(() => {
    getOpinions(url!, token!)
      .then((res) => {
        if (Array.isArray(res)) {
          setOpinions(res);
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
  if(dataUser && dataUser.role === "user"){
    router.push(`${PATHROUTES.DASHBOARD}/user`)
  }
  return (
    <section>
      <h2 className="mt-4 mb-12 font-semibold text-2xl text-custom-white">
        Opiniones de usuarios
      </h2>
      <div className="grid gap-4 mt-4 w-full md:grid-cols-2 grid-cols-1 lg:grid-cols-3 mb-5">
        {Array.isArray(opinions) && opinions.length > 0 ? (
          opinions.map((opinion: IOpinionUser, index: number) => (
            <OpinionCardAdmin
              key={index}
              index={index}
              opinion={opinion}
              carrusel={false}
              setOpinions={setOpinions}
            />
          ))
        ) : (
          <p className="text-custom-white font-extralight">
            No hay opiniones disponibles.
          </p>
        )}
      </div>
    </section>
  );
};

export default OpinionsAdmin;

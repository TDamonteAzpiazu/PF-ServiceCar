"use client";
import { IOpinionUser, IUser } from "@/helpers/types/types";
import React, { useEffect, useState } from "react";
import OpinionCardUser from "./OpinionCardUser";
import { getOpinionsUser } from "@/helpers/fetchOpinion";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Opinions: React.FC = () => {
  const [opinions, setOpinions] = useState<IOpinionUser[]>([]);
  const token = Cookies.get("token");
  const url = process.env.NEXT_PUBLIC_URL;
  const dataUser: IUser = useSelector((state: any) => state.user.user);

  useEffect(() => {
    if (dataUser?.id) {
      getOpinionsUser(url!, token!, dataUser.id)
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
    }
  }, [url, token, dataUser?.id]);

  return (
    <section>
      <h2 className="mt-4 font-semibold text-2xl text-custom-white">
        Mis opiniones
      </h2>
      <div className="grid gap-4 mt-4 w-full md:grid-cols-2 grid-cols-1 lg:grid-cols-3 mb-5">
        {Array.isArray(opinions) && opinions.length > 0 ? (
          opinions.map((opinion: IOpinionUser, index: number) => (
            <OpinionCardUser key={index} index={index} opinion={opinion} />
          ))
        ) : (
          <p className=" text-custom-white font-extralight">
            No hay opiniones disponibles.
          </p>
        )}
      </div>
    </section>
  );
};

export default Opinions;

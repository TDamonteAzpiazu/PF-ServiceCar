import { opiniones } from "@/helpers/opiniones";
import { IOpinionUser } from "@/helpers/types/types";
import React from "react";
import OpinionCardUser from "./OpinionCardUser";

const Opinions: React.FC = () => {
  return (
    <div className="grid gap-6 w-full grid-cols-1 md:grid-cols-3 mb-5">
      {opiniones.map((opinion: any, index: number) => (
        <OpinionCardUser key={index} index={index} opinion={opinion} />
      ))}
    </div>
  );
};

export default Opinions;

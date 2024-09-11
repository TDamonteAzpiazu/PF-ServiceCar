import { opiniones } from "@/helpers/opiniones";
import { IOpinionUser } from "@/helpers/types/types";
import React from "react";
import OpinionCardUser from "./OpinionCardUser";

const Opinions: React.FC = () => {
  return (
    <div>
      {/* {opiniones.map((opinion: IOpinionUser, index: number) => (
        <OpinionCardUser key={index} index={index} opinion={opinion} />
      ))} */}
    </div>
  );
};

export default Opinions;

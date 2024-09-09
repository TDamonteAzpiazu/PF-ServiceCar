import { opiniones } from "@/helpers/opiniones";
import { IOpinion } from "@/helpers/types/types";
import OpinionCard from "./OpinionCard";

const HomeOpiniones: React.FC = () => {

  return (
    <section className="text-white pt-14 pb-24 px-8">
      <h2 className="text-center text-3xl font-bold mb-6">
        Te invitamos a confiar en nuestros servicios
      </h2>
      <p className="text-center text-gray-500 mb-12">
        Puedes escuchar a algunos de nuestros clientes. Su opinión es
        fundamental para seguir brindando un servicio de calidad.
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
        {opiniones.map((opinion: IOpinion, index: number) => (
          <OpinionCard index={index} opinion={opinion} key={index} />
        ))}
      </div>
    </section>
  );
};

export default HomeOpiniones;

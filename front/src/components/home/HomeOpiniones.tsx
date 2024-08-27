import { opiniones } from "@/helpers/opiniones";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

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
        {opiniones.map((opinion, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 shadow-md w-full md:w-1/3 max-w-xs max-h-[600px] min-h-[426px] ${
              index === 1 ? "bg-red-700" : "bg-custom-grey"
            }`}
          >
            <div className="flex justify-center mb-4">
              <img
                src={opinion.icono}
                alt="Icono de la persona"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex justify-center mb-2">
              {Array.from({ length: opinion.estrellas }).map((_, starIndex) => (
                <FaStar key={starIndex} className="text-yellow-500 mr-1" />
              ))}
            </div>
            <h3 className="text-xl font-bold text-center">{opinion.nombre}</h3>
            <h4 className="text-gray-400 text-center mb-4">
              {opinion.ocupacion}
            </h4>
            <div className="flex justify-center mb-4">
              <FaQuoteLeft className="text-white text-3xl" />
            </div>
            <p className="text-center">{opinion.opinion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeOpiniones;

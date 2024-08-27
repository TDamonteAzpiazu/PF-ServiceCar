import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import { FaMapMarkerAlt, FaWrench, FaStar } from "react-icons/fa";

const HomeAbout: React.FC = () => {
  return (
    <div className="mx-2 my-20 text-white">
      {/* Encabezado */}
      <h1 className="text-3xl font-bold text-center mb-6">
        ¿Por qué escoger <span className="text-custom-red">GarageJS</span>?
      </h1>

      <p className="text-m text-center mx-10 mb-8">
        En un mundo donde la excelencia en el servicio automotriz es más que una
        promesa, somos la fuerza que impulsa la innovación y la eficiencia en la
        gestión de talleres. Elegirnos significa optar por un socio que entiende
        que cada vehículo cuenta una historia y cada cliente, una necesidad
        única. En nuestra empresa, no solo gestionamos talleres; transformamos
        la experiencia automotriz.
      </p>

      <div className="flex sm:flex-row flex-col justify-center gap-6">
        {/* Tarjeta 1 */}
        <div className="relative p-6 shadow-lg w-full sm:w-1/3 text-center  hover:bg-red-700 hover:border-none hover:rounded-lg hover:text-white transition-all duration-300">
          <FaMapMarkerAlt className="text-4xl mb-4 mx-auto" />
          <h2 className="text-xl font-semibold mb-2">Sucursales Cercanas</h2>
          <p>
            Contamos con varias sucursales para que elija la que le sea más
            conveniente y cercana.
          </p>
        </div>
        <div className="border-2 border-white sm:block hidden"></div>
        <div className="relative p-6 shadow-lg w-full md:w-1/3 text-center  hover:bg-red-700 hover:border-none hover:rounded-lg hover:text-white transition-all duration-300">
          <FaWrench className="text-4xl mb-4 mx-auto" />
          <h2 className="text-xl font-semibold mb-2">Servicios de Calidad</h2>
          <p>
            Ofrecemos servicios de reparación y mantenimiento de alta calidad
            para su vehículo.
          </p>
        </div>
        <div className="border-2 border-white sm:block hidden"></div>
        <div className="relative p-6 rounded-lg shadow-lg w-full md:w-1/3 text-center hover:bg-red-700 hover:text-white transition-all duration-300">
          <FaStar className="text-4xl mb-4 mx-auto" />
          <h2 className="text-xl font-semibold mb-2">Clientes Satisfechos</h2>
          <p>
            Nos enorgullece contar con clientes satisfechos que confían en
            nuestro servicio.
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link href={PATHROUTES.SUCURSALES}>
          <button className="custom-button">Ver sucursales</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeAbout;

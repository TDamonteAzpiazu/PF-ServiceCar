import { FaMapMarkerAlt, FaWrench, FaStar } from "react-icons/fa";

const HomeAbout: React.FC = () => {
    return (
        <div className="p-8 my-10 bg-black text-white">
            {/* Encabezado */}
            <h1 className="text-3xl font-bold text-center mb-6">¿Por qué nosotros?</h1>
            
            {/* Párrafo de texto */}
            <p className="text-m text-center mb-8 mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus laoreet, ligula vel aliquam fermentum, erat libero tempus sapien, ut scelerisque arcu dolor eget dui. Integer imperdiet, nisl et ultrices tempor, sapien lacus vulputate tortor, ac facilisis odio augue a eros. Suspendisse potenti. Nam ut ipsum sit amet dolor varius scelerisque.
            </p>
            
            {/* Contenedor de las tarjetas */}
            <div className="flex flex-wrap justify-center gap-6">
                {/* Tarjeta 1 */}
                <div className="relative p-6 shadow-lg w-full md:w-[300px] text-center border-r-4 border-white hover:bg-red-700 hover:border-none hover:rounded-lg hover:text-white transition-all duration-300">
                    <FaMapMarkerAlt className="text-4xl mb-4 mx-auto" />
                    <h2 className="text-xl font-semibold mb-2">Sucursales Cercanas</h2>
                    <p>Contamos con varias sucursales para que elija la que le sea más conveniente y cercana.</p>
                </div>

                {/* Tarjeta 2 */}
                <div className="relative p-6 shadow-lg w-full md:w-[300px] text-center border-r-4 border-white hover:bg-red-700 hover:border-none hover:rounded-lg hover:text-white transition-all duration-300">
                    <FaWrench className="text-4xl mb-4 mx-auto" />
                    <h2 className="text-xl font-semibold mb-2">Servicios de Calidad</h2>
                    <p>Ofrecemos servicios de reparación y mantenimiento de alta calidad para su vehículo.</p>
                </div>

                {/* Tarjeta 3 */}
                <div className="relative p-6 rounded-lg shadow-lg w-full md:w-[300px] text-center hover:bg-red-700 hover:text-white transition-all duration-300">
                    <FaStar className="text-4xl mb-4 mx-auto" />
                    <h2 className="text-xl font-semibold mb-2">Clientes Satisfechos</h2>
                    <p>Nos enorgullece contar con clientes satisfechos que confían en nuestro servicio.</p>
                </div>
            </div>

            {/* Botón "Ver otras sucursales" */}
            <div className="text-center mt-8">
                <button className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition-all duration-300">
                    Ver sucursales
                </button>
            </div>
        </div>
    );
}

export default HomeAbout;

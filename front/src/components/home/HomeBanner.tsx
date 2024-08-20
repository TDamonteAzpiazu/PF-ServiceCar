import Image from "next/image";

const HomeBanner: React.FC = () => {
    return (
        <div className="relative flex items-center justify-center h-[95vh]">
            {/* Imagen para pantallas grandes */}
            <div className="absolute inset-0 hidden md:block">
                <Image 
                    src="/banner.jpeg" 
                    alt="Background Image" 
                    layout="fill"
                    objectFit="cover"
                    className="opacity-95"
                />
            </div>

            {/* Imagen para pantallas pequeñas */}
            <div className="absolute inset-0 md:hidden">
                <Image
                    src="/celu.jpeg" 
                    alt="Mobile Background Image" 
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            {/* Contenido de texto */}
            <div className="absolute text-center mx-10 pt-10 inset-0 flex-col items-center justify-start md:left-8 md:ml-12 top-1/2 transform -translate-y-1/2  text-white max-w-lg md:text-left">
                <h1 className="text-4xl font-bold mb-4">Lo Mejor en Servicios Automotrices en Service Car</h1>
                <p className="text-lg mb-6">Conoce nuestros servicios especializados para tu vehículo. ¡Reserva tu turno ahora y mantén tu auto en óptimas condiciones!</p>
                <a href="#reservar" className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold">
                    Reservar Turno
                </a>
            </div>
        </div>
    );
}

export default HomeBanner;

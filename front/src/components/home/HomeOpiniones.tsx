import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const HomeOpiniones: React.FC = () => {
  const opiniones = [
    {
      estrellas: 5,
      nombre: 'Lorenzo Peralta',
      ocupacion: 'Médico Pediatra',
      opinion:
        'GarageJS es la solución que estaba buscando para el mantenimiento de mi auto. La atención fue impecable y los resultados, excepcionales. ¡Altamente recomendado!',
      icono: '/iconLorenzo.jpg',
    },
    {
      estrellas: 5,
      nombre: 'María Pérez',
      ocupacion: 'Diseñadora Gráfica',
      opinion:
        'Con GarageJS encontré un servicio rápido y confiable para reparar mi vehículo. Me impresionó la calidad del trabajo y la dedicación del equipo.',
      icono: '/iconMaria.jpg',
    },
    {
      estrellas: 4,
      nombre: 'Carlos Gómez',
      ocupacion: 'Ingeniero de Software',
      opinion:
        'GarageJS me ayudó a mantener mi auto en perfectas condiciones. Aunque tuve que esperar un poco más de lo esperado, la calidad del servicio fue excelente.',
      icono: '/iconCarlos.jpg',
    },
  ];

  return (
    <section className="bg-black text-white py-16 px-8">
      <h2 className="text-center text-3xl font-bold mb-6">
        Te invitamos a confiar en nuestros servicios
      </h2>
      <p className="text-center text-gray-500 mb-12">
        Puedes escuchar a algunos de nuestros clientes. Su opinión es fundamental para seguir brindando un servicio de calidad.
      </p>
      <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
        {opiniones.map((opinion, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 shadow-md w-full md:w-1/3 max-w-xs ${
              index === 1 ? 'bg-red-700' : 'bg-gray-800'
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
                <FaStar key={starIndex} className="text-white mr-1" />
              ))}
            </div>
            <h3 className="text-xl font-bold text-center">{opinion.nombre}</h3>
            <h4 className="text-gray-400 text-center mb-4">{opinion.ocupacion}</h4>
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
